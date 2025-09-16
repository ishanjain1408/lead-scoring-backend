import express from "express";
import { saveOffer } from "../controllers/offerController.js";

const router = express.Router();
router.post("/", saveOffer);

export default router;
