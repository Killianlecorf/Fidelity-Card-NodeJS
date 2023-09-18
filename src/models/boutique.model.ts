import mongoose, { Document, Schema } from 'mongoose';

export interface IBoutique extends Document {
  name: string;
  description: string;
}

const entrepriseSchema: Schema<IBoutique> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Boutique = mongoose.model<IBoutique>('Boutique', entrepriseSchema);

export default Boutique;