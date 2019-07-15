"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perf_hooks_1 = require("perf_hooks");
const tagController_1 = require("../controllers/tagController");
const router = express_1.Router();
const tagControler = new tagController_1.TagController();
router.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const start = perf_hooks_1.performance.now();
    const result = yield tagControler.getAll()
        .then((result) => {
        const time = perf_hooks_1.performance.now() - start;
        res.status(200).json({
            result: result,
            time: time
        });
    })
        .catch((error) => {
        next(error);
    });
}));
router.get("/content", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const start = perf_hooks_1.performance.now();
    const result = yield tagControler.getAllContents()
        .then((result) => {
        const time = perf_hooks_1.performance.now() - start;
        res.status(200).json({
            result: result,
            time: time
        });
    })
        .catch((error) => {
        next(error);
    });
}));
router.get("/params", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const start = perf_hooks_1.performance.now();
    let result;
    if (req.query.id !== undefined) {
        result = yield tagControler.getByID(req.query.id)
            .then((result) => {
            const time = perf_hooks_1.performance.now() - start;
            res.status(200).json({
                result: result,
                time: time
            });
        })
            .catch((error) => {
            next(error);
        });
    }
    else if (req.query.address !== undefined) {
        result = yield tagControler.getByAddress(req.query.address)
            .then((result) => {
            const time = perf_hooks_1.performance.now() - start;
            res.status(200).json({
                result: result,
                time: time
            });
        })
            .catch((error) => {
            next(error);
        });
    }
}));
router.post("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const start = perf_hooks_1.performance.now();
    const address = yield tagControler.create(req.body)
        .then((address) => {
        const time = perf_hooks_1.performance.now() - start;
        res.status(200).json({
            address: address,
            time: time
        });
    })
        .catch((error) => {
        next(error);
    });
}));
router.put("/:address", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const start = perf_hooks_1.performance.now();
    const address = yield tagControler.update(req.params.address, req.body)
        .then((address) => {
        const time = perf_hooks_1.performance.now() - start;
        res.status(200).json({
            address: address,
            time: time
        });
    })
        .catch((error) => {
        next(error);
    });
}));
exports.default = router;
//# sourceMappingURL=tag.js.map