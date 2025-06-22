const express = require("express");
const CarAd_router = express.Router();
const carAd_model = require("./carAD_model.js");
const { error } = require("console");
const { find } = require("./carAD_model.js");
const { Query } = require("mongoose");

CarAd_router.post("/publishAd", async (req, res) => {
  const {
    milage,
    imageurl,
    transmition,
    model,
    registration,
    carname,
    company,
    enginecapacity,
    city,
    color,
    assembly,
    contact,
    createdAt,
    price,
  } = req.body;
  try {
    let carAd = new carAd_model({
      milage,
      imageurl,
      transmition,
      model,
      registration,
      carname,
      company,
      enginecapacity,
      city,
      color,
      assembly,
      contact,
      price,
      createdAt: createdAt || Date.now(),
    });
    await carAd.save();
    res.status(200).json({ message: "Car ad published successfully", carAd });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to publish ad", error: err.message });
  }
});

CarAd_router.get("/getallcarad", async (req, res) => {
  try {
    const cars = await carAd_model.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Fetched successfully",
      data: cars,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch car ads",
      error: err.message,
    });
  }
});

CarAd_router.post("/getcarbysearch", async (req, res) => {
  const { name, company, city, enginecapacity } = req.body;

  try {
    const filter_car = await carAd_model.find({
      $or: [
        company ?  {company :{ $regex: company, $options: "i" }} : null,
        name ? { carname : { $regex : name , $options :"i"}} : null, 
        enginecapacity ? { enginecapacity : { $regex:enginecapacity ,$options:"i"}} : null,
        city ? { city : { $regex : city , $options : "i" }} : null,
      ].filter(Boolean),
    });

    res.status(200).json({
      message: "Search successful",
      data: filter_car,
    });
  } catch (err) {
    res.status(500).json({
      message: "Search failed",
      error: err.message,
    });
  }
});

module.exports = CarAd_router;
