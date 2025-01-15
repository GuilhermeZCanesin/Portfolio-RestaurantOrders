import { Request, Response } from 'express';
import * as orderService from './order.service';
import { OrderRequestInterface } from './order.interface';


export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await orderService.getOrders();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Could not get Orders!', error: (error as Error).message });
    }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const order: OrderRequestInterface = req.body;

    try {
        const orderCreated = await orderService.createOrder(order);
        res.status(201).json({ message: 'Order created successfully!', orderCreated });
    } catch (error) {
        res.status(400).json({ message: 'Order creation failed!', error: (error as Error).message });
    }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    const order: OrderRequestInterface = req.body;

    try {
        const orderCreated = await orderService.updateOrder(order);
        res.status(201).json({ message: 'Order created successfully!', orderCreated });
    } catch (error) {
        res.status(400).json({ message: 'Order creation failed!', error: (error as Error).message });
    }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    const orderDeletedId: string = req.query.id as string;

    try {
        const orderDeleted = await orderService.deleteOrder(orderDeletedId);
        res.status(201).json({ message: 'Order deleted successfully!', order: { name: orderDeleted.name, table: orderDeleted.table }, });
    } catch (error) {
        res.status(400).json({ message: 'Order deletion failed!', error: (error as Error).message });
    }
};