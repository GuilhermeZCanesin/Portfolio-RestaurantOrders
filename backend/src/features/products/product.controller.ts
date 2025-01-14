import { Request, Response } from 'express';
import * as productService from './product.service';
import { ProductRequestInterface } from './product.interface';


export const getProduct = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;

    try {
        const product = await productService.getProduct(productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Could not get Product!', error: (error as Error).message });
    }
};

export const getProducts = async (res: Response): Promise<void> => {
    try {
        const product = await productService.getProducts();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Could not get Products!', error: (error as Error).message });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const product: ProductRequestInterface = req.body;

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