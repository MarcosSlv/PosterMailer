"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const posters_routes_1 = __importDefault(require("./posters.routes"));
const emails_routes_1 = __importDefault(require("./emails.routes"));
const router = (0, express_1.Router)();
exports.router = router;
router.use("/posters", posters_routes_1.default);
router.use("/emails", emails_routes_1.default);
