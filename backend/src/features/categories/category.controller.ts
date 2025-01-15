import { Request, Response } from 'express';
import * as categoryService from './category.service';
import { CategoryRequestInterface } from './category.interface';


export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await categoryService.getCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Could not get Categories!', error: (error as Error).message });
    }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    const category: CategoryRequestInterface = req.body;

    try {
        const categoryCreated = await categoryService.createCategory(category);
        res.status(201).json({ message: 'Category created successfully!', categoryCreated });
    } catch (error) {
        res.status(400).json({ message: 'Category creation failed!', error: (error as Error).message });
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const categoryDeletedId: string = req.query.id as string;

    try {
        const categoryDeleted = await categoryService.deleteCategory(categoryDeletedId);
        res.status(201).json({ message: 'Category deleted successfully!', category: categoryDeleted.name });
    } catch (error) {
        res.status(400).json({ message: 'Category deletion failed!', error: (error as Error).message });
    }
};