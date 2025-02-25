import { Router } from 'express';
import * as cmsController from '../controllers/cms.controllers'
import { validateCMSRequestBody } from '../middlewares/schema-validator';
const cmsRouter = Router();
cmsRouter.get('/', cmsController.getCMSs)
cmsRouter.get('/:id', cmsController.getCMSById)
cmsRouter.post('/', validateCMSRequestBody, cmsController.addCMS)
cmsRouter.put('/:id', validateCMSRequestBody, cmsController.updateCMS)
cmsRouter.delete('/:id', cmsController.deleteCMS)
export default cmsRouter;
