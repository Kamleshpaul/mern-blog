import { NextFunction, Request, Response } from "express";
import { JWT_KEY, TOKEN_KEY } from "#/config";
import jwt from "jsonwebtoken";
import { User } from "#/models/user.model";
import { TryCatch } from "#/utils/TryCatch";
import { DecodedToken, IRequest } from "#/types/app.type";



export const auth = async (req: IRequest, res: Response, next: NextFunction) => {

  try {
    const token = req.cookies[TOKEN_KEY]
    const decoded = jwt.verify(token, JWT_KEY);

    if (!decoded) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized"
      })
    }


    if (typeof decoded === 'string') {
      return res.status(401).json({
        status: false,
        message: "Unauthorized"
      })
    }


    const decodedToken: DecodedToken = decoded as DecodedToken;
    const user = await User.findById(decodedToken._id!);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized"
      })
    }

    req.userId = user.id

  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized"
    })
  }

  next();
}