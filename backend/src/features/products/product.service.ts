import prismaClient from "../../prisma";
import { ProductRequestInterface } from "./product.interface";

export const getProductsByCategory = async (categoryId: string) => {
    const productsFound = await prismaClient.product.findMany({
        where: {
            category_id: categoryId,
        },
        select: {
            id: true,
            name: true,
        }
    });
    return productsFound;
};

export const getProducts = async () => {
    const productsFound = await prismaClient.product.findMany({
        select: {
            id: true,
            name: true,
        }
    });
    return productsFound;
};

export const createProduct = async (product: ProductRequestInterface) => {
    if (!product.name || !product.description || !product.price || !product.banner || !product.category_id) {
        throw new Error('Missing data');
    }

    const productAlreadyExists = await prismaClient.product.findFirst({
        where: {
            name: product.name
        }
    })

    if (productAlreadyExists) {
        throw new Error('Product already exists');
    }

    const productCreated = await prismaClient.product.create({
        data: {
            name: product.name,
            description: product.description,
            price: Number(product.price),
            banner: product.banner,
            category_id: product.category_id,
        },
        select: {
            id: true,
            name: true,
        }
    })

    return productCreated;
};

export const deleteProduct = async (productId: string) => {
    const productDeleted = await prismaClient.product.delete({
        where: {
            id: productId
        }
    })

    return productDeleted;
};
