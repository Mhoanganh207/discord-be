import express from 'express';
import ServerController from '../controllers/ServerController';
import userMiddleware from '../middleware/UserMiddleware';


const router = express.Router();

router.patch("/:id/invite", userMiddleware, ServerController.newInviteCode)
router.get('/all',userMiddleware,ServerController.getServers )
router.post('', userMiddleware ,ServerController.createServer)
router.get("/:id", userMiddleware, ServerController.getServerById)
router.delete("/:id", userMiddleware, ServerController.deleteServer)
router.patch("/:id/leave", userMiddleware, ServerController.leaveServer)
router.patch("/join/:inviteCode", userMiddleware, ServerController.joinServer)
router.patch("/:id", userMiddleware, ServerController.updateServer)



export default router;