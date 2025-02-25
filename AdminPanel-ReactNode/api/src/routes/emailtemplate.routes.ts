import { Router } from 'express';
import * as emailTemplateController from '../controllers/emailtemplate.controllers'
import { validateEmailTemplateRequestBody } from '../middlewares/schema-validator';
const emailTemplateRouter = Router();
emailTemplateRouter.get('/', emailTemplateController.getEmailTemplates)
emailTemplateRouter.get('/:id', emailTemplateController.getEmailTemplateById)
emailTemplateRouter.post('/', validateEmailTemplateRequestBody, emailTemplateController.addEmailTemplate)
emailTemplateRouter.put('/:id', validateEmailTemplateRequestBody, emailTemplateController.updateEmailTemplate)
emailTemplateRouter.delete('/:id', emailTemplateController.deleteEmailTemplate)
export default emailTemplateRouter;
