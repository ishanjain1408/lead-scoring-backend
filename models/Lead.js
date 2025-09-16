import mongoose from "mongoose";

/**
 * Lead Schema
 * Stores lead information parsed from CSV upload
 */
const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    linkedin_bio: {
      type: String,
      required: [true, "LinkedIn bio is required"],
      trim: true,
    },
    intent: {
      type: String,
      enum: ["High", "Medium", "Low", null],
      default: null,
    },
    score: {
      type: Number,
      default: null,
    },
    reasoning: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
