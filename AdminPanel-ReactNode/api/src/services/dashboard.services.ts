import * as db from '../models/index'
export const getDashboard = async () => {
    const userCount = await db.User.count();
    const roleCount = await db.Role.count();
    return { totalUsers: userCount, totalRoles: roleCount }
}