"use strict";

import { NextFunction, Request, Response, Router } from "express";
import { check, sanitize, validationResult } from "express-validator";
import { performance } from 'perf_hooks';
import { TagController } from '../controllers/tagController';

const router = Router();

let tagController = new TagController();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    let start = performance.now();
    let result = tagController.getAll();
    let time = performance.now() - start;
    res.status(200).json(
        {
            result: result,
            time: time
        }
    );
});

router.get('/:id', async (req: Request, res: Response) => {
    //TODO:
});


router.post('/', (req: Request, res: Response, next: NextFunction) => {
    //TODO:
});


router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    //TODO:
});


export default router;