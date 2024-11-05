import { Router } from "express";
import PosterController from "../controllers/PostersController";
import upload from "../middlewares/multerConfigMiddleware";

const postersController = new PosterController();

const postersRouter = Router();

postersRouter.post("/", upload.single("file"), postersController.execute);

export default postersRouter;