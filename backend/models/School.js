import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    logoUrl: { type: String },
    subscriptionStatus: { type: String, enum: ['Active', 'Inactive', 'Trial'], default: 'Trial' },
    // Since this is the tenant model itself, its _id acts as the school_id for other collections.
    // Optional: A unique string-based identifier for subdomains (e.g., 'dps' for dps.school.com)
    tenantDomain: { type: String, unique: true, sparse: true }
}, { timestamps: true });

export default mongoose.model('School', schoolSchema);
