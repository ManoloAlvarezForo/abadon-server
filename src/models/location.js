import mongoose from "mongoose";
import moment from "moment";

const { Schema } = mongoose;

/**
 * Product mongoose schema.
 */
export default mongoose.model(
  "location",
  new Schema({
    name: String,
    address: String,
    description: String,
    createdDate: { type: String, default: moment().format() },
  })
);
