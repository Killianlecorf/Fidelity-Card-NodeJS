import { Schema, Document, model } from 'mongoose';
import { IEntreprise } from './entreprise.model';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  theme: {
    mainColor: string;
    secondaryColor: string;
  };
  entreprise : IEntreprise[]
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  theme: {
    mainColor: { type: String, required: false },
    secondaryColor: { type: String, required: false }
  },
  entreprise: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Entreprise'
    }
  ]
});

const User = model<IUser>('User', userSchema);

export { User, IUser };