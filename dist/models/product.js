"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var SCHEMA_NAME = "product";
var ObjectId = Schema.Types.ObjectId;
/**
 * Product mongoose schema.
 */

var _default = _mongoose["default"].model(SCHEMA_NAME, new Schema({
  productId: {
    type: String,
    "default": ""
  },
  client: {
    type: ObjectId,
    ref: "client"
  },
  thumbs: [{
    type: ObjectId,
    ref: "thumbnail"
  }],
  name: String,
  promo: {
    type: Boolean,
    "default": false
  },
  promoPrice: {
    type: Number,
    "default": 0.0
  },
  price: {
    type: Number,
    "default": 0.0
  },
  description: {
    type: String,
    "default": ""
  },
  promoDescription: {
    type: String,
    "default": ""
  },
  isAvailable: {
    type: Boolean,
    "default": false
  },
  quantity: {
    type: Number,
    "default": 0
  },
  createdDate: {
    type: String,
    "default": (0, _moment["default"])().format()
  },
  comments: [{
    user: {
      type: String,
      "default": ""
    },
    userId: {
      type: String,
      "default": ""
    },
    comment: String,
    createdDate: {
      type: String,
      "default": (0, _moment["default"])().format()
    }
  }],
  //TODO: Maybe not generic property.
  buildTime: {
    type: String,
    "default": ""
  },
  //TODO: For moment string maybe should be enum, type: product, service etc
  type: {
    type: String,
    "default": 'product'
  },
  categories: {
    type: [String],
    "default": []
  }
})); //Note: unblock the code to add a custom autimatic id for the productId.
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


exports["default"] = _default;