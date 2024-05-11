import express from 'express';
import MessageController from '../controllers/MessageController';
import authMiddleware from '../middleware/AuthMiddleware';
const router = express.Router();

router.get('', authMiddleware ,MessageController.getMessages);
router.post('', authMiddleware ,MessageController.sendMessage);

export default router;