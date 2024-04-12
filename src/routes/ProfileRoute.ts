import express from 'express';
import ProfileController from '../controllers/ProfileController';
import authMiddleware from '../middleware/AuthMiddleware';

const router = express.Router();

router.get('', authMiddleware ,ProfileController.getProfile);


export default router;