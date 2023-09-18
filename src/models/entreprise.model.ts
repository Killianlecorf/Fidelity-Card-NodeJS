import mongoose, { Document, Schema } from 'mongoose';

export interface IEntreprise extends Document {
  name: string;
  description: string;
  boutique?: string[];
  client?: string[];
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
  boutique: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Boutique'
    }
  ],
  client: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    }
  ]
});

const Entreprise = mongoose.model<IEntreprise>('Entreprise', entrepriseSchema);

export default Entreprise;