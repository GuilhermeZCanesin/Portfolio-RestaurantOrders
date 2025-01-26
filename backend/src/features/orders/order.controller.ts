import { Request, Response } from "express";
import * as orderService from "./order.service";
import { OrderRequestInterface } from "./order.interface";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const orderId: string = req.query.id as string;
  const tableNbr: string = req.query.table as string;
  const status: string = req.query.status as string;

  try {
    if (orderId) {
      const order = await orderService.getOrderById(orderId);
      res.json(order);
      return;
    }
    if (tableNbr) {
      const order = await orderService.getOrdersFromTable(Number(tableNbr));
      res.json(order);
      return;
    }
    const order = await orderService.getOrders(status ? true : false);
    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Could not get Orders!",
      error: (error as Error).message,
    });
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const order: OrderRequestInterface = req.body;

  try {
    const orderCreated = await orderService.createOrder(order);
    res
      .status(201)
      .json({ message: "Order created successfully!", orderCreated });
  } catch (error) {
    res.status(400).json({
      message: "Order creation failed!",
      error: (error as Error).message,
    });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const order: OrderRequestInterface = req.body;
  try {
    const orderUpdated = await orderService.updateOrder(order);
    res
      .status(201)
      .json({ message: "Order updated successfully!", orderUpdated });
  } catch (error) {
    res.status(400).json({
      message: "Order update failed!",
      error: (error as Error).message,
    });
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const orderDeletedId: string = req.query.id as string;

  try {
    const orderDeleted = await orderService.deleteOrder(orderDeletedId);
    res.status(201).json({
      message: "Order deleted successfully!",
      order: { name: orderDeleted.name, table: orderDeleted.table },
    });
  } catch (error) {
    res.status(400).json({
      message: "Order deletion failed!",
      error: (error as Error).message,
    });
  }
};
