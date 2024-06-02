import { Router } from "express";
import ConversationController from "../controllers/ConversationController";
import userMiddleware from "../middleware/UserMiddleware";

const router = Router();

router.get("",userMiddleware ,ConversationController.getConversation);

export default router;