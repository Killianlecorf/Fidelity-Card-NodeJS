import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  lname: string;
  email?: string;
  spendAmount?: number;
  editDate: Date;
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
  spendAmount: {
    type: Number,
    require: true,
  },
  editDate: {
    type: Date,
    require: true,
  }
});

const Client = mongoose.model<IClient>('Client', ClientSchema);

export default Client;