import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductCategory = new Schema({
  name: String,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('ProductCategory', ProductCategory);

const ProductCategorySchema = ProductCategory;
export { ProductCategorySchema };
