// import mongoose from 'mongoose';

// const studentSchema = new mongoose.Schema({
//     // Link to core User document
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
//     school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },

//     rollNo: { type: String },
//     standard: { type: String }, // Represents Class/Grade
//     fatherName: { type: String },
//     motherName: { type: String },
//     dob: { type: Date },
//     gender: { type: String, enum: ['Male', 'Female', 'Other'] },
//     section: { type: String },
//     admissionDate: { type: Date },

//     // Additional generic info moved from user
//     mobile: { type: String },
//     address: { type: String },
//     username: { type: String },
//     profilePhotoUrl: { type: String }

// }, { timestamps: true });

// export default mongoose.model('Student', studentSchema);

import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    rollNo: { type: String, required: true, unique: true },
    standard: { type: String },
    section: { type: String },
    phone: { type: String },
    parentName: { type: String },
    parentPhone: { type: String },
    gender: { type: String, default: 'Male' },
    bloodGroup: { type: String, default: 'O+' },
    house: { type: String },
    address: { type: String },
    profilePhotoUrl: { type: String },
    feeStatus: { type: String, default: 'Pending' }
}, { timestamps: true });

// const Student = mongoose.model('Student', studentSchema);
// export default Student;
// THE FIX: Check if mongoose.models.Student already exists before creating it
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
export default Student;