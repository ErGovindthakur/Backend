import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnect = async () => {
  try {
     mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

    mongoose.connection.on("connected", () => {
      console.log("Db Connected Successfully...");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Db Error from Try -: ", err.message);
    });
  } catch (err) {
    console.log("Db Error -: ", err.message);
    process.exit(1);
  }
};

export default dbConnect;
