import express from 'express';
import ProfileController from '../controllers/ProfileController';
import authMiddleware from '../middleware/AuthMiddleware';

const router = express.Router();

router.get('', authMiddleware ,ProfileController.getProfile);
router.post('', authMiddleware ,ProfileController.createProfile);
router.put('', authMiddleware ,ProfileController.updateProfile);


export default router;