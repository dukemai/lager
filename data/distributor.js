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
});

export default mongoose.model('Distributor', Distributor);

