import { NextFunction, Response } from "express";
import { CustomRequest } from "../common/request.model";
import { ErrorResponse } from "../common/response.model";
import { getRoleById } from "../services/roles.services";
const methods: { [key: string]: string } = {
    GET: "list",
    POST: "add",
    PUT: "edit",
    DELETE: "delete"
}
export const verifyUserRole = async (req: CustomRequest, res: Response, next: NextFunction) => {
    let url = req.originalUrl.split('/')[2].toLowerCase();
    if (url === "errorlogs") {
        return next()
    }
    if (url !== "dashboard") {
        url = url.endsWith('s') ? url.slice(0, url.length - 1) : url
    }
    const method = methods[req.method];
    if (req.user?.roleId) {
        const rolePermissons = (await getRoleById(req.user?.roleId as unknown as string)).dataValues.permissions;
        if (!rolePermissons.length) {
            return next(new ErrorResponse(403, "Access to the requested resource is forbidden. You do not have the necessary permissions to view the content."))
        }
        const permissions: string[] = rolePermissons.map((ele: { id: number, name: string }) => ele.name.toLocaleLowerCase());
        let allow = false
        permissions.forEach(ele => {
            if (url === "dashboard") {
                if (ele.includes(url)) {
                    allow = true
                }
            } else if (ele.includes(url) && ele.includes(method)) {
                allow = true
            }
        })
        if (allow) {
            return next()
        }
        next(new ErrorResponse(403, `Access to the requested resource is forbidden. You do not have the necessary permissions to ${method} the content.`))
        return
    }
    next(new ErrorResponse(403, `Access to the requested resource is forbidden. You do not have the necessary permissions to ${method} the content.`))
}