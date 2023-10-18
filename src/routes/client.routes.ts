import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import {
    createClient,
    updateClient,
    deleteClient,
    getClientById,
    getAllClients
  } from '../controllers/client.controller';

const router = express.Router();



// Routes publiques

// Routes protégées
router.post('/', corsMiddleware, requireAuth, authenticateUser, createClient);
router.get('/', corsMiddleware, requireAuth, authenticateUser, getAllClients);
router.get('/:client', corsMiddleware, requireAuth, authenticateUser, getClientById);
router.delete('/:client', corsMiddleware, requireAuth, authenticateUser, deleteClient)
router.put('/:client', corsMiddleware, requireAuth, authenticateUser, updateClient)

export default router;