import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductUnit = new Schema({
  name: String,
  totalPerUnit: Number,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('ProductUnit', ProductUnit);

const ProductUnitSchema = ProductUnit;
export { ProductUnitSchema };
