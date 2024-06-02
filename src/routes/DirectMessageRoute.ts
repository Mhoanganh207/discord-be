import express from 'express';
import userMiddleware from '../middleware/UserMiddleware';
import DirectMessageController from '../controllers/DirectMessageController';
const router = express.Router();

router.get('', userMiddleware ,DirectMessageController.getMessages);
router.post('', userMiddleware ,DirectMessageController.sendMessage);

export default router;