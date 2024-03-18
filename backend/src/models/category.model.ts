import mongoose, { InferSchemaType, Schema } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});



export type ICategory = InferSchemaType<typeof categorySchema> & {
  _id: Schema.Types.ObjectId
};;

export const Category = mongoose.model<ICategory>('categories', categorySchema);