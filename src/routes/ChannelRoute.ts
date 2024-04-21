import { Router } from "express";
import ChannelController from "../controllers/ChannelController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.post("", authMiddleware ,ChannelController.createChannel);
router.delete("/:id", authMiddleware ,ChannelController.deleteChannel);
router.patch("/:id", authMiddleware ,ChannelController.updateChannel);
router.get("/:id" ,ChannelController.getChannelById);

export default router;

