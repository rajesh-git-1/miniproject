import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Subject name is required'] 
    },
    code: { 
        type: String, 
        required: [true, 'Subject code is required'],
        unique: true 
    },
    type: { 
        type: String, 
        enum: ['Theory', 'Practical', 'Language', 'Extracurricular'], 
        default: 'Theory' 
    }
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);