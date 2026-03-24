import mongoose from 'mongoose';

const inventoryCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

const InventoryCategory = mongoose.models.InventoryCategory || mongoose.model('InventoryCategory', inventoryCategorySchema);
export default InventoryCategory;
