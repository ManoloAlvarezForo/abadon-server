import mongoose from "mongoose";
import moment from "moment";

const { Schema } = mongoose;
const SALE_NAME = "sale";

export default mongoose.model(
  SALE_NAME,
  new Schema({
    client: String,
    nit: String,
    nitName: String,
    date: String,
    time: String,
    paymentType: String,
    pay: Number,
    change: Number,
    products: [Object],
    createdDate: { type: String, default: moment().format() },
  })
);
