import mongoose from "mongoose";
import moment from "moment";

const { Schema } = mongoose;
const SCHEMA_NAME = "thumbnail";

/**
 * Thumbnail mongoose schema.
 */
export default mongoose.model(
  SCHEMA_NAME,
  new Schema({
    name: String,
    width: Number,
    height: Number,
    formats: {
      thumbnail: {
        ext: String,
        mime: String,
        width: Number,
        height: Number,
        size: Number,
        url: String,
      },
      medium: {
        ext: String,
        mime: String,
        width: Number,
        height: Number,
        size: Number,
        url: String,
      },
      small: {
        ext: String,
        mime: String,
        width: Number,
        height: Number,
        size: Number,
        url: String,
      },
      large: {
        ext: String,
        mime: String,
        width: Number,
        height: Number,
        size: Number,
        url: String,
      },
    },
    ext: String,
    mime: String,
    size: Number,
    url: String,
    created_at: { type: String, default: moment().format() },
    updated_at: String,
  })
);

// ext:".jpg"
// formats:Object {thumbnail: Object, small: Object}
// height:580
// mime:"image/jpeg"
// name:"Trancapoecho NICO"
// size:0
// url:"/images/products/dipronto_logo.jpeg"
// width:581

/**
 * Product mongoose schema.
 */
// export default mongoose.model(
//   SCHEMA_NAME,
//   new Schema({
//     name: String,
//     width: Number,
//     height: Number,
//     formats: {
//       thumbnail: {
//         ext: String,
//         mime: String,
//         width: Number,
//         height: Number,
//         size: Number,
//         url: String,
//       },
//       medium: {
//         ext: String,
//         mime: String,
//         width: Number,
//         height: Number,
//         size: Number,
//         url: String,
//       },
//       small: {
//         ext: String,
//         mime: String,
//         width: Number,
//         height: Number,
//         size: Number,
//         url: String,
//       },
//       large: {
//         ext: String,
//         mime: String,
//         width: Number,
//         height: Number,
//         size: Number,
//         url: String,
//       },
//     },
//     ext: String,
//     mime: String,
//     size: Number,
//     url: String,
//     created_at: { type: String, default: moment().format() },
//     updated_at: String,
//   })
// );

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
