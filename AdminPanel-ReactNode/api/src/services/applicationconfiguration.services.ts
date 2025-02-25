import { Op } from 'sequelize'
import * as db from '../models/index'
import { ErrorResponse } from '../common/response.model'
import { PaginationAndOrderParams } from '../common/query.model'
const ApplicationConfiguration = db.ApplicationConfiguration
export const getApplicationConfigurations = async (query: SearchOptions) => {
    const { page, pageSize, key, value, orderBy, orderDirection } = query
    let whereClause: any = {};
    const paginationOption: any = {}
    let attributes = ['id', 'key', 'value'];
    let orderOptions = []
    if (orderBy && orderDirection) {
        if (attributes.includes(orderBy) && (orderDirection.toLocaleLowerCase() === "asc" || orderDirection.toLocaleLowerCase() === "desc")) {
            orderOptions.push([orderBy, orderDirection.toUpperCase()])
        }
    }
    if (pageSize) {
        const limitNum = parseInt(pageSize);
        if (!isNaN(limitNum)) {
            paginationOption.limit = limitNum
        }
    }
    if (page) {
        const offsetNum = parseInt(page);
        if (!isNaN(offsetNum) && offsetNum !== 0) {
            paginationOption.offset = (offsetNum - 1) * paginationOption.limit;
        }
    }
    if (key) {
        whereClause.key = { [Op.like]: `%${key}%` }
    }
    if (value) {
        whereClause.value = { [Op.like]: `%${value}%` }
    }
    const { rows, count } = await ApplicationConfiguration.findAndCountAll({
        ...paginationOption,
        order: orderOptions.length === 0 ? [['createdAt', 'DESC']] : orderOptions,
        attributes: attributes,
        where: whereClause
    });
    return { data: rows, totalRecords: count }

}
export const getApplicationConfigurationById = async (id: string) => {
    const applicationConfigurationData = await ApplicationConfiguration.findByPk(id, { attributes: ['key', 'value'] });
    if (!applicationConfigurationData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
    return applicationConfigurationData
}
export const addApplicationConfiguration = async (ApplicationConfigurationBody: AddOrUpdateApplicationConfigurationBody, userId: number| undefined) => {
    const applicationConfigurationData = await ApplicationConfiguration.create({ ...ApplicationConfigurationBody, CreatedBy: userId });
    if (!applicationConfigurationData) {
        throw new ErrorResponse(400, "Invalid request")
    }
    return applicationConfigurationData
}
export const updateApplicationConfiguration = async (id: string, ApplicationConfigurationBody: AddOrUpdateApplicationConfigurationBody, userId: number| undefined) => {
    const applicationConfigurationData = await ApplicationConfiguration.findByPk(id);
    if (!applicationConfigurationData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
    const updatedData = await ApplicationConfiguration.update({ ...ApplicationConfigurationBody, UpdatedBy: userId }, { where: { id: parseInt(id) }, individualHooks: true });
    return updatedData
}
export const deleteApplicationConfiguration = async (id: string) => {
    const deleted = await ApplicationConfiguration.destroy({ where: { id: parseInt(id) } });
    if (!deleted) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
}
export interface AddOrUpdateApplicationConfigurationBody {
    key: string,
    value: string,
}
export interface SearchOptions extends PaginationAndOrderParams, AddOrUpdateApplicationConfigurationBody { }
