import { Category } from "#/models/category.model";
import { TryCatch } from "#/utils/TryCatch";
import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";


export const getAllCategory = TryCatch(async (req: Request, res: Response) => {
  const categories = await Category.find({});
  res.json({
    status: true,
    data: categories
  })
})


export const createCategories = TryCatch(async (req: Request, res: Response) => {
  const result = await Category.create(req.body);
  return res.status(201).json({
    status: true,
    data: result,
    message: "Category Created."
  })
})

export const getOneCategory = TryCatch(async (req: Request<{ id: Schema.Types.ObjectId }>, res: Response, next: NextFunction) => {

  const category = await Category.findById(req.params.id);
  if (!category) res.status(404).json({ status: false, message: "Category not found." })

  res.json({
    status: true,
    data: category
  })

})
export const deleteOneCategory = TryCatch(async (req: Request<{ id: Schema.Types.ObjectId }>, res: Response, next: NextFunction) => {

  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ status: false, message: "Category not found." })
  }

  const result = await category.deleteOne();
  if (result.acknowledged) {
    res.json({
      status: true,
      message: "Category Deleted."
    })
  } else {
    res.status(500).json({
      status: false,
      message: "Something went wrong."
    })
  }


})

