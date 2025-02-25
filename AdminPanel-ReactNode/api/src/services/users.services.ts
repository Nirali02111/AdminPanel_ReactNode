import * as db from '../models/index'
import { Op } from 'sequelize'
import { ErrorResponse } from '../common/response.model'
import bcrypt from 'bcrypt'
import { PaginationAndOrderParams } from '../common/query.model'
import fs from 'node:fs'
import path from 'node:path'
const User = db.User
export const getUsers = async (query: SearchOptions) => {
    const { page, pageSize, firstName, lastName, status, email, orderBy, orderDirection } = query
    let whereClause: any = {};
    const paginationOption: any = {}
    const attributes = ['id', 'firstName', 'lastName', 'email', 'status'];
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
    if (firstName) {
        whereClause.firstName = { [Op.like]: `%${firstName}%` }
    }
    if (lastName) {
        whereClause.lastName = { [Op.like]: `%${lastName}%` }
    }
    if (email) {
        whereClause.email = { [Op.like]: `%${email}%` }
    }
    if (status) {
        whereClause.status = status
    }
    const { rows, count } = await User.findAndCountAll({
        ...paginationOption,
        attributes: attributes,
        where: whereClause,
        order: orderOptions.length === 0 ? [['createdAt', 'DESC']] : orderOptions,
    });
    return { data: rows, totalRecords: count }
}
export const getUserById = async (id: string) => {
    const userData = await User.findOne({ where: { id: parseInt(id) }, attributes: ['firstName', 'lastName', 'email', 'profileImage', 'roleId', 'status'] });
    if (!userData) {
        throw new ErrorResponse(404, 'User not found')
    }
    return userData
}
export const addUser = async (bodyData: AddUserBody,userId:number| undefined) => {
    const encryptedPassword = bcrypt.hashSync(bodyData.password, 10);
    bodyData.password = encryptedPassword
    if (typeof bodyData.roleId === 'string') {
        bodyData.roleId = parseInt(bodyData.roleId as string)
    }
    const userData = await User.create({ ...bodyData, CreatedBy: userId });
    if (!userData) {
        throw new ErrorResponse(400, "Invalid request")
    }
    return userData
}
export const updateUser = async (id: string, bodyData: UpdateUserBody,userId:number |undefined) => {
    const userData = await User.findByPk(parseInt(id));
    if (typeof bodyData.roleId === 'string') {
        bodyData.roleId = parseInt(bodyData.roleId as string)
    }
    if (!userData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
    if (bodyData.profileImage) {
        try {
            const oldImage = (await User.findOne({ where: { id: id }, attributes: ['profileImage'] }))?.dataValues.profileImage;
            if (oldImage) {
                fs.unlinkSync(path.join(__dirname, '..', oldImage))
            }
        } catch (e) { }
    }
    const updatedData = await User.update({ ...bodyData, UpdatedBy: userId }, { where: { id: parseInt(id) }, individualHooks: true });
   console.log("Updated data", { ...bodyData, UpdatedBy: userId })
    return updatedData
}
export const deleteUser = async (id: string) => {
    const deleted = await User.destroy({ where: { id: parseInt(id) } });
    if (!deleted) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
}
export interface UpdateUserBody {
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string,
    roleId: number | string,
    status: boolean
}
export interface AddUserBody extends UpdateUserBody {
    password: string,
}
export interface SearchOptions extends PaginationAndOrderParams {
    firstName: string,
    lastName: string,
    email: string,
    status: string
}
export interface UsersResponseData {
    data: any,
    count: number
}
export interface User {
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string
}