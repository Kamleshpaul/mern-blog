import { Blog } from "#/models/blog.model";
import { User } from "#/models/user.model";
import { IParamsWithId, IRequest } from "#/types/app.type";
import { TryCatch } from "#/utils/TryCatch";
import { IBlogComment } from "#/validators/blogComment.validator";
import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";


export const getAllBlogs = TryCatch(async (req: Request, res: Response) => {
  const blogs = await Blog.find({});
  res.json({
    status: true,
    data: blogs
  })
})


export const createBlog = TryCatch(async (req: Request, res: Response) => {

  const result = await Blog.create(req.body);
  return res.status(201).json({
    status: true,
    data: result,
    message: "Blog Created."
  })
})

export const getOneBlog = TryCatch(async (req: Request<{ id: Schema.Types.ObjectId }>, res: Response, next: NextFunction) => {

  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ status: false, message: "Blog not found." })

  return res.json({
    status: true,
    data: blog
  })

})
export const deleteOneBlog = TryCatch(async (req: Request<{ id: Schema.Types.ObjectId }>, res: Response, next: NextFunction) => {

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ status: false, message: "Blog not found." })
  }

  const result = await blog.deleteOne();
  if (result.acknowledged) {
    return res.json({
      status: true,
      message: "Blog Deleted."
    })
  } else {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    })
  }
})




export const commentToBlog = TryCatch(async (req: Request<IParamsWithId, {}, IBlogComment> & IRequest, res: Response) => {

  const comment = {
    body: req.body.comment,
    date: new Date(),
    user: req.userId
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { comments: comment } },
    { new: true });


  if (!blog) return res.status(500).json({ status: false, message: "Something went wrong." })

  return res.json({
    status: true,
    message: "commented.",
  })
})

