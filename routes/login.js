import { Router } from 'express';
const router = Router();
import { createAccessToken } from '../controller/loginController.js';

router.post("/", createAccessToken);


export default router;