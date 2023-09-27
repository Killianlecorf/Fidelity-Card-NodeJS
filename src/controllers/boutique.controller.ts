import { Request, Response } from 'express';
import Entreprise, { IEntreprise } from '../models/entreprise.model';
import Boutique from '../models/boutique.model';

// Ajouter une boutique à une entreprise
export const addBoutiqueToEntreprise = async (req: Request, res: Response) => {
  const { entrepriseId } = req.params;
  const { name, description } = req.body;

  try {
    const entreprise: IEntreprise | null = await Entreprise.findById(entrepriseId);

    if (!entreprise) {
      return res.status(404).json({ message: 'Entreprise introuvable' });
    }

    const newBoutique = new Boutique({
      name,
      description,
    });


    await newBoutique.save();

    entreprise?.boutique?.push(newBoutique._id);
    await entreprise.save();

    res.status(201).json(entreprise);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllBoutique = async (req: Request, res: Response) => {
  try {
    const boutiques = await Boutique.find();

    res.status(200).json(boutiques);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour récupérer toutes les boutiques d'une entreprise par son ID
export const getBoutiquesByEntrepriseId = async (req: Request, res: Response) => {
  try {
    const entrepriseId = req.params.entrepriseId;

    // Recherche de l'entreprise par ID
    const entreprise = await Entreprise.findById(entrepriseId);

    if (!entreprise) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }

    // Récupération de toutes les boutiques liées à cette entreprise
    const boutiques = await Boutique.find({ _id: { $in: entreprise.boutique } });

    res.json(boutiques);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des boutiques de l\'entreprise' });
  }
};