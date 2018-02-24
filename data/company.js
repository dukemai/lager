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
});

export default mongoose.model('Company', Company);

