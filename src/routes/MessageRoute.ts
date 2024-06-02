import express from 'express';
import MessageController from '../controllers/MessageController';
import userMiddleware from '../middleware/UserMiddleware';
const router = express.Router();

router.get('', userMiddleware ,MessageController.getMessages);
router.post('', userMiddleware ,MessageController.sendMessage);

export default router;