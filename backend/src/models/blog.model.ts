import mongoose, { Document, InferSchemaType, Schema, SchemaType } from 'mongoose'
import slugify from 'slugify';

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      body: String,
      date: Date,
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
    }
  ],
  status: {
    type: String,
    enum: ['open', 'draft', 'published'],
    default: "open"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
    required: true
  },
  publishAt: {
    type: Date,
  }
}, {
  timestamps: true
});


type IBlog = InferSchemaType<typeof blogSchema> & {
  _id: Schema.Types.ObjectId
};;

export const Blog = mongoose.model<IBlog>('blogs', blogSchema);