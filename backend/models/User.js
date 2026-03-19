import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Multi-tenant isolation field
    school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },

    name: { type: String, required: true },
    email: { type: String, required: true }, // Unique per school_id
    password: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Teacher', 'Admin', 'Principal'], required: true },
    profilePhotoUrl: { type: String },

    // Common Optional Fields (Shared across roles)
    mobile: { type: String },
    address: { type: String },
    username: { type: String }

}, { timestamps: true, collection: 'abhyaas_users' });

// Ensure email is unique per school (tenant isolation)
userSchema.index({ email: 1, school_id: 1 }, { unique: true });

export default mongoose.model('User', userSchema);