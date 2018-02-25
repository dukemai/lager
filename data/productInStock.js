import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductInStock = new Schema({
  price: Number,
  retailPrice: Number,
  quantity: Number,
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  distributor: { type: Schema.Types.ObjectId, ref: 'Distributor' },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('ProductInStock', ProductInStock);

