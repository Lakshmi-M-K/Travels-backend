import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3050;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ CORS Setup - allow frontend origins
const allowedOrigins = [
  "https://trishik-travels.web.app",
  "https://travels-frontend-e1epx7zzo-manoj-gowdas-projects-5dd01787.vercel.app",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log("Incoming request origin:", req.headers.origin);
  next();
});

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/booking", bookingRoutes);
// Optional: remove if duplicate
app.use("/api/reviews", reviewRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Trips & Travels API!");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
