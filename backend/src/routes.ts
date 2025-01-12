import { Router, Request, Response } from "express";
import express from 'express';

const router = Router();

router.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ ok: true });
})

export { router };