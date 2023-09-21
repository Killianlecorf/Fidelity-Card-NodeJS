import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
// import { requireAuth } from '../middlewares/requireAuth.middleware';
// import { corsMiddleware } from '../middlewares/credentials.middleware';
import {
    addBoutiqueToEntreprise
  } from '../controllers/boutique.controller';

const router = express.Router();



// Routes publiques

// Routes protégées
router.post('/:entrepriseId/create', authenticateUser, addBoutiqueToEntreprise);

export default router;