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
    await categoryExists(category.name, false);
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
    await categoryExists(categoryId, true);
    const categoryDeleted = await prismaClient.category.delete({
        where: {
            id: categoryId
        }
    })

    return categoryDeleted;
};


const categoryExists = async (search: string, doesNot: boolean) => {
    const categoryAlreadyExists = await prismaClient.category.findFirst({
        where: {
            OR: [{ name: search }, { id: search }]
        }
    })

    if (categoryAlreadyExists && !doesNot) {
        throw new Error('Category already exists');
    } else if (!categoryAlreadyExists && doesNot) {
        throw new Error('Category does not exists')
    }
}