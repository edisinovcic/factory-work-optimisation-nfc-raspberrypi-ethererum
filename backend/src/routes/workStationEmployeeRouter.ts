"use strict";

import { NextFunction, Request, Response, Router } from "express";
import { check, sanitize, validationResult } from "express-validator";
import { performance } from "perf_hooks";
import { WorkStationEmployeeController } from "../controllers/workStationEmployeeController";

const router = Router();

const workStationEmployeeControler = new WorkStationEmployeeController();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const result = workStationEmployeeControler.getAll();
    const time = performance.now() - start;
    res.status(200).json(
        {
            result: result,
            time: time
        }
    );
});

router.get("/:id", async (req: Request, res: Response) => {
    // TODO:
});


router.post("/", (req: Request, res: Response, next: NextFunction) => {
    // TODO:
});


router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    // TODO:
});


export default router;