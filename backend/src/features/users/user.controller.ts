import { Request, Response } from 'express';
import * as userService from './user.service';
import { AuthRequestInterface, UserRequestInterface } from './user.interface';


export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = req.user_id; //from middleware
        const user = await userService.getUser(user_id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Could not get User!', error: (error as Error).message });
    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Could not get Users!', error: (error as Error).message });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const user: UserRequestInterface = req.body;

    try {
        const userCreated = await userService.createUser(user);
        res.status(201).json({ message: 'User created successfully!', userCreated });
    } catch (error) {
        res.status(400).json({ message: 'User creation failed!', error: (error as Error).message });
    }
};

export const authUser = async (req: Request, res: Response): Promise<void> => {
    const userAuth: AuthRequestInterface = req.body;

    try {
        const authenticatedUser = await userService.authUser(userAuth);
        res.status(201).json(authenticatedUser);
    } catch (error) {
        res.status(400).json({ message: 'User login failed!', error: (error as Error).message });
    }
};