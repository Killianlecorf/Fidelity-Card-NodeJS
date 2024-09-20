import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  lname: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  spendAmount?: number;
  editClientDate: string;
  userId: string;
  isAmount: boolean;
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
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  spendAmount: {
    type: Number,
    required: true,
  },
  editClientDate: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

const Client = mongoose.model<IClient>('Client', ClientSchema);

export default Client;
