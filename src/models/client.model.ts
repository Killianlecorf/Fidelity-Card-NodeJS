import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  lname: string;
  email?: string;
  address?: string;
  spendAmount?: number;
  editClientDate: string;
}

const ClientSchema: Schema<IClient> = new Schema({
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
  },
  address: {
    type: String,
    required: true,
  },
  spendAmount: {
    type: Number,
    require: true,
  },
  editClientDate: {
    type: String,
    require: true,
  }
});

const Client = mongoose.model<IClient>('Client', ClientSchema);

export default Client;