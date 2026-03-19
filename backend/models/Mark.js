import mongoose from 'mongoose';

const markSchema = new mongoose.Schema({
    examTitle: { type: String, required: true }, // e.g., "FA-1"
    examType: { type: String, required: true },  // e.g., "Formative"
    standard: { type: String, required: true },  // e.g., "10"
    subject: { type: String, required: true },   // e.g., "Mathematics"
    maxMarks: { type: Number, required: true, default: 100 },
    records: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        studentName: String,
        rollNo: String,
        marksObtained: { type: Number, default: 0 },
        isAbsent: { type: Boolean, default: false }
    }]
}, { timestamps: true });

// Ensures we don't accidentally create duplicate mark sheets
markSchema.index({ examTitle: 1, standard: 1, subject: 1 }, { unique: true });

export default mongoose.model('Mark', markSchema);