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
    deleteCookie,
    getInformationUser,
    handleFileUpload,
    uploadFile
  } from '../controllers/user.controller';

const router = express.Router();

router.get('/isAuth',corsMiddleware, requireAuth, isAuth);
router.get('/deleteCookieUser', deleteCookie)

// Routes publiques
router.post('/login',corsMiddleware, getUserLogin);

// Routes protégées
router.get('/', authenticateUser, getAllUsers);
router.get('/getUser', corsMiddleware, authenticateUser, getInformationUser);
router.get('/:id', corsMiddleware, authenticateUser, getUserById);
router.post('/',corsMiddleware, authenticateUser, createUser);
router.put('/:id',corsMiddleware, authenticateUser, updateUser);
router.delete('/:id', corsMiddleware, authenticateUser, deleteUser);
router.post('/upload', corsMiddleware, authenticateUser, handleFileUpload, uploadFile);

export default router;