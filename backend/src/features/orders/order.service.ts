import prismaClient from "../../prisma";
import { OrderRequestInterface } from "./order.interface";


export const getOrders = async () => {
    const ordersFound = await prismaClient.order.findMany({
        select: {
            id: true,
            name: true,
        }
    });
    return ordersFound;
};

export const createOrder = async (order: OrderRequestInterface) => {
    if (!order.table) {
        throw new Error('Missing data');
    }
    await orderAlreadyExists(order);
    const orderCreated = await prismaClient.order.create({
        data: {
            table: order.table,
            name: order.name,
        },
        select: {
            id: true,
            name: true,
        }
    })

    return orderCreated;
};
export const updateOrder = async (order: OrderRequestInterface) => {
    if (!order.table) {
        throw new Error('Missing data');
    }
    await orderDoesNotExist(order.id);
    const orderCreated = await prismaClient.order.update({
        data: {
            table: order.table,
            name: order.name,
        },
        where: {
            id: order.id
        }
    })

    return orderCreated;
};

export const emitOrder = async (orderId: string) => {
    await orderDoesNotExist(orderId);
    const orderDeleted = await prismaClient.order.update({
        where: {
            id: orderId,
        }, data: {
            draft: false,
        }
    })

    return orderDeleted;
};

export const deleteOrder = async (orderId: string) => {
    await orderDoesNotExist(orderId);
    const orderDeleted = await prismaClient.order.delete({
        where: {
            id: orderId
        }
    })

    return orderDeleted;
};

const orderDoesNotExist = async (orderId: string) => {
    const foundOrder = await prismaClient.order.findFirst({
        where: {
            id: orderId,
        },
    })
    if (!foundOrder) {
        throw new Error('Order does not exist');
    }
}

const orderAlreadyExists = async (order: OrderRequestInterface) => {
    const orderAlreadyExists = await prismaClient.order.findFirst({
        where: {
            table: order.table,
            name: order.name,
        }
    })
    if (orderAlreadyExists) {
        throw new Error('Order already exists');
    }
}
