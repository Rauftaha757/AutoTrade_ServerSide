const express = require("express");
require("dotenv").config();
const authRouter = require("./auth_routes");
const CarAd_router = require("./car_ad_posting_route");
const dburl = process.env.dburl;
const PORT = process.env.PORT;
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`https://autotradeserverside-production.up.railway.app ${PORT}`);
});
