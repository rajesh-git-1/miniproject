import mongoose from 'mongoose';

const inventoryTransactionSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
    type: { type: String, enum: ['IN', 'OUT', 'ISSUE', 'RETURN'], required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    issuedTo: { type: String },
    remarks: { type: String },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const InventoryTransaction = mongoose.models.InventoryTransaction || mongoose.model('InventoryTransaction', inventoryTransactionSchema);
export default InventoryTransaction;
