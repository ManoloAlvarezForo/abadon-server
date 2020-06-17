import mongoose from "mongoose";
import Event from "./event";

const { Schema } = mongoose;

Event.discriminator(
  "preaching",
  new Schema({
    lead: String,
    territories: [String],
    moment: String,
    type: { type: String, default: "preaching" },
  })
);

export default mongoose.model("preaching");
