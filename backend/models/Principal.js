import mongoose from 'mongoose';

const principalSchema = new mongoose.Schema({
    // Link to core User document
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },

    principalId: { type: String },
    qualification: { type: String },
    experience: { type: String },
    joiningDate: { type: Date },
    officeContact: { type: String },
    officeAddress: { type: String },

    // Additional generic info moved from user
    mobile: { type: String },
    address: { type: String },
    username: { type: String },
    profilePhotoUrl: { type: String }

}, { timestamps: true });

export default mongoose.model('Principal', principalSchema);
