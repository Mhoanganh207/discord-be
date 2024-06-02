import express from 'express';
import ProfileController from '../controllers/ProfileController';
import userMiddleware from '../middleware/UserMiddleware';

const router = express.Router();

router.get('', userMiddleware ,ProfileController.getProfile);
router.post('', userMiddleware ,ProfileController.createProfile);
router.put('', userMiddleware ,ProfileController.updateProfile);


export default router;