"use strict";

import { NextFunction, Request, Response, Router } from "express";
import { check, sanitize, validationResult } from "express-validator";
import { performance } from "perf_hooks";
import { WorkingOrderController } from "../controllers/workingOrderController";
import { WorkingOrder } from "../model/workingOrder";

const router = Router();

const workingOrderControler = new WorkingOrderController();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const result = await workingOrderControler.getAll()
    .then((result) => {
        const time = performance.now() - start;
        res.status(200).json(
            {
                result: result,
                time: time
            }
        );
    })
    .catch((error) => {
        next(error);
    });
});

router.get("/content", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const result = await workingOrderControler.getAllContents()
    .then((result) => {
        const time = performance.now() - start;
        res.status(200).json(
            {
                result: result,
                time: time
            }
        );
    })
    .catch((error) => {
        next(error);
    });
});

router.get("/params", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    let result;
    if (req.query.id !== undefined) {
        result = await workingOrderControler.getByID(req.query.id)
        .then((result) => {
            const time = performance.now() - start;
            res.status(200).json(
                {
                    result: result,
                    time: time
                }
            );
        })
        .catch((error) => {
            next(error);
        });
    } else if (req.query.address !== undefined) {
        result = await workingOrderControler.getByAddress(req.query.address)
        .then((result) => {
            const time = performance.now() - start;
            res.status(200).json(
                {
                    result: result,
                    time: time
                }
            );
        })
        .catch((error) => {
            next(error);
        });
    }
});


router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const workingOrder = new WorkingOrder( req.body.id, req.body.inputTags, req.body.outputTag, req.body.status, req.body.statusDescription );
    const address = await workingOrderControler.create(workingOrder)
    .then((address) => {
        const time = performance.now() - start;
        res.status(200).json(
            {
                address: address,
                time: time
            }
        );
    })
    .catch((error) => {
        next(error);
    });
});


router.put("/:address", async (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    const address = await workingOrderControler.update(req.params.address, req.body)
    .then((address) => {
        const time = performance.now() - start;
        res.status(200).json(
            {
                address: address,
                time: time
            }
        );
    })
    .catch((error) => {
        next(error);
    });
});

export default router;