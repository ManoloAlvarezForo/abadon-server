import mongoose from "mongoose";
import moment from "moment";

const { Schema } = mongoose;
const SCHEMA_NAME = "category";

export default mongoose.model(
  SCHEMA_NAME,
  new Schema({
    name: String,
    label: String,
    parent: { type: Schema.Types.ObjectId, ref: "category", default: null },
    categories: [{ type: Schema.Types.ObjectId, ref: "category", default: [] }],
    thumb: { type: Schema.Types.ObjectId, ref: "thumbnail" },
    createdDate: { type: String, default: moment().format() },
  })
);
