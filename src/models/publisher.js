import mongoose from "mongoose";
import moment from "moment";

//TODO Please Refactor this schema like another.
const Schema = mongoose.Schema;

/**
 * Product mongoose schema.
 */
export default mongoose.model(
  "publisher",
  new Schema({
    name: String,
    avatar: String,
    lastName: String,
    fullNane: String,
    phone: String,
    isLeader: { type: String, default: false },
    isPartOfLifeAndMinistry: { type: String, default: false },
    isReaderForTheMeetings: { type: String, default: false },
    genre: String,
    age: String,
    createdDate: { type: String, default: moment().format() },
  })
);
