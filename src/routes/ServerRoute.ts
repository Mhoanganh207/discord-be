import express from 'express';
import ServerController from '../controllers/ServerController';
import authMiddleware from '../middleware/AuthMiddleware';


const router = express.Router();

// Tam thoi tat authMiddleware do dang loi
router.post('/' ,authMiddleware,  ServerController.createServer
);


export default router;