import { Request, Response } from 'express';
import * as productService from './product.service';
import { ProductRequestInterface } from './product.interface';


export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    const categoryId: string = req.params.id;
    try {
        const product = await productService.getProductsByCategory(categoryId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Could not get Products!', error: (error as Error).message });
    }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await productService.getProducts();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Could not get Products!', error: (error as Error).message });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const product: ProductRequestInterface = req.body;
    if (!req.file) {
        throw new Error('No image provided!');
    }

    const { filename: banner } = req.file;
    product.banner = banner;

    try {
        const productCreated = await productService.createProduct(product);
        res.status(201).json({ message: 'Product created successfully!', productCreated });
    } catch (error) {
        res.status(400).json({ message: 'Product creation failed!', error: (error as Error).message });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const productDeletedId: string = req.params.id;

    try {
        const productDeleted = await productService.deleteProduct(productDeletedId);
        res.status(201).json({ message: 'Product deleted successfully!', product: productDeleted.name });
    } catch (error) {
        res.status(400).json({ message: 'Product deletion failed!', error: (error as Error).message });
    }
};