import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import {
    getRedirection,
    getAllUsers,
    getUserById,
    createUser,
    getUserLogin,
    updateUser,
    deleteUser,
    isAuth,
    deleteCookie,
    getInformationUser,
  } from '../controllers/user.controller';

const router = express.Router();

router.get('/isAuth',corsMiddleware, requireAuth, isAuth);
router.get('/deleteCookieUser', deleteCookie)
router.get('/redirect', corsMiddleware, getRedirection);

// Routes publiques
router.post('/login',corsMiddleware, getUserLogin);

// Routes protégées
router.get('/', authenticateUser, getAllUsers);
router.get('/getUser', corsMiddleware, authenticateUser, getInformationUser);
router.get('/:id', corsMiddleware, authenticateUser, getUserById);
router.post('/',corsMiddleware, authenticateUser, createUser);
router.put('/:id',corsMiddleware, authenticateUser, updateUser);
router.delete('/:id', corsMiddleware, authenticateUser, deleteUser);

export default router;