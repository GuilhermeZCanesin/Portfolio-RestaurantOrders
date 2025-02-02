import { Request, Response } from "express";
import * as productService from "./product.service";
import { ProductRequestInterface } from "./product.interface";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId: string = req.query.id as string;
  try {
    const product = await productService.getProductsByCategory(categoryId);
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Could not get Products!",
      error: (error as Error).message,
    });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await productService.getProducts();
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Could not get Products!",
      error: (error as Error).message,
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const product: ProductRequestInterface = req.body;
  if (!req.file || Object.keys(req.files).length === 0) {
    throw new Error("No image provided!");
  }

  // Multer
  // const { filename: banner } = req.file;

  const file: UploadedFile | UploadedFile[] = req.files["file"];

  const resultFile = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      })
      .end(file[0].data);
  });

  try {
    const productCreated = await productService.createProduct(product);
    res
      .status(201)
      .json({ message: "Product created successfully!", productCreated });
  } catch (error) {
    res.status(400).json({
      message: "Product creation failed!",
      error: (error as Error).message,
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productDeletedId: string = req.query.id as string;

  try {
    const productDeleted = await productService.deleteProduct(productDeletedId);
    res.status(201).json({
      message: "Product deleted successfully!",
      product: productDeleted.name,
    });
  } catch (error) {
    res.status(400).json({
      message: "Product deletion failed!",
      error: (error as Error).message,
    });
  }
};
