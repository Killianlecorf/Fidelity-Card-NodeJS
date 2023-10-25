import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  theme: {
    logo: Buffer;
    mainColor: string;
    secondaryColor: string;
  };
  entreprise?: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  theme: {
    logo: Buffer,
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