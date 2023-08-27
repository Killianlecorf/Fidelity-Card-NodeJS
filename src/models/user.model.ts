import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  theme: {
    mainColor: string;
  }[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  theme: [{
    mainColor: { type: String, required: false },
    
  }]
});

const User = model<IUser>('User', userSchema);

export { User, IUser };