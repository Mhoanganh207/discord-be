import { Router } from "express";
import ConversationController from "../controllers/ConversationController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.get("",authMiddleware ,ConversationController.getConversation);

export default router;