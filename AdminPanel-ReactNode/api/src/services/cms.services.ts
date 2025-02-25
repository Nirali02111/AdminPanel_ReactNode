import { Op } from 'sequelize'
import * as db from '../models/index'
import { ErrorResponse } from '../common/response.model'
import { PaginationAndOrderParams } from '../common/query.model'
const CMS = db.CMS
export const getCMSs = async (query: SearchOptions) => {
    const { page, pageSize, title, key, metaKeyword, status, orderBy, orderDirection } = query
    let whereClause: any = {};
    const paginationOption: any = {}
    let attributes = ['id', 'title', 'key', 'metaKeyword', 'status'];
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
    if (title) {
        whereClause.title = { [Op.like]: `%${title}%` }
    }
    if (key) {
        whereClause.key = { [Op.like]: `%${key}%` }
    }
    if (metaKeyword) {
        whereClause.metaKeyword = { [Op.like]: `%${metaKeyword}%` }
    }
    if (status) {
        whereClause.status = status
    }
    const { rows, count } = await CMS.findAndCountAll({
        ...paginationOption,
        attributes: attributes,
        where: whereClause,
        order: orderOptions.length === 0 ? [['createdAt', 'DESC']] : orderOptions,
    });
    return { data: rows, totalRecords: count }
}
export const getCMSById = async (id: string) => {
    const cmsData = await CMS.findByPk(id, { attributes: ['title', 'key', 'metaTitle', 'metaKeyword', 'metaDescription', 'content', 'status'] });
    if (!cmsData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
    return cmsData
}
export const addCMS = async (CMSBody: AddOrUpdateCMSBody, userId: number| undefined) => {
    const cmsData = await CMS.create({ ...CMSBody, CreatedBy: userId });
    if (!cmsData) {
        throw new ErrorResponse(400, "Invalid request")
    }
    return cmsData
}
export const updateCMS = async (id: string, CMSBody: AddOrUpdateCMSBody, userId: number| undefined) => {
    const cmsData = await CMS.findByPk(id);
    if (!cmsData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
    const updatedData = await CMS.update({ ...CMSBody, UpdatedBy: userId }, { where: { id: parseInt(id) }, individualHooks: true });
    return updatedData
}
export const deleteCMS = async (id: string) => {
    const deleted = await CMS.destroy({ where: { id: parseInt(id) } });
    if (!deleted) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
}

export interface SearchOptions extends PaginationAndOrderParams {
    title: string,
    key: string,
    metaKeyword: string,
    status: string,
}

export interface AddOrUpdateCMSBody {
    title: string,
    key: string,
    metaTitle: string,
    metaKeyword: string,
    metaDescription: string,
    content: string,
    status: string,
}