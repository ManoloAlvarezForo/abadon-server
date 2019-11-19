import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

export default mongoose.model(
  'user',
  new Schema({
    name: String,
    email: String,
    password: String,
    notifications: [
      {
        text: String,
        title: String,
        isChecked: { type: Boolean, default: false },
        createdDate: { type: String, default: moment().format() },
      },
    ],
  })
);
