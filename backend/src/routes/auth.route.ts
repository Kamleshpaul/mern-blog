import { getAuthUser, login, logout } from "#/controllers/auth.controller";
import { auth } from "#/middlewares/auth.middleware";
import { reqValidate } from "#/middlewares/validator.middleware";
import loginValidator from "#/validators/login.validator";
import { Router } from "express";


const authRoutes = Router();

authRoutes
  .post('/login', reqValidate({ body: loginValidator }), login)
  .get('/me', auth, getAuthUser)
  .post('/logout', auth, logout)


export default authRoutes