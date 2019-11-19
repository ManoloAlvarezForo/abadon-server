import mongoose from 'mongoose';
import moment from 'moment';

/**
 * Options for the base model.
 */
const baseOptions = {
  discriminatorKey: 'kind', // our discriminator key.
  collection: 'events', // the name of our collection.
};

/**
 * Base Event schema.
 */
const eventSchema = new mongoose.Schema(
  {
    title: String,
    date: String,
    time: String,
    location: String,
    description: String,
    createdDate: { type: String, default: moment().format() },
  },
  baseOptions,
);

export default mongoose.model('Event', eventSchema);
