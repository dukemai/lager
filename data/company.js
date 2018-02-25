import mongoose from 'mongoose';

const { Schema } = mongoose;

const Company = new Schema({
  name: String,
  phoneNumber: String,
  email: String,
  address: String,
  tax: String,
  website: String,
  distributors: Array,
  contactName: String,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('Company', Company);

