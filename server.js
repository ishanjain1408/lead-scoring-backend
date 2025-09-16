import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import offerRoutes from "./routes/offerRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/offer", offerRoutes);
app.use("/leads", leadRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

export default app;
