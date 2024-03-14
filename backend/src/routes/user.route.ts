import { createUser, deleteOneUser, getAllUsers, getOneUser } from "#/controllers/user.controller";
import { auth } from "#/middlewares/auth.middleware";
import { reqValidate } from "#/middlewares/validator.middleware";
import userValidator from "#/validators/user.validator";
import { Router } from "express";


const userRoutes = Router();


userRoutes.use(auth);
userRoutes
  .get('/', getAllUsers)
  .post('/', [reqValidate({ body: userValidator })], createUser)
  .get("/:id", getOneUser)
  .delete("/:id", deleteOneUser)



export default userRoutes;