import { Request, Response } from 'express';
import * as itemService from './item.service';
import { ItemRequestInterface } from './item.interface';


export const getOrderItems = async (req: Request, res: Response): Promise<void> => {
    const orderId: string = req.query.id as string;

    try {
        const items = await itemService.getOrderItems(orderId);
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Could not get Items!', error: (error as Error).message });
    }
};

export const addItemToOrder = async (req: Request, res: Response): Promise<void> => {
    const item: ItemRequestInterface = req.body;

    try {
        const itemAdded = await itemService.addItemToOrder(item);
        res.status(201).json({ message: 'Item added successfully!', itemAdded });
    } catch (error) {
        res.status(400).json({ message: 'Item add failed!', error: (error as Error).message });
    }
};

export const removeItemFromOrder = async (req: Request, res: Response): Promise<void> => {
    const itemRemovedId: string = req.query.id as string;

    try {
        const itemRemoved = await itemService.removeItemFromOrder(itemRemovedId);
        res.status(201).json({ message: 'Item removed successfully!', item: itemRemoved });
    } catch (error) {
        res.status(400).json({ message: 'Item removal failed!', error: (error as Error).message });
    }
};