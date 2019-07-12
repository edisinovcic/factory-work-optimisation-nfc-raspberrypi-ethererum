"use strict";

import { NextFunction, Request, Response, Router } from "express";
import { check, sanitize, validationResult } from "express-validator";
import { performance } from "perf_hooks";
import { EmployeeController } from "../controllers/employeeController";

const router = Router();

const employeeControler = new EmployeeController();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const result = await employeeControler.getAll();
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
    const result = await employeeControler.getAllContents();
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
        result = await employeeControler.getByID(req.query.id);
    } else if (req.query.address !== undefined) {
        result = await employeeControler.getByAddress(req.query.address);
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
    const address = await employeeControler.create(req.body);
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
    const address = await employeeControler.update(req.params.id, req.body);
    const time = performance.now() - start;
    res.status(200).json(
        {
            address: address,
            time: time
        }
    );
});


export default router;