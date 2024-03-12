import { createCategories, deleteOneCategory, getAllCategory, getOneCategory } from "#/controllers/category.controller";
import { reqValidate } from "#/middlewares/validator.middleware";
import categoryValidator from "#/validators/category.validator";
import { Router } from "express";


const categoryRoutes = Router();


categoryRoutes
  .get('/', getAllCategory)
  .post('/', [reqValidate({ body: categoryValidator })], createCategories)
  .get("/:id", getOneCategory)
  .delete("/:id", deleteOneCategory)



export default categoryRoutes;