import express, { Application } from "express";
import { config } from "./config/config";
import usersController from "./controllers/usersController";

const port = config.port;

const app: Application = express();
app.listen(port);
app.use(express.json());
app.use("/api", usersController);
