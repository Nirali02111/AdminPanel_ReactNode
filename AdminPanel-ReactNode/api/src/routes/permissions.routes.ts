
import { Router } from 'express';
import * as permissionController from '../controllers/permission.controllers'
const permissionRouter = Router();
permissionRouter.get('/', permissionController.getPermissions)
export default permissionRouter;
