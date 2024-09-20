import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PendingUser } from '../models/pendingUser.models';
import { sendVerificationEmail } from '../services/emailService';
import { isValidEmail } from '../Utils/isValidationEmail';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name, lname } = req.body;

  try {
    if (!email || !password || !name || !lname) {
      return res.status(400).json({ error: 'Vous devez remplir tous les champs.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Veuillez saisir un bon format d'email." });
    }

    const existingUser = await PendingUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Cet utilisateur existe déjà.' });
    }

    const verificationCode = crypto.randomBytes(18).toString('hex');

    const pendingUser = new PendingUser({
      email,
      password: await bcrypt.hash(password, 10),
      name,
      lname,
      verificationCode: verificationCode,
      codeExpires: Date.now() + 3600000
    });

    await pendingUser.save();

    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: 'Un code de vérification a été envoyé à votre adresse email.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'inscription." });
  }
};
