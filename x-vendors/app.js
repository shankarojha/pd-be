const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors')
const vendorRoutes = require("./routes/vendorRoutes");
const errorHandler= require('./middlewares/errorHandler');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:'http://localhost:4200',
  methods:['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'HEAD'],
  credentials:true
}))

app.use("/api/vendors", vendorRoutes);
app.use(errorHandler.wrongEndpoint);
app.use(errorHandler.globalErorHandler);

mongoose
  .connect(`mongodb://localhost:27017/${process.env.db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to", process.env.db);
    app.listen(process.env.user_port, () => {
      console.log(`running on port ${process.env.user_port}`);
    });
  })
  .catch((error) => {
    console.error("Could not connect to DB ", error);
  });
