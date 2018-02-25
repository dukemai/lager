import mongoose from 'mongoose';

const { Schema } = mongoose;

const Contact = new Schema({
  name: String,
  phoneNumber: String,
  email: String,
  address: String,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('Contact', Contact);

