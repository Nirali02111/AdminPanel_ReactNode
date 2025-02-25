import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { jwtDecode } from "jwt-decode";
const CheckPermission = ({ children, permission = 'fasdfsa' }: { children: React.ReactNode, permission: string }) => {
    const { loggedInUser, permissions } = useContext(UserContext);
    const checkPermissionIsValid = (permission: string) => {
        if (!loggedInUser?.token) return false;
        const jwtPayload: any = jwtDecode(loggedInUser?.token);
        const allow = jwtPayload.permissions?.includes(permissions[permission]) ? true : false;
        return allow
    }
    return checkPermissionIsValid(permission) ? <>{children} </> : <></>
}

export default CheckPermission


