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

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3050;

// ✅ Fix: Read the MongoDB connection string
const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware for CORS and JSON parsing
const allowedOrigins = [
  "https://trips-travel.vercel.app",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/booking", bookingRoutes);

app.use("/api/reviews", reviewRoutes);

app.listen(5000, () => {
  console.log(
    "mongodb+srv://ManojLakshmi:8904016770mk@cluster0.5xh3ozw.mongodb.net/trishik_travels"
  );
});

app.get("/", (req, res) => {
  res.send("Welcome to the Trips & Travels API!");
});

app.listen(PORT, () => {
  console.log(
    `mongodb+srv://ManojLakshmi:8904016770mk@cluster0.5xh3ozw.mongodb.net/trishik_travels`
  );
});
