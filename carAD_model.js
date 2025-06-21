const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const CarAd = new Schema({
  imageurl: {
    type: [String],
    required: true,
  },
  transmition: {
    type: String,
    required: true,
    enum: ["Automatic", "Manual"],
  },
  milage: {
    type: Number,
    required: true,
  },
  model: {
    type: Number,
    required: true,
  },
  registration: {
    type: String,
    enum: ["Registered", "Unregistered"],
  },
  carname: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  enginecapacity: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  assembly: {
    type: String,
    required: true,
    enum: ["Local", "Imported"],
  },
  contact: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: String,
    required: true,
  },
});

const carAd_model = models.carad || model("carad", CarAd);

module.exports = carAd_model;
