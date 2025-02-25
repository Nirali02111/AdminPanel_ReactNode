import { Op } from 'sequelize'
import * as db from '../models/index'
import { ErrorResponse } from '../common/response.model'
import { PaginationAndOrderParams } from '../common/query.model'
const FAQ = db.FAQ
export const getFAQs = async (query: SearchOptions) => {
    const { page, pageSize, question, displayOrder, status, orderBy, orderDirection } = query
    let attributes = ['id', 'question', 'displayOrder', 'status']
    let whereClause: any = {};
    const paginationOption: any = {}
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
    if (question) {
        whereClause.question = { [Op.like]: `%${question}%` }
    }
    if (displayOrder) {
        whereClause.displayOrder = { [Op.like]: `%${displayOrder}%` }
    }
    if (status) {
        whereClause.status = status
    }

    const { rows, count } = await FAQ.findAndCountAll({
        ...paginationOption,
        attributes: attributes,
        where: whereClause,
        order: orderOptions.length === 0 ? [['createdAt', 'DESC']] : orderOptions,
    });
    return { data: rows, totalRecords: count }
}
export const getFAQById = async (id: string) => {
    const faqData = await FAQ.findByPk(id, { attributes: ['question', 'answer', 'displayOrder', 'status'] });
    if (!faqData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
    return faqData
}
export const addFAQ = async (FAQBody: AddOrUpdateFAQBody,userId:number| undefined) => {
    const faqData = await FAQ.create({ ...FAQBody, CreatedBy: userId });
    if (!faqData) {
        throw new ErrorResponse(400, "Invalid request")
    }
    return faqData
}
export const updateFAQ = async (id: string, FAQBody: AddOrUpdateFAQBody, userId: number| undefined) => {
    const faqData = await FAQ.findByPk(id);
    if (!faqData) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
   // const updatedData = await FAQ.update(FAQBody, { where: { id: parseInt(id) }, individualHooks: true });
   const updatedData = await FAQ.update(
    { ...FAQBody, UpdatedBy: userId },
    { where: { id: parseInt(id) }, individualHooks: true }
);
console.log(updatedData, "updated",{ ...FAQBody, UpdatedBy: userId });
    return updatedData
}
export const deleteFAQ = async (id: string) => {
    const deleted = await FAQ.destroy({ where: { id: parseInt(id) } });
    if (!deleted) {
        throw new ErrorResponse(404, `The resource with ID ${id} does not exist.`)
    }
}

export interface SearchOptions extends PaginationAndOrderParams {
    question: string,
    displayOrder: string,
    status: string,
}
export interface AddOrUpdateFAQBody {
    question: string,
    answer: string,
    displayOrder: string,
    status: string,
}