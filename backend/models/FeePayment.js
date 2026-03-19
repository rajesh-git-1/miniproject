import mongoose from 'mongoose';

const feePaymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    feeStructureId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeStructure', required: true },
    amountPaid: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // Scholarships/waivers
    fine: { type: Number, default: 0 },     // Late fees
    paymentMethod: { type: String, enum: ['Cash', 'Cheque', 'Bank Transfer', 'UPI'], default: 'Cash' },
    remarks: { type: String }
}, { timestamps: true });

export default mongoose.model('FeePayment', feePaymentSchema);