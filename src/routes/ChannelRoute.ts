import { Router } from "express";
import ChannelController from "../controllers/ChannelController";
import userMiddleware from "../middleware/UserMiddleware";

const router = Router();

router.post("", userMiddleware ,ChannelController.createChannel);
router.delete("/:id", userMiddleware ,ChannelController.deleteChannel);
router.put("/:id", userMiddleware ,ChannelController.updateChannel);
router.get("/:id" ,ChannelController.getChannelById);

export default router;

