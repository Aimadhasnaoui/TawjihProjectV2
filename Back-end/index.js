const mongoose = require("mongoose");
const express = require("express");
const user = require("./User/Router");
const userLogin = require("./User/Controller");
require('dotenv').config(); 
mongoose
  .connect(
    "mongodb+srv://aimadhas1234_db_user:clubX0h1P5msY7qy@tawjihi.ognktzc.mongodb.net/?appName=Tawjihi"
    // process.env.databasekey
  )
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

const app = express();
app.use(express.json()); 
const port = 3000;
app.use('/api/user',user)
app.post('/api/login',userLogin.login)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
