"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmailsController_1 = __importDefault(require("../controllers/EmailsController"));
const multerConfigMiddleware_1 = __importDefault(require("../middlewares/multerConfigMiddleware"));
const emailsController = new EmailsController_1.default();
const emailsRouter = (0, express_1.Router)();
emailsRouter.post("/", multerConfigMiddleware_1.default.single("file"), emailsController.execute);
exports.default = emailsRouter;
