import express from 'express';
import UserController from '../controllers/UserController';
import userMiddleware from '../middleware/UserMiddleware';
const router = express.Router();

router.post('/register' ,UserController.createUser);
router.post('/login',UserController.logIn);
router.put('/change-password', userMiddleware,UserController.changePassword);
router.get('/verify/:userId',UserController.verifyUser);

export default router;