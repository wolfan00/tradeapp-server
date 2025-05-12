import express from 'express';
const router = express.Router();

import{
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controller/usersController.js';

router.get('/',getAllUsers);

router.get('/:id',getUserById);

router.post('/',createUser);

router.put('/:id', updateUser);

router.delete('/:id',deleteUser);

export default router;
