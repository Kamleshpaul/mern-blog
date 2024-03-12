import { createCategories, deleteOneCategory, getAllCategory, getOneCategory } from "#/controllers/category.controller";
import { auth } from "#/middlewares/auth.middleware";
import { reqValidate } from "#/middlewares/validator.middleware";
import categoryValidator from "#/validators/category.validator";
import { Router } from "express";


const categoryRoutes = Router();


categoryRoutes.use(auth);

categoryRoutes
  .get('/', getAllCategory)
  .post('/', [reqValidate({ body: categoryValidator })], createCategories)
  .get("/:id", getOneCategory)
  .delete("/:id", deleteOneCategory)



export default categoryRoutes;