import mongoose from "mongoose";
import moment from "moment";
import { ObjectId } from "mongodb";

const { Schema } = mongoose;
const SCHEMA_NAME = "client";

export default mongoose.model(
  SCHEMA_NAME,
  new Schema({
    brand: String,
    responsible: String,
    thumb: { type: Schema.Types.ObjectId, ref: "thumbnail" },
    nit: { type: String, default: "" },
    address: { type: String, default: "" },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    phone: String,
    cellphone: String,
    businesPhone: String,
    accountBank: String,
    bank: String,
    products: [{ type: ObjectId, ref: "Product" }],
    createdDate: { type: String, default: moment().format() },
  })
);
