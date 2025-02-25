
import { Router } from 'express';
import * as roleController from '../controllers/roles.controllers'
import { validateRoleRequestBody } from '../middlewares/schema-validator';
const roleRouter = Router();
roleRouter.get('/', roleController.getRoles)
roleRouter.get('/:id', roleController.getRoleById)
roleRouter.post('/', validateRoleRequestBody, roleController.addRole)
roleRouter.put('/:id', validateRoleRequestBody, roleController.updateRole)
roleRouter.delete('/:id', roleController.deleteRole)
export default roleRouter;
