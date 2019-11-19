import mongoose from 'mongoose';
import Event from './event';

Event.discriminator(
  'publicMeeting',
  new mongoose.Schema({
    meetingType: String,
    president: String,
    speaker: String,
    watchtowerGuider: String,
    watchtowerReader: String,
    type: { type: String, default: 'meeting'}
  }),
);

export default mongoose.model('publicMeeting');
