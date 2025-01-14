import prismaClient from "../../prisma";
import { CategoryRequestInterface } from "./category.interface";

export const getCategories = async () => {
    const categoriesFound = await prismaClient.category.findMany({
        select: {
            id: true,
            name: true,
        }
    });
    return categoriesFound;
};

export const createCategory = async (category: CategoryRequestInterface) => {
    if (!category.name) {
        throw new Error('Missing data');
    }

    const categoryAlreadyExists = await prismaClient.product.findFirst({
        where: {
            name: category.name
        }
    })

    if (categoryAlreadyExists) {
        throw new Error('Category already exists');
    }

    const categoryCreated = await prismaClient.category.create({
        data: {
            name: category.name,
        },
        select: {
            id: true,
            name: true,
        }
    })

    return categoryCreated;
};

export const deleteCategory = async (categoryId: string) => {
    const categoryDeleted = await prismaClient.category.delete({
        where: {
            id: categoryId
        }
    })

    return categoryDeleted;
};
