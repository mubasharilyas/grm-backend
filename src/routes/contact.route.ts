import express from "express";
import { Auth } from '../middlewares/auth.middleware'
import * as contactController from "../controllers/contact.controller";

export const router = express.Router();

router.patch("/create-contact/:id?", Auth, contactController.createContact);

router.get("/get-contacts/:page/:sort/:cName?", Auth, contactController.getContacts)

router.get("/get-contact-stats", Auth, contactController.contactStates)

