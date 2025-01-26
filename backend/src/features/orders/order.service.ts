import prismaClient from "../../prisma";
import { OrderRequestInterface } from "./order.interface";

export const getOrderById = async (orderId: string) => {
  const orderFound = await prismaClient.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  return orderFound;
};

export const getOrdersFromTable = async (tableNbr: number) => {
  const ordersFound = await prismaClient.order.findMany({
    where: {
      table: tableNbr,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  return ordersFound;
};

export const getOrders = async (status: boolean) => {
  const ordersFound = await prismaClient.order.findMany({
    where: {
      status: status,
    },
  });
  return ordersFound;
};

export const createOrder = async (order: OrderRequestInterface) => {
  if (!order.table) {
    throw new Error("Missing data");
  }
  const orderCreated = await prismaClient.order.create({
    data: {
      table: order.table,
      name: order.name,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return orderCreated;
};
export const updateOrder = async (order: OrderRequestInterface) => {
  if (!order.id) {
    throw new Error("Missing data");
  }
  await orderDoesNotExist(order.id);
  const orderUpdated = await prismaClient.order.update({
    data: {
      table: order.table,
      name: order.name,
      draft: order.draft,
    },
    where: {
      id: order.id,
    },
  });

  return orderUpdated;
};

export const emitOrder = async (orderId: string) => {
  await orderDoesNotExist(orderId);
  const orderDeleted = await prismaClient.order.update({
    where: {
      id: orderId,
    },
    data: {
      draft: false,
    },
  });

  return orderDeleted;
};

export const deleteOrder = async (orderId: string) => {
  await orderDoesNotExist(orderId);
  const orderDeleted = await prismaClient.order.delete({
    where: {
      id: orderId,
    },
  });

  return orderDeleted;
};

const orderDoesNotExist = async (orderId: string) => {
  const foundOrder = await prismaClient.order.findFirst({
    where: {
      id: orderId,
    },
  });
  if (!foundOrder) {
    throw new Error("Order does not exist");
  }
};

const orderAlreadyExists = async (order: OrderRequestInterface) => {
  const orderAlreadyExists = await prismaClient.order.findFirst({
    where: {
      table: order.table,
      name: order.name,
    },
  });
  if (orderAlreadyExists) {
    throw new Error("Order already exists");
  }
};
