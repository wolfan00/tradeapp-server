import express from 'express';
const router = express.Router();

import signUpUser from '../controller/signupController.js';

router.post('/', signUpUser);

export default router;