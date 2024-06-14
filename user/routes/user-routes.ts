import { Router } from 'express';
import UserController from "../controllers/user-controller"

const router = Router();

router.get('/become-creator/:emailId', UserController.becomeCreator);
router.get('/become-creator-2/:emailId', UserController.becomeCreator2);

export default router;