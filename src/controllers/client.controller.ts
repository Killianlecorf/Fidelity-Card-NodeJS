import { Request, Response } from 'express';
import Client from '../models/client.model';

// Ajouter un client
export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, lname, email, spendAmount, editDate } = req.body;
    const client = new Client({
      name,
      lname,
      email,
      spendAmount,
      editDate,
    });

    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ error: "Impossible d'ajouter le client" });
  }
};

// Afficher tous les clients
export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des clients' });
  }
};

// Afficher un client par son ID
export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du client' });
  }
};

// Mettre à jour un client par son ID
export const updateClient = async (req: Request, res: Response) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClient) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du client' });
  }
};

// Supprimer un client par son ID
export const deleteClient = async (req: Request, res: Response) => {
  try {
    const deletedClient = await Client.findByIdAndRemove(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }
    res.json(deletedClient);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du client' });
  }
};
