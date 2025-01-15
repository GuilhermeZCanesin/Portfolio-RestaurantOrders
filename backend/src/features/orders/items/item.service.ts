import { Item } from "@prisma/client";
import { ItemRequestInterface } from "./item.interface";
import prismaClient from "../../../prisma";


export const getOrderItems = async (orderId: string) => {
    /* const itemsFound = await prismaClient.item.findMany({
        select: {

        }
    });
    return itemsFound; */
};

export const addItemToOrder = async (item: ItemRequestInterface) => {
    if (!item.order_id || !item.product_id || !item.ammount) {
        throw new Error('Missing data');
    }
    const itemExists = await itemDoesExist(item);
    var itemAdded: Item;
    if (itemExists) {
        itemAdded = await prismaClient.item.update({
            where: {
                id: itemExists.id
            },
            data: {
                quantity: itemExists.quantity + item.ammount
            }
        });
    } else {
        itemAdded = await prismaClient.item.create({
            data: {
                product_id: item.product_id,
                order_id: item.order_id,
                quantity: item.ammount
            },
        })
    }
    return itemAdded;
};
export const removeItemFromOrder = async (itemId: string) => {
    const itemExists = await itemDoesNotExist(itemId);
    var itemRemoved: Item;
    if (itemExists.quantity > 1) {
        itemRemoved = await prismaClient.item.update({
            where: {
                id: itemId
            },
            data: {
                quantity: itemExists.quantity - 1
            }
        })
    } else {
        itemRemoved = await prismaClient.item.delete({
            where: {
                id: itemId
            }
        })
    }
    return itemRemoved;
};

const itemDoesExist = async (item: ItemRequestInterface): Promise<Item> => {
    const itemExists = await prismaClient.item.findFirst({
        where: {
            product_id: item.product_id,
            order_id: item.order_id,
        }
    })
    if (!itemExists) {
        throw new Error('Item/Order not found');
    } else {
        return itemExists;
    }
}

const itemDoesNotExist = async (itemId: string): Promise<Item> => {
    const itemExists = await prismaClient.item.findFirst({
        where: {
            id: itemId,
        }
    })
    if (!itemExists) {
        throw new Error('Item does not exist in order');
    } else {
        return itemExists;
    }
}