import { Router } from "express";

import MemberController from "../controllers/MemberController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.patch('/:memberId',authMiddleware,MemberController.changeMemberRole)
router.delete('/:memberId',authMiddleware,MemberController.deleteMember)
router.get("",authMiddleware,MemberController.getMember)

export default router;