import { AuthRequestInterface, UserRequestInterface } from "./user.interface";
import prismaClient from "../../prisma";
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export const getUser = async (userId: string) => {
    const userFound = await prismaClient.user.findFirst({
        where: {
            id: userId
        }, select: {
            id: true,
            name: true,
            email: true
        }
    })
    return userFound;
};

export const getAllUsers = async () => {
};

export const createUser = async (user: UserRequestInterface) => {
    if (!user.name || !user.email || !user.password) {
        throw new Error('Missing data');
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
            email: user.email
        }
    })

    if (userAlreadyExists) {
        throw new Error('User already exists');
    }

    const passwordHash = await hash(user.password, 8);

    const userCreated = await prismaClient.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: passwordHash
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })

    return userCreated;
};

export const deleteUser = async () => {
};

// Auth

export const authUser = async (userAuth: AuthRequestInterface) => {
    if (!userAuth.email || !userAuth.password) {
        throw new Error('Email and password required!');
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: userAuth.email
        }
    })

    if (!user) {
        throw new Error('Email/Password incorrect!');
    }

    const passwordMatch = await compare(userAuth.password, user.password);

    if (!passwordMatch) {
        throw new Error('Incorrect password');
    }

    // JWT
    const token = sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, {
        subject: user.id,
        expiresIn: '30d'
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
    };
}
