const express = require("express");
require("dotenv").config();
const authRouter = require("./auth_routes");
const CarAd_router = require("./car_ad_posting_route");
const dburl = process.env.dburl;

// CRITICAL: Force Railway to work
const PORT = process.env.PORT || 8080;

console.log("🚨 DEPLOYMENT DEBUG - STARTING 🚨");
console.log("==================================");
console.log("Environment variables:");
console.log("- PORT:", process.env.PORT);
console.log("- NODE_ENV:", process.env.NODE_ENV);
console.log("- Using PORT:", PORT);
console.log("==================================");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
  console.log("✅ Health check hit!");
  res.json({
    message: "AutoTrade Server is running!",
    port: PORT,
    env: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

mongoose
  .connect(dburl)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// API Routes - organized under /api prefix
app.use("/api", authRouter);
app.use("/api", CarAd_router);

// Error handling
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler - FIXED: removed wildcard route
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 ==================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🚀 Health check: http://localhost:${PORT}/`);
  console.log(`🚀 Test route: http://localhost:${PORT}/test`);
  console.log("🚀 ==================================");
});

// Handle process termination
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});
