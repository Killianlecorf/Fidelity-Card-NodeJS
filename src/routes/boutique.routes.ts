import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
// import { requireAuth } from '../middlewares/requireAuth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import {
    addBoutiqueToEntreprise,
    getAllBoutique,
    getBoutiquesByEntrepriseId,
    deleteBoutique
  } from '../controllers/boutique.controller';

const router = express.Router();



// Routes publiques

// Routes protégées
router.post('/:entrepriseId/create',corsMiddleware, authenticateUser, addBoutiqueToEntreprise);
router.get('/',corsMiddleware, authenticateUser, getAllBoutique);
router.get('/:entrepriseId/boutiques',corsMiddleware, authenticateUser, getBoutiquesByEntrepriseId);
router.delete('/:entrepriseId/:boutiqueId',corsMiddleware, authenticateUser, deleteBoutique)

export default router;