import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  theme: {
    mainColor: string;
    secondaryColor: string;
  };
  entreprise?: string[];
  modality: {
    amountMax: number,
    amountReduction: number
  }
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  theme: {
    mainColor: { type: String, required: false },
    secondaryColor: { type: String, required: false },
  },
  entreprise: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Entreprise'
    }
  ],
  modality: {
    amountMax: { type: Number},
    amountReduction: { type:Number }
  }
});

const User = model<IUser>('User', userSchema);

export { User, IUser };