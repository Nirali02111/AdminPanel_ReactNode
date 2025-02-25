import { Op } from 'sequelize'
import * as db from '../models/index'
import { ErrorResponse } from '../common/response.model'
import { PaginationAndOrderParams } from '../common/query.model'
const EmailTemplate = db.EmailTemplate
export const getEmailTemplates = async (query: SearchOptions) => {
    const { page, pageSize, title, key, fromEmail, fromName, subject, status, orderBy, orderDirection } = query
    let attributes = ['id', 'title', 'key', 'fromEmail', 'fromName', 'subject', 'status'];
    let whereClause: any = {};
    let orderOptions = []
    const paginationOption: any = {}
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
    if (fromEmail) {
        whereClause.fromEmail = { [Op.like]: `%${fromEmail}%` }
    }
    if (fromName) {
        whereClause.fromName = { [Op.like]: `%${fromName}%` }
    }
    if (subject) {
        whereClause.subject = { [Op.like]: `%${subject}%` }
    }
    if (status) {
        whereClause.status = status
    }
    const { rows, count } = await EmailTemplate.findAndCountAll({
        ...paginationOption,
        attributes: attributes,
        where: whereClause,
        order: orderOptions.length === 0 ? [['createdAt', 'DESC']] : orderOptions,
    });
    return { data: rows, totalRecords: count }
}
export const getEmailTemplateById = async (id: string) => {
    const emailTemplateData = await EmailTemplate.findByPk(id, { attributes: ['title', 'key', 'fromEmail', 'fromName', 'isManualMail', 'isContactUsMail', 'subject', 'body', 'status'] });
    if (!emailTemplateData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
    return emailTemplateData
}
export const addEmailTemplate = async (EmailTemplateBody: AddOrUpdateEmailTemplateBody, userId: number| undefined) => {
    const emailTemplateData = await EmailTemplate.create({ ...EmailTemplateBody, CreatedBy: userId });
    if (!emailTemplateData) {
        throw new ErrorResponse(400, "Invalid request")
    }
    return emailTemplateData
}
export const updateEmailTemplate = async (id: string, EmailTemplateBody: AddOrUpdateEmailTemplateBody, userId: number| undefined) => {
    const emailTemplateData = await EmailTemplate.findByPk(id);
    if (!emailTemplateData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
    const updatedData = await EmailTemplate.update({ ...EmailTemplateBody, UpdatedBy: userId }, { where: { id: parseInt(id) }, individualHooks: true });
    return updatedData
}
export const deleteEmailTemplate = async (id: string) => {
    const deleted = await EmailTemplate.destroy({ where: { id: parseInt(id) } });
    if (!deleted) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
}


export interface SearchOptions extends PaginationAndOrderParams {
    title: string,
    key: string,
    subject: string,
    fromEmail: string,
    fromName: string,
    status: string,
}

export interface AddOrUpdateEmailTemplateBody {
    key: string,
    title: string,
    fromEmail: string,
    fromName: string,
    isManualMail: boolean,
    isContactUsMail: boolean,
    status: string,
    subject: string,
    body: string,
}