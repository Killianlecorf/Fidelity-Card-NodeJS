import mongoose, { Document, Schema } from 'mongoose';

export interface IEntreprise extends Document {
  name: string;
  description: string;
}

const entrepriseSchema: Schema<IEntreprise> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Entreprise = mongoose.model<IEntreprise>('Entreprise', entrepriseSchema);

export default Entreprise;