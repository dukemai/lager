import mongoose from 'mongoose';

const { Schema } = mongoose;

const Company = new Schema({
  name: String,
});

export default mongoose.model('Company', Company);

