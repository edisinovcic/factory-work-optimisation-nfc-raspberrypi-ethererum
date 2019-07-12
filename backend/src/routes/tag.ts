"use strict";

import { NextFunction, Request, Response, Router } from "express";
import { check, sanitize, validationResult } from "express-validator";
import { performance } from "perf_hooks";
import { TagController } from "../controllers/tagController";

const router = Router();

const tagControler = new TagController();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const result = await tagControler.getAll();
    const time = performance.now() - start;
    res.status(200).json(
        {
            result: result,
            time: time
        }
    );
});

router.get("/content", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const result = await tagControler.getAllContents();
    const time = performance.now() - start;
    res.status(200).json(
        {
            result: result,
            time: time
        }
    );
});

router.get("/params", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    let result;
    if (req.query.id !== undefined) {
        result = await tagControler.getByID(req.query.id);
    } else if (req.query.address !== undefined) {
        result = await tagControler.getByAddress(req.query.address);
    }
    const time = performance.now() - start;
    res.status(200).json(
        {
            result: result,
            time: time
        }
    );
});


router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const address = await tagControler.create(req.body);
    const time = performance.now() - start;
    res.status(200).json(
        {
            address: address,
            time: time
        }
    );
});


router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const address = await tagControler.update(req.params.id, req.body);
    const time = performance.now() - start;
    res.status(200).json(
        {
            address: address,
            time: time
        }
    );
});


export default router;