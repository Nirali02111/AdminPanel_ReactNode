
import { Router } from 'express';
import * as userController from '../controllers/users.controllers'
const userRouter = Router();
import { upload } from '../middlewares/image-uploader';
import { validateAddUserRequestBody, validateUpdateUserRequestBody } from '../middlewares/schema-validator';
userRouter.route('/').get(userController.getUsers);
userRouter.route('/:id').get(userController.getUserById);
userRouter.route('/').post(upload.single('profileImage'), validateAddUserRequestBody, userController.addUser)
userRouter.route('/:id').put(upload.single('profileImage'), validateUpdateUserRequestBody, userController.updateUser);
userRouter.route('/:id').delete(userController.deleteUser);

export default userRouter;