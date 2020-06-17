import mongoose from "mongoose";
import moment from "moment";
import { ObjectId } from "mongodb";

const { Schema } = mongoose;
const SCHEMA_NAME = "category";

export default mongoose.model(
  SCHEMA_NAME,
  new Schema({
    name: String,
    createdDate: { type: String, default: moment().format() },
  })
);
