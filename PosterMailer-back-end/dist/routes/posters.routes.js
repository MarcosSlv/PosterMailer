"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostersController_1 = __importDefault(require("../controllers/PostersController"));
const multerConfigMiddleware_1 = __importDefault(require("../middlewares/multerConfigMiddleware"));
const postersController = new PostersController_1.default();
const postersRouter = (0, express_1.Router)();
postersRouter.post("/", multerConfigMiddleware_1.default.single("file"), postersController.execute);
exports.default = postersRouter;
