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
const tagController = new tagController_1.TagController();
router.get("/", (req, res, next) => {
    const start = perf_hooks_1.performance.now();
    const result = tagController.getAll();
    const time = perf_hooks_1.performance.now() - start;
    res.status(200).json({
        result: result,
        time: time
    });
});
router.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // TODO:
}));
router.post("/", (req, res, next) => {
    // TODO:
});
router.put("/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // TODO:
}));
exports.default = router;
//# sourceMappingURL=tag.js.map