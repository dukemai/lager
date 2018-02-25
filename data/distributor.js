import mongoose from 'mongoose';

const { Schema } = mongoose;

const Distributor = new Schema({
  name: String,
  contactName: String,
  phoneNumber: String,
  email: String,
  address: String,
  tax: String,
  website: String,
  manufacturers: Array,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('Distributor', Distributor);

