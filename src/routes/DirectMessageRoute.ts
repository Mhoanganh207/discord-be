import express from 'express';
import authMiddleware from '../middleware/AuthMiddleware';
import DirectMessageController from '../controllers/DirectMessageController';
const router = express.Router();

router.get('', authMiddleware ,DirectMessageController.getMessages);
router.post('', authMiddleware ,DirectMessageController.sendMessage);

export default router;