import mongoose from 'mongoose';
import shortId from 'shortid';

const urlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
});

export default mongoose.model('urls', urlSchema);
