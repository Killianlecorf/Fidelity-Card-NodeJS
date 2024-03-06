import { Request, Response } from 'express';
import Client, { IClient } from '../models/client.model';
import GetMonthName  from "../Utils/GetMonthName";
import mongoose from 'mongoose';
import isValidEmail from "../Utils/isValidationEmail";

// Ajouter un client
export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, lname, email, phoneNumber,  address } = req.body;
    const {userId} = req.params


    if (!name || !lname || !email || !phoneNumber || !address) {
      return res.status(400).json({error: "Veuillez remplir tous les champs"})
    }

    const existingEmailClient = await Client.findOne({ email })
    if (existingEmailClient) {
      return res.status(400).json({error: "Ce mail est déja utiliser"})
    }

    const existingClient = await Client.findOne({ phoneNumber });
    if (existingClient) {
      return res.status(400).json({ error: "Ce numéro de téléphone est déjà utilisé" });
    }
    


    const newClient = new Client()
    newClient.name = name;
    newClient.lname = lname;
    newClient.email = email || "";
    newClient.phoneNumber = phoneNumber;
    newClient.address = address;
    newClient.spendAmount = 0;
    newClient.userId = userId;
    newClient.isAmount = false

    if (newClient.email && !isValidEmail(newClient.email)) {
      return res.status(400).json({error : "Votre format de mail n'est pas bon "})
    }

    const currentDate = new Date();

    const day = currentDate.getDate(); 
    const month = currentDate.getMonth() ;
    const monthString = GetMonthName(month)
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    newClient.editClientDate = `${day} ${monthString} à ${hour}H${minutes}`;

    const savedClient = await newClient.save();

    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ error: "Impossible d'ajouter le client" });
  }
};


export const getClientsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId; 

  try {
    const clients = await Client.find({ userId: userId });

    if (clients.length === 0) {
      return res.status(404).json({ error: "Aucun client trouvé pour cet utilisateur" });
    }

    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des clients de l\'utilisateur' });
  }
};

// Afficher un client par son ID
export const getClientById = async (req: Request, res: Response) => {
  try {
    const clientId = req.params.clientId;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ error: 'ID client invalide' });
    }

    const client = await Client.findById(clientId);

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
