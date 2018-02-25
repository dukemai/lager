import mongoose from 'mongoose';

const { Schema } = mongoose;

const Product = new Schema({
  name: String,
  code: String,
  image: String,
  category: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Company' },
  distributor: { type: Schema.Types.ObjectId, ref: 'Distributor' },
  unit: { type: Schema.Types.ObjectId, ref: 'ProductUnit' },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('Product', Product);

