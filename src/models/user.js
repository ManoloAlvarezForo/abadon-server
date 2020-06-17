import mongoose from "mongoose";
import moment from "moment";

const { Schema } = mongoose;
const SCHEMA_NAME = "user";

export default mongoose.model(
  SCHEMA_NAME,
  new Schema({
    name: String,
    email: String,
    password: String,
  })
);
