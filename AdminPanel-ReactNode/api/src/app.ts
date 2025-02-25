import express from "express";
import {
  handleErrorResponse,
  handleSystemError,
} from "./middlewares/error-handler";
import * as dotenv from "dotenv";
import cors from "cors";
import { env } from "node:process";
import path from "node:path";
dotenv.config();
import router from "./routes";
import { limiter } from "./middlewares/rate-limitter";

const app = express();
const port = env.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.client_url }));
app.use(
  "/assets/images/users",
  express.static(path.join(__dirname, "/assets/images/users"))
);
app.use(limiter);

app.use("/v1", router);

app.use(handleSystemError, handleErrorResponse);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
