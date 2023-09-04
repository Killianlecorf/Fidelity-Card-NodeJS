import { Request, Response } from 'express';
import { User, IUser } from '../models/user.model';
import Entreprise from '../models/entreprise.model';

// Ajouter une entreprise à un utilisateur
export const addEntrepriseToUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, description } = req.body;

  try {
    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    // Créez une nouvelle entreprise
    const newEntreprise = new Entreprise({
      name,
      description,
    });

    // Enregistrez l'entreprise
    await newEntreprise.save();

    // Ajoutez l'entreprise à la liste des entreprises de l'utilisateur

    user?.entreprise?.push(newEntreprise);
    await user.save();

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


// Supprimer une entreprise par ID
export const deleteEntrepriseById = async (req: Request, res: Response) => {
    const { entrepriseId } = req.params;
  
    try {
      // Recherchez l'entreprise à supprimer
      const entreprise = await Entreprise.findById(entrepriseId);
  
      if (!entreprise) {
        return res.status(404).json({ message: 'Entreprise introuvable' });
      }
  
      // Supprimez l'entreprise de la collection Entreprise
      await Entreprise.findByIdAndDelete(entrepriseId);
  
      // Mettez à jour l'utilisateur pour supprimer la référence à l'entreprise
      const user = await User.findById(req.user.id);
  
      if (user) {
        // Supprimez l'entreprise de la liste des entreprises de l'utilisateur
        user.entreprise = user.entreprise?.filter((id) => id.toString() !== entrepriseId);
  
        // Enregistrez manuellement les modifications de l'utilisateur
        await user.save();
      }
  
      res.status(200).json({ message: 'Entreprise supprimée avec succès' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };


  // Récupérer toutes les entreprises
export const getAllEntreprises = async (req: Request, res: Response) => {
    try {
      const entreprises = await Entreprise.find();
  
      res.status(200).json(entreprises);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };


// Modifier une entreprise par ID
export const updateEntrepriseById = async (req: Request, res: Response) => {
    const { entrepriseId } = req.params;
    const { name, description } = req.body;
  
    try {
      // Vérifiez si l'entreprise existe
      const entreprise = await Entreprise.findById(entrepriseId);
  
      if (!entreprise) {
        return res.status(404).json({ message: 'Entreprise introuvable' });
      }
  
      // Mettez à jour les données de l'entreprise
      entreprise.name = name || entreprise.name;
      entreprise.description = description || entreprise.description;
  
      // Enregistrez les modifications
      await entreprise.save();
  
      res.status(200).json(entreprise);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };

// Afficher une entreprise par ID
export const getEntrepriseById = async (req: Request, res: Response) => {
    const { entrepriseId } = req.params;
  
    try {
      // Recherchez l'entreprise par ID
      const entreprise = await Entreprise.findById(entrepriseId);
  
      if (!entreprise) {
        return res.status(404).json({ message: 'Entreprise introuvable' });
      }
  
      res.status(200).json(entreprise);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };



  
  