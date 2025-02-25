import db from "../models/index"

export const getPermissions = async () => {
    return db.Permission.findAll({ attributes: ['id', 'name'] })
}