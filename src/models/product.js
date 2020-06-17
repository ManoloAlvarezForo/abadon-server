import mongoose from "mongoose";
import moment from "moment";

const { Schema } = mongoose;
const SCHEMA_NAME = "product";

/**
 * Product mongoose schema.
 */
export default mongoose.model(
  SCHEMA_NAME,
  new Schema({
    productId: { type: String, default: "" },
    client: { type: Schema.Types.ObjectId, ref: "client" },
    thumbs: [{ type: Schema.Types.ObjectId, ref: "thumbnail" }],
    productName: String,
    promo: { type: Boolean, default: false },
    newPrice: { type: Number, default: 0.0 },
    price: { type: Number, default: 0.0 },
    description: { type: String, default: "" },
    promoDescription: { type: String, default: "" },
    isAvailable: { type: Boolean, default: false },
    availableQuantity: { type: Number, default: 0 },
    createdDate: { type: String, default: moment().format() },
    comments: [
      {
        user: { type: String, default: "" },
        userId: { type: String, default: "" },
        comment: String,
        createdDate: { type: String, default: moment().format() },
      },
    ],
    //TODO: Maybe not generic property.
    buildTime: { type: String, default: "" },
    kind: [
      {
        type: String,
        enum: ["SERVICE", "PRODUCT", "FOOD"],
      },
    ],
    //TODO: Should be dynamic
    categories: [
      {
        type: String,
        enum: ["CARNE", "POLLO", "CHANCHO", "PASTA"],
      },
    ],
  })
);

//Note: unblock the code to add a custom autimatic id for the productId.
// let CounterSchema = new Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 0 }
// });

// let counter = mongoose.model('counter', CounterSchema);

// productSchema.pre('save', function(next) {
//   var doc = this;
//   counter
//     .findByIdAndUpdate(
//       { _id: 'productId' },
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true }
//     )
//     .then(function(count) {
//       doc.productId = count.seq;
//       next();
//     })
//     .catch(function(error) {
//       console.error('counter error-> : ' + error);
//       throw error;
//     });
// });
