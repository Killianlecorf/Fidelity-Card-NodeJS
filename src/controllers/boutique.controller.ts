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

    res.status(201).json({message: 'Boutique créer avec succès' ,entreprise});
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

// Fonction pour supprimer une boutique d'une entreprise
export const deleteBoutique = async (req: Request, res: Response) => {
  const entrepriseId: string = req.params.entrepriseId;
  const boutiqueId: string = req.params.boutiqueId;

  try {
      // Recherche de l'entreprise par ID
      const entreprise: IEntreprise | null = await Entreprise.findById(entrepriseId);

      if (!entreprise) {
          return res.status(404).json({ message: 'Entreprise non trouvée.' });
      }

      // Vérification si la boutique à supprimer est dans la liste des boutiques de l'entreprise
      const boutiqueIndex: number = entreprise.boutique.indexOf(boutiqueId);
      if (boutiqueIndex === -1) {
          return res.status(404).json({ message: 'Boutique non trouvée dans cette entreprise.' });
      }

      // Suppression de la boutique de la liste
      entreprise?.boutique?.splice(boutiqueIndex, 1);

      // Sauvegarde de l'entreprise mise à jour
      await entreprise.save();

      res.json({ message: 'Boutique supprimée avec succès.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la boutique.' });
  }
};