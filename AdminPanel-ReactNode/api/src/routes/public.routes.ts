
import { Request, Response, Router } from 'express';
import * as permissionController from '../controllers/permission.controllers'
import * as roleController from '../controllers/roles.controllers'
const publicRouter = Router();
publicRouter.get('/', (req: Request, res: Response) => {
    res.send("Welcome")
})
publicRouter.get('/permissions', permissionController.getPermissions);
publicRouter.get('/role', roleController.getRoleNameAndId);
export default publicRouter;
