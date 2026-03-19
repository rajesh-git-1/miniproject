import express from 'express';
import Subject from '../models/Subject.js';

const router = express.Router();

// GET all subjects
router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST a new subject
router.post('/', async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        await newSubject.save();
        res.status(201).json({ success: true, data: newSubject });
    } catch (error) {
        // Handle duplicate code errors
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Subject Code already exists!' });
        }
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE a subject
router.delete('/:id', async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Subject deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;