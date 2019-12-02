import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

const saleSchema = new Schema({
  client: String,
  nit: String,
  nitName: String,
  date: String,
  time: String,
  paymentType: String,
  pay: Number,
  change: Number,
  products: [Object],
  createdDate: { type: String, default: moment().format() }
});

export default mongoose.model('sale', saleSchema);
