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
