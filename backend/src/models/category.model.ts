import mongoose, { Document, InferSchemaType, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});



type ICategory = InferSchemaType<typeof categorySchema>;

export const Category = mongoose.model<ICategory>('categories', categorySchema);