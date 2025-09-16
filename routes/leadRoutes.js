import express from "express";
import multer from "multer";
import { uploadLeads, scoreLeads, getResults, getResultsCSV } from "../controllers/leadController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadLeads);
router.post("/score", scoreLeads);
router.get("/results", getResults);
router.get("/results/csv", getResultsCSV);

export default router;
