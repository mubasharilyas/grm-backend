


import express from "express";
import * as helloController from "../controllers/hello.controller";

export const router = express.Router();

router.get("/test", helloController.hello);


