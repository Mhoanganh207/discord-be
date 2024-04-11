import express from 'express';
import ServerController from '../controllers/ServerController';
import authMiddleware from '../middleware/AuthMiddleware';


const router = express.Router();

router.get('/all',authMiddleware,ServerController.getServers )
router.post('', authMiddleware ,ServerController.createServer);
router.get("/:id", authMiddleware, ServerController.getServerById)



export default router;