import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '#/types/user.type';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required."],
  }
});

userSchema.pre<IUser & Document>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});


export const User = mongoose.model<IUser>('users', userSchema);