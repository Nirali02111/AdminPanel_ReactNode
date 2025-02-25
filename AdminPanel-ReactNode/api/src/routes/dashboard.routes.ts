import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controllers'
const dashboardRouter = Router();
dashboardRouter.get('/', dashboardController.getDashboard)
export default dashboardRouter;
