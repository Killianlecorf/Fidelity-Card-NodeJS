import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
// import { requireAuth } from '../middlewares/requireAuth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import {
    addBoutiqueToEntreprise,
    getAllBoutique,
    getBoutiquesByEntrepriseId
  } from '../controllers/boutique.controller';

const router = express.Router();



// Routes publiques

// Routes protégées
router.post('/:entrepriseId/create', authenticateUser, addBoutiqueToEntreprise);
router.get('/', authenticateUser, getAllBoutique);
router.get('/:entrepriseId/boutiques',corsMiddleware, authenticateUser, getBoutiquesByEntrepriseId);

export default router;