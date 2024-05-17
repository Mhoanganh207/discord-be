import express from 'express';
import UserController from '../controllers/UserController';
import authMiddleware from '../middleware/AuthMiddleware';
const router = express.Router();

router.post('/register' ,UserController.createUser);
router.post('/login',UserController.logIn);
router.put('/change-password', authMiddleware,UserController.changePassword);

export default router;