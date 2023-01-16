import express from "express";
import * as alertController from "../controllers/alert.controller";
import { Auth } from '../middlewares/auth.middleware'

export const router = express.Router();
router.get("/get-alerts/:page/:sort", Auth, alertController.getAlerts)
