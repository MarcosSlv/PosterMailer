import { Router } from "express";
import EmailsController from "../controllers/EmailsController";
import upload from "../middlewares/multerConfigMiddleware";

const emailsController = new EmailsController();

const emailsRouter = Router();

emailsRouter.post("/", upload.single("file"), emailsController.execute);

export default emailsRouter;