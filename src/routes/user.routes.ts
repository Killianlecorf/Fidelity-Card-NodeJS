import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import {
    getAllUsers,
    getUserById,
    createUser,
    getUserLogin,
    updateUser,
    deleteUser
  } from '../controllers/user.controller';

const router = express.Router();

// Routes publiques
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login',corsMiddleware, getUserLogin);

// Routes protégées
router.put('/:id', authenticateUser, updateUser);
router.delete('/:id', authenticateUser, deleteUser);

export default router;