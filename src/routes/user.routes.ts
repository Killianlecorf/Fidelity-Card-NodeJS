import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import {
    getAllUsers,
    getUserById,
    createUser,
    getUserLogin,
    updateUser,
    deleteUser,
    isAuth,
    deleteCookie
  } from '../controllers/user.controller';

const router = express.Router();

router.get('/isAuth',corsMiddleware, requireAuth, isAuth);
router.get('/deleteCookieUser', deleteCookie)

// Routes publiques
router.post('/login',corsMiddleware, getUserLogin);

// Routes protégées
router.get('/', getAllUsers);
router.get('/:id', authenticateUser, getUserById);
router.post('/', createUser);
router.put('/:id', authenticateUser, updateUser);
router.delete('/:id', authenticateUser, deleteUser);

export default router;