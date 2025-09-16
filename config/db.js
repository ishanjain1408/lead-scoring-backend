// db.js
/**
 * MongoDB connection + Mongoose models for Offer and Lead
 *
 * Exports:
 *  - connectDB(): Promise to connect
 *  - Offer: mongoose model for offers
 *  - Lead: mongoose model for leads
 */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**
 * Offer Schema
 */
const OfferSchema = new Schema({
  name: { type: String, required: true },
  value_props: { type: [String], default: [] },
  ideal_use_cases: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

/**
 * Lead Schema
 * Fields come from CSV:
 * name, role, company, industry, location, linkedin_bio
 *
 * Also store scoring results:
 *  - intent: High|Medium|Low
 *  - score: Number (rule + ai)
 *  - reasoning: string explanation
 *  - scoredAt: Date when scored
 */
const LeadSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String },
  company: { type: String },
  industry: { type: String },
  location: { type: String },
  linkedin_bio: { type: String },

  // scoring
  intent: { type: String, enum: ["High", "Medium", "Low"], default: null },
  score: { type: Number, default: null },
  reasoning: { type: String, default: null },
  scoredAt: { type: Date, default: null },

  createdAt: { type: Date, default: Date.now },
});

export const Offer = model("Offer", OfferSchema);
export const Lead = model("Lead", LeadSchema);

/**
 * Connect to MongoDB
 * @returns {Promise<mongoose.Connection>}
 */
export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in environment variables");
  }
  // Avoid multiple connections in serverless/dev hot reloads
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(process.env.MONGO_URI, {
    // options recommended for modern mongoose (may vary by version)
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("✅ MongoDB connected");
  return mongoose.connection;
};
