import { Router } from "express";

import MemberController from "../controllers/MemberController";
import userMiddleware from "../middleware/UserMiddleware";

const router = Router();

router.patch('/:memberId',userMiddleware,MemberController.changeMemberRole)
router.delete('/:memberId/:serverId',userMiddleware,MemberController.deleteMember)
router.get("",userMiddleware,MemberController.getMember)

export default router;