// import mongoose from 'mongoose';

// const inventorySchema = new mongoose.Schema({
//     itemId: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     quantity: { type: Number, required: true, default: 0 },
//     unit: { type: String, required: true },
//     location: { type: String },
//     supplier: { type: String },
//     status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock'], default: 'In Stock' }
// }, { timestamps: true });

// const Inventory = mongoose.model('Inventory', inventorySchema);
// export default Inventory; // Use export default



import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    itemId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    threshold: { type: Number, required: true, default: 10 },
    good: { type: Number, default: 0 },
    inUse: { type: Number, default: 0 },
    bad: { type: Number, default: 0 },
    maintenance: { type: Number, default: 0 },
    status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock'], default: 'In Stock' }
}, { timestamps: true });

const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);
export default Inventory;