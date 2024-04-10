import express from 'express';
import ServerController from '../controllers/ServerController';
import authMiddleware from '../middleware/AuthMiddleware';


const router = express.Router();


router.post('', authMiddleware ,ServerController.createServer);
router.get("/:id", authMiddleware, ServerController.getServerById)
router.get('',authMiddleware,ServerController.getServers )


export default router;