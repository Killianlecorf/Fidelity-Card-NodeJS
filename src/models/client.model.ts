import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  lname: string;
  email?: string;
  phoneNumber?: number
  address?: string;
  spendAmount?: number;
  editClientDate: string;
  userId: string;
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
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true
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
  },
  userId: {
    type: String,
    require: true,
  }

});

const Client = mongoose.model<IClient>('Client', ClientSchema);

export default Client;