import mongoose from 'mongoose';

const adminProfileSchema = new mongoose.Schema({
    // Link to core User document
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },

    adminId: { type: String },
    designation: { type: String },
    accessLevel: { type: String, enum: ['Super Admin', 'Staff Admin'] },

    // Additional generic info moved from user
    mobile: { type: String },
    address: { type: String },
    username: { type: String },
    profilePhotoUrl: { type: String }

}, { timestamps: true });

export default mongoose.model('AdminProfile', adminProfileSchema);
