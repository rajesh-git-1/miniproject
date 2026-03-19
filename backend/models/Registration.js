// import mongoose from 'mongoose';

// const registrationSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String },
//     role: { type: String, enum: ['Student', 'Teacher', 'Admin', 'Principal'], required: true },
    
//     // Student specific fields
//     standard: { type: String },
//     section: { type: String },
//     dob: { type: Date },
    
//     // Teacher specific fields
//     department: { type: String },
//     experience: { type: Number },
//     qualification: { type: String },
    
//     // Common fields
//     address: { type: String },
//     status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
// }, { timestamps: true });

// const Registration = mongoose.model('Registration', registrationSchema);
// export default Registration;

import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['Student', 'Teacher', 'Admin', 'Principal'], required: true },
    profilePhotoUrl: { type: String }, // 👈 ADDED THIS LINE
    
    standard: { type: String },
    section: { type: String },
    dob: { type: Date },
    gender: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    house: { type: String },
    admissionDate: { type: Date },
    
    department: { type: String },
    experience: { type: Number },
    qualification: { type: String },
    
    address: { type: String },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

const Registration = mongoose.model.Registration||mongoose.model('Registration', registrationSchema);
export default Registration;
// THE FIX: Check if mongoose.models.Teacher already exists before creating it
