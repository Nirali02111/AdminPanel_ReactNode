
import { Router } from 'express';
import * as accontController from '../controllers/account.controllers';

import { verifyAccessToken } from '../middlewares/token-extracter';
import { upload } from '../middlewares/image-uploader';
import { validateChangePasswordRequestBody, validateForgotPasswordRequestBody, validateLoginRequestBody, validateResetPasswordRequestBody, validateUpdateProfileRequestBody } from '../middlewares/schema-validator';
import { loginLimiter } from '../middlewares/rate-limitter';
const accountRouter = Router();

accountRouter.post('/login', loginLimiter, validateLoginRequestBody, accontController.login);
accountRouter.post('/forgot-password', validateForgotPasswordRequestBody, accontController.forgotPassword);
accountRouter.post('/reset-password/:token', validateResetPasswordRequestBody, accontController.resetPassword);

//needs access token
accountRouter.get('/logout', verifyAccessToken, accontController.logout)
accountRouter.get('/profile', verifyAccessToken, accontController.getProfile);
accountRouter.put('/profile', verifyAccessToken, upload.single('profileImage'), validateUpdateProfileRequestBody, accontController.updateProfile);
accountRouter.put('/change-password', verifyAccessToken, validateChangePasswordRequestBody, accontController.changePassword);

export default accountRouter;
