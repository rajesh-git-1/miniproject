import mongoose from 'mongoose';

const pendingRegistrationSchema = new mongoose.Schema({
    // Multi-tenant isolation field
    school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },

    // Common Core Fields
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Teacher', 'Admin', 'Principal'], required: true },
    profilePhotoUrl: { type: String },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },

    // Common Optional Fields (Shared across roles)
    mobile: { type: String },
    address: { type: String },
    username: { type: String },

    // Student-specific fields
    rollNo: { type: String },
    standard: { type: String }, // Represents Class
    fatherName: { type: String },
    motherName: { type: String },
    dob: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    section: { type: String },
    admissionDate: { type: Date },

    // Staff-specific fields (Teacher, Admin, Principal)
    teacherId: { type: String },
    adminId: { type: String },
    principalId: { type: String },
    designation: { type: String }, // Also used for Department/Position
    salary: { type: Number },
    joiningDate: { type: Date },
    qualification: { type: String },
    experience: { type: String }, // E.g., "5 Years"
    accessLevel: { type: String, enum: ['Super Admin', 'Staff Admin'] },
    officeContact: { type: String },
    officeAddress: { type: String }

}, { timestamps: true });

// Ensure email is unique per school for pending registrations too to prevent duplicates
pendingRegistrationSchema.index({ email: 1, school_id: 1 }, { unique: true });

// export default mongoose.models.PendingRegistration || mongoose.model('PendingRegistration', PendingRegistrationSchema);
const PendingRegistration = mongoose.models.PendingRegistration || mongoose.model('PendingRegistration', PendingRegistrationSchema);

// module.exports = PendingRegistration;
export default PendingRegistration;