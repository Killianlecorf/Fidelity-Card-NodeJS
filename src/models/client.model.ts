import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  description: string;
}

const entrepriseSchema: Schema<IClient> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model<IClient>('Client', entrepriseSchema);

export default Client;