import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// User Interface එක (Data Types)
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // admin or user
}, {
  timestamps: true
});

// Password එක Save කරන්න කලින් Hash කරන කොටස (Encryption)
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Password Match කරලා බලන Method එක
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);