import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import {
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
router.delete('/:client', corsMiddleware, requireAuth, authenticateUser, deleteClient)
router.put('/:client', corsMiddleware, requireAuth, authenticateUser, updateClient)

export default router;