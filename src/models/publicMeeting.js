import mongoose from "mongoose";
import Event from "./event";

const { Schema } = mongoose;
const SCHEMA_NAME = "publicMeeting";

Event.discriminator(
  SCHEMA_NAME,
  new Schema({
    meetingType: String,
    president: String,
    speaker: String,
    watchtowerGuider: String,
    watchtowerReader: String,
    type: { type: String, default: "meeting" },
  })
);

export default mongoose.model(SCHEMA_NAME);
