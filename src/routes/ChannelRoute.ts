import { Router } from "express";
import ChannelController from "../controllers/ChannelController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.post("", authMiddleware ,ChannelController.createChannel);
router.delete("", authMiddleware ,ChannelController.deleteChannel);
router.put("", authMiddleware ,ChannelController.updateChannel);


export default router;

