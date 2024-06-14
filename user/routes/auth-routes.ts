import { Router } from 'express';
import AuthContoller from "../controllers/auth-controller"

const router = Router();

router.get('/:emailId', AuthContoller.findUserByEmail);

export default router;