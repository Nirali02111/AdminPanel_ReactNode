import { Router } from 'express';
import * as errorLogController from '../controllers/errorlog.controllers'
const errorLogRouter = Router();
errorLogRouter.get('/', errorLogController.getErrorLog)
export default errorLogRouter;
