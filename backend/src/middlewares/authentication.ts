import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const authToken = req.headers.authorization;

    if (!authToken) {
        res.status(401).end();
    }

    const [, token] = authToken.split(' ');

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
        req.user_id = sub;
        next();
    } catch (error) {
        res.status(401).end();
    }
}
