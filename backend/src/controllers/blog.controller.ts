import { Blog } from "#/models/blog.model";
import { User } from "#/models/user.model";
import { TryCatch } from "#/utils/TryCatch";
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
  res.json({
    status: true,
    data: result,
    message: "Blog Created."
  })
})

export const getOneBlog = TryCatch(async (req: Request<{ id: Schema.Types.ObjectId }>, res: Response, next: NextFunction) => {

  const blog = await Blog.findById(req.params.id);
  if (!blog) res.status(404).json({ status: false, message: "Blog not found." })

  res.json({
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
    res.json({
      status: true,
      message: "Blog Deleted."
    })
  } else {
    res.status(500).json({
      status: false,
      message: "Something went wrong."
    })
  }


})

