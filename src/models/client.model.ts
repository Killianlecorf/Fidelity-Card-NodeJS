import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  lname: string;
  email?: string;
}

const entrepriseSchema: Schema<IClient> = new Schema({
  name: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const Client = mongoose.model<IClient>('Client', entrepriseSchema);

export default Client;