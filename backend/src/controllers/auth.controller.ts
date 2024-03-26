import { IloginPayload } from "#/types/user.type";
import { TryCatch } from "#/utils/TryCatch";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { User } from "#/models/user.model";
import jwt from "jsonwebtoken";
import { IRequest } from "#/types/app.type";

export const login = TryCatch(async (req: Request<{}, {}, IloginPayload>, res: Response) => {

  const tokenExist = req.cookies[process.env.TOKEN_KEY]
  if (tokenExist) {
    return res.status(400).json({ status: false, message: "Already logged in" })
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ status: false, message: "Invalid credentials" })
  }

  if (!await bcrypt.compare(req.body.password, user.password)) {
    return res.status(400).json({ status: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ _id: user.id }, process.env.JWT_KEY);

  res.cookie(process.env.TOKEN_KEY,
    token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true
  })
    .json({
      status: true,
      message: "login successfully.",
    })

})


export const getAuthUser = TryCatch(async (req: IRequest, res: Response) => {

  const user = await User.findById(req.userId);
  res
    .json({
      status: true,
      data: user,
    })

})

export const logout = TryCatch(async (req: Request, res: Response) => {

  return res.clearCookie(process.env.TOKEN_KEY)
    .json({
      status: true,
      message: "logout successfully.",
    })

})