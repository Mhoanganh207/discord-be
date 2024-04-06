import express from 'express';
import ProfileController from '../controllers/ProfileController';

const router = express.Router();

router.get('/:id', ProfileController.getProfile);


export default router;