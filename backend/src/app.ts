import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth/auth.routes";
import { errorHandler, notFound } from "./middleware/error.middleware";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true
  })
);
app.use(express.json());
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI is not set");
} else {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error", err));
}
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/auth", authRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
