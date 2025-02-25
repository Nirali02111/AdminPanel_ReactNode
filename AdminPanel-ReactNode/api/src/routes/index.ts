
import { Router, Request, Response } from 'express';
import accountRouter from './account.routes';
import userRouter from './user.routes';
import { verifyAccessToken } from '../middlewares/token-extracter';
import { verifyUserRole } from '../middlewares/veryfy-role';
import roleRouter from './role.routes';
import applicationConfigurationRouter from './applicationconfiguration.routes';
import faqRouter from './faq.routes';
import cmsRouter from './cms.routes';
import emailTemplateRouter from './emailtemplate.routes';
import publicRouter from './public.routes';
import auditLogRouter from './auditlog.routes';
import dashboardRouter from './dashboard.routes';
import errorLogRouter from './errorLog.routes';

const router = Router();
router.use('/', publicRouter)
//other routes
router.use('/account', accountRouter);
//need role permissions
router.use('/dashboard', verifyAccessToken, verifyUserRole, dashboardRouter);
router.use('/users', verifyAccessToken, verifyUserRole, userRouter);
router.use('/roles', verifyAccessToken, verifyUserRole, roleRouter)
router.use('/applicationconfigurations', verifyAccessToken, verifyUserRole, applicationConfigurationRouter)
router.use('/faqs', verifyAccessToken, verifyUserRole, faqRouter)
router.use('/cmsmanagements', verifyAccessToken, verifyUserRole, cmsRouter)
router.use('/emailtemplates', verifyAccessToken, verifyUserRole, emailTemplateRouter)
router.use('/auditlogs', verifyAccessToken, verifyUserRole, auditLogRouter)

router.use('/errorlogs', verifyAccessToken, verifyUserRole, errorLogRouter)

export default router;
