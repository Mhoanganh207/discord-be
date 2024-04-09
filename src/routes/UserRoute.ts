import express from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();

router.post('/register', UserController.createUser);
router.post('/login', UserController.logIn);

export default router;