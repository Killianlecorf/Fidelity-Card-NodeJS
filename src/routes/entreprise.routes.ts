import express from 'express';
import { 
    addEntrepriseToUser,
    deleteEntrepriseById,
    getAllEntreprises,
    updateEntrepriseById
} 
from '../controllers/entreprise.controller';

const router = express.Router();

// Route pour ajouter une entreprise à un utilisateur
router.post('/:userId/entreprise', addEntrepriseToUser);
router.delete('/:entrepriseId', deleteEntrepriseById);
router.get('/', getAllEntreprises);
router.put('/:entrepriseId', updateEntrepriseById);

export default router;