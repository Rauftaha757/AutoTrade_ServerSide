const express = require("express");
const authRouter = require("./auth_routes");
// const dburl =
//   "mongodb+srv://rauftaha757:ZKj9amdHsA7hpzAT@cluster0.yuh5h6g.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0";
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
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
