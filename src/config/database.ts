import mongoose from "mongoose";

async function database() {
  await mongoose.connect("mongodb://localhost:27017/Second-Brain").then(() => {
    console.log("Connected!");
  });
}

export default database;
