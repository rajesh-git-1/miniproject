// import mongoose from 'mongoose';

// const teacherSchema = new mongoose.Schema({
//     // Link to core User document
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
//     school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },

//     teacherId: { type: String },
//     designation: { type: String }, // Department / Position
//     salary: { type: Number },
//     joiningDate: { type: Date },
//     qualification: { type: String },
//     experience: { type: String },

//     // Additional generic info moved from user
//     mobile: { type: String },
//     address: { type: String },
//     username: { type: String },
//     profilePhotoUrl: { type: String }

// }, { timestamps: true });

// export default mongoose.model('Teacher', teacherSchema);

import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    teacherId: { type: String, required: true, unique: true },
    phone: { type: String },
    designation: { type: String },
    department: { type: String },
    qualification: { type: String },
    experience: { type: Number },
    salary: { type: Number },
    subjects: [{ type: String }],
    profilePhotoUrl: { type: String }
}, { timestamps: true });

// const Teacher = mongoose.model('Teacher', teacherSchema);
// export default Teacher;
// THE FIX: Check if mongoose.models.Teacher already exists before creating it
const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);
export default Teacher;