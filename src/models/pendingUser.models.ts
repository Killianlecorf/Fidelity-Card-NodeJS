import mongoose, { Schema, Document } from 'mongoose';

interface IPendingUser extends Document {
  email: string;
  password: string;
  name: string;
  lname: string;
  verificationCode: string;
  codeExpires: Date;
}

const pendingUserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lname: { type: String, required: true },
  verificationCode: { type: String, required: true, unique: true },
  codeExpires: { type: Date, required: true },
});

export const PendingUser = mongoose.model<IPendingUser>('PendingUser', pendingUserSchema);
