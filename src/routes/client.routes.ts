import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import {
    editAmountClient,
    createClient,
    updateClient,
    deleteClient,
    getClientById,
    getClientsByUserId
  } from '../controllers/client.controller';

const router = express.Router();



// Routes publiques

// Routes protégées
router.post('/:userId', corsMiddleware, requireAuth, authenticateUser, createClient);
router.get('/:userId', corsMiddleware, requireAuth, authenticateUser, getClientsByUserId);
router.get('/informations/:clientId', corsMiddleware, requireAuth, authenticateUser, getClientById);
router.delete('/:clientId', corsMiddleware, requireAuth, authenticateUser, deleteClient)
router.put('/:clientId', corsMiddleware, requireAuth, authenticateUser, updateClient)
router.put('/amount/:clientId', corsMiddleware, requireAuth, authenticateUser, editAmountClient)

export default router;