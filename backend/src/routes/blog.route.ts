import { commentToBlog, createBlog, deleteOneBlog, getAllBlogs, getOneBlog } from "#/controllers/blog.controller";
import { auth } from "#/middlewares/auth.middleware";
import { reqValidate } from "#/middlewares/validator.middleware";
import blogValidator from "#/validators/blog.validator";
import blogCommentValidator from "#/validators/blogComment.validator";
import { Router } from "express";


const blogRoutes = Router();


blogRoutes.use(auth);

blogRoutes
  .get('/', getAllBlogs)
  .post('/', [reqValidate({ body: blogValidator })], createBlog)
  .get("/:id", getOneBlog)
  .post("/:id/comment", [reqValidate({ body: blogCommentValidator })], commentToBlog)
  .delete("/:id", deleteOneBlog)



export default blogRoutes;