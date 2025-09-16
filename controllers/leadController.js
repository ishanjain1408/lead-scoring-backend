import { parseCSV } from "../utils/csvParser.js";
import { runScoringPipeline } from "../services/scoringService.js";
import { getOfferContext } from "./offerController.js";
import { stringify } from "csv-stringify";

let leads = [];
let scoredResults = [];

/**
 * POST /leads/upload
 */
export const uploadLeads = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    leads = await parseCSV(req.file.path);
    res.status(201).json({ message: "Leads uploaded", count: leads.length });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /score
 */
export const scoreLeads = async (req, res, next) => {
  try {
    if (!leads.length) return res.status(400).json({ error: "No leads uploaded" });
    if (!getOfferContext()) return res.status(400).json({ error: "Offer not set" });

    scoredResults = await runScoringPipeline(leads, getOfferContext());
    res.json(scoredResults);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /results
 */
export const getResults = (req, res) => {
  res.json(scoredResults);
};

/**
 * GET /results/csv
 */
export const getResultsCSV = (req, res) => {
  res.setHeader("Content-Disposition", "attachment; filename=results.csv");
  res.setHeader("Content-Type", "text/csv");

  stringify(scoredResults, { header: true }).pipe(res);
};
