import express from "express";
import { router } from "./routes/index";

import cors from "cors";
import path from "path";

export const app = express();

app.use(cors({
  origin: "https://postermailer-df6cszvh6-marcosslvs-projects.vercel.app"
}));

app.use("/pdfs", express.static(path.resolve(__dirname, "../pdfs")));
app.use('/static', express.static(path.join(__dirname, 'utils')));


app.use(express.json({ limit: "20mb" }));

app.use("/api", router);
