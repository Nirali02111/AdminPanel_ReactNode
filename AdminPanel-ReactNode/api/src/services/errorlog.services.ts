import * as db from '../models/index';
const ErrorLog = db.ErrorLog
export const saveErrorLog = async (e: any) => {
    await ErrorLog.create({ log: e, timestamp: new Date() })
}
export const getErrorLog = async () => {
    return ErrorLog.findAll({ order: [['createdAt', 'DESC']] })
}