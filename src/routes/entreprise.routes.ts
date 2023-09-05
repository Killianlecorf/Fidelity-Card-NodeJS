import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import { 
    addEntrepriseToUser,
    deleteEntrepriseById,
    getAllEntreprises,
    updateEntrepriseById,
    getEntrepriseById
} 
from '../controllers/entreprise.controller';

const router = express.Router();

// Route pour ajouter une entreprise à un utilisateur
router.post('/:userId/create',authenticateUser, addEntrepriseToUser);
router.delete('/:entrepriseId',authenticateUser, deleteEntrepriseById);
router.get('/',corsMiddleware,authenticateUser, getAllEntreprises);
router.get('/:entrepriseId',corsMiddleware,authenticateUser, getEntrepriseById);
router.put('/:entrepriseId',authenticateUser, updateEntrepriseById);

export default router;