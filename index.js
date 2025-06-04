const express = require("express");
const authRouter = require("./auth_routes");
const CarAd_router = require("./car_ad_posting_route");
const dburl = "mongodb://127.0.0.1:27017/auth";
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dburl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(authRouter);
app.use(CarAd_router);

app.listen(3000,"0.0.0.0", () => {
  console.log("Server running at http://localhost:3000");
});
