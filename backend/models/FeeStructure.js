import mongoose from 'mongoose';

const feeStructureSchema = new mongoose.Schema({
    standard: { type: String, required: true }, // e.g., "10"
    feeType: { type: String, required: true },  // e.g., "Tuition Fee", "Transport"
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    academicYear: { type: String, default: "2025-2026" }
}, { timestamps: true });

export default mongoose.model('FeeStructure', feeStructureSchema);