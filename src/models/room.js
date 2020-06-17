import mongoose from "mongoose";
import moment from "moment";

const { Schema } = mongoose;

const roomSchema = new Schema({
  roomName: String,
  roomId: String,
  participants: [],
  board: {
    objects: [
      {
        angle: { type: Number, default: 0 },
        backgroundColor: { type: String, default: "" },
        fill: { type: String, default: "#dcdcdc" },
        fillRule: { type: String, default: "nonzero" },
        flipX: { type: Boolean, default: false },
        flipY: { type: Boolean, default: false },
        globalCompositeOperation: { type: String, default: "source-over" },
        height: { type: Number, default: 100 },
        left: { type: Number, default: 50 },
        opacity: { type: Number, default: 1 },
        originX: { type: String, default: "left" },
        originY: { type: String, default: "top" },
        paintFirst: { type: String, default: "fill" },
        rx: { type: Number, default: 0 },
        ry: { type: Number, default: 0 },
        scaleX: { type: Number, default: 1 },
        scaleY: { type: Number, default: 1 },
        skewX: { type: Number, default: 0 },
        skewY: { type: Number, default: 0 },
        strokeDashArray: { type: Array, default: [] },
        strokeDashOffset: { type: Number, default: 0 },
        strokeLineCap: { type: String, default: "butt" },
        strokeLineJoin: { type: String, default: "miter" },
        strokeMiterLimit: { type: Number, default: 4 },
        strokeWidth: { type: Number, default: 1 },
        top: { type: Number, default: 50 },
        transformMatrix: { type: Array, default: [] },
        type: { type: String },
        visible: { type: Boolean, default: true },
        width: { type: Number, default: 100 },
      },
    ],
  },
  createdDate: { type: String, default: moment().format() },
});

//Note: unblock the code to add a custom autimatic id for the productId.
let CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

let Counter = mongoose.model("counter", CounterSchema);

roomSchema.pre("save", async function (next) {
  let doc = this;
  const count = await Counter.findOneAndUpdate(
    { _id: "roomId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  doc.roomId = count.seq;
  next();

  // counter
  //   .findByIdAndUpdate(
  //     { _id: "roomId" },
  //     { $inc: { seq: 1 } },
  //     { new: true, upsert: true }
  //   )
  //   .then(function (count) {
  //     doc.roomId = count.seq;
  //     next();
  //   })
  //   .catch(function (error) {
  //     console.error("counter error-> : " + error);
  //     throw error;
  //   });
});

/**
 * Product mongoose schema.
 */
export default mongoose.model("room", roomSchema);

// NOTE: default fabric element
// {
//       id: "RECT12345",
//       angle: 0,
//       backgroundColor: "",
//       clipTo: null,
//       fill: "red",
//       fillRule: "nonzero",
//       flipX: false,
//       flipY: false,
//       globalCompositeOperation: "source-over",
//       height: 200,
//       left: 100,
//       opacity: 1,
//       originX: "left",
//       originY: "top",
//       paintFirst: "fill",
//       rx: 0,
//       ry: 0,
//       scaleX: 1,
//       scaleY: 1,
//       shadow: null,
//       skewX: 0,
//       skewY: 0,
//       stroke: null,
//       strokeDashArray: null,
//       strokeDashOffset: 0,
//       strokeLineCap: "butt",
//       strokeLineJoin: "miter",
//       strokeMiterLimit: 4,
//       strokeWidth: 1,
//       top: 100,
//       transformMatrix: null,
//       type: "rect",
//       visible: true,
//       width: 200,
//     },
