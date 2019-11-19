import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

/**
 * Product mongoose schema.
 */
export default mongoose.model(
  'territory',
  new Schema({
    number: String,
    description: String,
    createdDate: { type: String, default: moment().format() },
  }),
);
