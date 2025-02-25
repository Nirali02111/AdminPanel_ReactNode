import { Router } from 'express';
import * as auditlogController from '../controllers/auditlog.controllers'
const auditLogRouter = Router();
auditLogRouter.get('/', auditlogController.getAuditLogs)
export default auditLogRouter;
