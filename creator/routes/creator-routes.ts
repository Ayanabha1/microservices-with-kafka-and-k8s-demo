import { Router } from 'express';
import CreatorController from "../controllers/creator-controller"

const router = Router();

router.get('/:emailId', CreatorController.findUserByEmail);

export default router;