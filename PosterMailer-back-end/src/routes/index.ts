import { Router } from "express";
import postersRouter from "./posters.routes";
import emailsRouter from "./emails.routes";

const router = Router();

router.use("/posters", postersRouter);
router.use("/emails", emailsRouter);

export { router };
