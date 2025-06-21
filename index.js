const express = require("express");
require("dotenv").config();
const authRouter = require("./auth_routes");
const CarAd_router = require("./car_ad_posting_route");
const dburl = process.env.dburl;

// Force Railway to use port 8080 if PORT is not set
const PORT = process.env.PORT || 8080;

console.log("=== DEPLOYMENT DEBUG INFO ===");
console.log("Environment variables:");
console.log("PORT:", process.env.PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Using PORT:", PORT);
console.log("=============================");

const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add a health check route
app.get("/", (req, res) => {
  res.json({
    message: "AutoTrade Server is running!",
    port: PORT,
    env: process.env.NODE_ENV || "development",
  });
});

mongoose
  .connect(dburl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(authRouter);
app.use(CarAd_router);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check available at: http://localhost:${PORT}/`);
  console.log(`🌐 Ready for Railway deployment!`);
});
