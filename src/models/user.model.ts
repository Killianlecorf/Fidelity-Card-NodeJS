import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  theme: {
    // uploadedFiles: [
    //   {
    //     fileName:  string ,
    //     filePath: string ,
    //     uploadedBy: string,
    //   }],
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
    // uploadedFiles: [
    //   {
    //     fileName: { type: String },
    //     filePath: { type: String },
    //     uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    //   },
    // ],
    mainColor: { type: String, required: false },
    secondaryColor: { type: String, required: false },
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