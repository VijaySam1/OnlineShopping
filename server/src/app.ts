import express, { Application } from "express";
const app: Application = express();
import mongoose from "mongoose";
const cors = require("cors");
import userRoute from "./routers/userRoute";
app.use(express.urlencoded({ extended: true }));
import bodyParser from "body-parser";
import productRoutes from "./routers/productRoutes";
import { ENV_VARS } from "./configurations/configenv";

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

// mongo DB connection
mongoose.set("strictQuery", false);
const URL: string = ENV_VARS.db.url;
mongoose
  .connect(`${URL}`)
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.use("/api", userRoute);
app.use("/api", productRoutes);

app.listen(5000, () => console.log("app listening on port 5000"));
