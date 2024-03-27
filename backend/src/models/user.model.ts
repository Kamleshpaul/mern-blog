import mongoose, { Document, InferSchemaType, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
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
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
  }
});

userSchema.pre<IUser & Document>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }

  if (!this.isModified('role')) {
    this.role = "user";
  }
  next();
});

export type IUser = InferSchemaType<typeof userSchema> & {
  _id: Schema.Types.ObjectId
};

export const User = mongoose.model<IUser>('users', userSchema);