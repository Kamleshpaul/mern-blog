import { User } from "#/models/user.model";
import { TryCatch } from "#/utils/TryCatch";
import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";


export const getAllUsers = TryCatch(async (req: Request, res: Response) => {
  const users = await User.find({});
  res.json({
    status: true,
    data: users
  })
})


export const createUser = TryCatch(async (req: Request, res: Response) => {
  const result = await User.create(req.body);
  res.json({
    status: true,
    data: result,
    message: "User Created."
  })
})

export const getOneUser = TryCatch(async (req: Request<{ id: Schema.Types.ObjectId }>, res: Response, next: NextFunction) => {

  const user = await User.findById(req.params.id);
  if (!user) res.status(404).json({ status: false, message: "User not found." })

  res.json({
    status: true,
    data: user
  })

})
export const deleteOneUser = TryCatch(async (req: Request<{ id: Schema.Types.ObjectId }>, res: Response, next: NextFunction) => {

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ status: false, message: "User not found." })
  }

  const result = await user.deleteOne();
  if (result.acknowledged) {
    res.json({
      status: true,
      message: "User Deleted."
    })
  } else {
    res.status(500).json({
      status: false,
      message: "Something went wrong."
    })
  }


})

