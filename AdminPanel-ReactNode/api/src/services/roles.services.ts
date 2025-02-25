import { Op } from 'sequelize'
import * as db from '../models/index'
import { ErrorResponse } from '../common/response.model'
import { PaginationAndOrderParams } from '../common/query.model'
const Role = db.Role
export const getRoles = async (query: SearchOptions) => {
    const { page, pageSize, name, shortDescription, status, orderBy, orderDirection } = query
    const whereClause: any = {};
    const paginationOption: any = {}
    const orderOptions = [];
    const attributes = ['id', 'name', 'shortDescription', 'status']
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
    if (name) {
        whereClause.name = { [Op.like]: `%${name}%` }
    }
    if (shortDescription) {
        whereClause.shortDescription = { [Op.like]: `%${shortDescription}%` }
    }
    if (status) {
        whereClause.status = status
    }
    const { rows, count } = await Role.findAndCountAll({
        ...paginationOption,
        attributes: attributes,
        where: whereClause,
        order: orderOptions.length === 0 ? [['createdAt', 'DESC']] : orderOptions,
    });
    return { data: rows, totalRecords: count }
}

export const getRoleById = async (id: string) => {
    const roleData = await Role.findByPk(id, {
        include: {
            model: db.Permission,
            as: 'permissions',
            attributes: ['id', 'name'],
            through: { attributes: [] }, // Exclude the association fields
        },
        attributes: ['name', 'shortDescription', 'status']
    });
    if (!roleData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
    return roleData
}
export const addRole = async (roleBody: AddOrUpdateRoleBody, userId: number| undefined) => {
    const roleData = await Role.create({ ...roleBody, CreatedBy: userId });
    if (!roleData) {
        throw new ErrorResponse(400, "Invalid request")
    }
    await roleData.setPermissions(roleBody.permissions)
    return roleData
}
export const updateRole = async (id: string, roleBody: AddOrUpdateRoleBody, userId: number| undefined) => {
    const roleData = await Role.findByPk(id);
    if (!roleData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
    const updatedData = await Role.update({ ...roleBody, UpdatedBy: userId }, { where: { id: parseInt(id) }, individualHooks: true });
    await roleData.setPermissions(roleBody.permissions)
    return updatedData
}
export const deleteRole = async (id: string) => {
    const deleted = await Role.destroy({ where: { id: parseInt(id) } });
    if (!deleted) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
}

export const getRoleNameAndId = async () => {
    return Role.findAll({ attributes: ['id', 'name'] })
}
export interface SearchOptions extends PaginationAndOrderParams {
    name: string,
    status: string,
    shortDescription: string,
}

export interface AddOrUpdateRoleBody {
    name: string,
    status: string,
    shortDescription: string,
    permissions: number[]
}