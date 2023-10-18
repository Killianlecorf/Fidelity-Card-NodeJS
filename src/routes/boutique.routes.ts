import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import { 
    addBoutiqueToEntreprise,
    getAllBoutique,
    getBoutiquesByEntrepriseId,
    deleteBoutique,
    updateBoutique
 } from "../controllers/boutique.controller";
const router = express.Router();



// Routes publiques

// Routes protégées
router.post('/:entrepriseId/create',corsMiddleware, requireAuth, authenticateUser, addBoutiqueToEntreprise);
router.get('/', corsMiddleware, requireAuth, authenticateUser, getAllBoutique);
router.get('/:entrepriseId/boutiques', corsMiddleware, requireAuth, authenticateUser, getBoutiquesByEntrepriseId);
router.delete('/:entrepriseId/:boutiqueId', corsMiddleware, requireAuth, authenticateUser, deleteBoutique)
router.put('/:entrepriseId/:boutiqueId', corsMiddleware, requireAuth, authenticateUser, updateBoutique)


export default router;