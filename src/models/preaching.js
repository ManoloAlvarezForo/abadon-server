import mongoose from 'mongoose';
import Event from './event';

Event.discriminator(
  'preaching',
  new mongoose.Schema({
    lead: String,
    territories: [String],
    moment: String,
    type: { type: String, default: 'preaching'}
  }),
);

export default mongoose.model('preaching');
