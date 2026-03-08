// import express from 'express';
// import Student from '../models/Student.js';
// const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         // We wrap it in { students: ... } because your frontend expects data.students
//         const students = await Student.find().sort({ createdAt: -1 });
//         res.json({ success: true, students });
//     } catch (e) { res.status(500).json({ success: false, message: e.message }); }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json({ success: true, data: student });
//     } catch (e) { res.status(500).json({ success: false, message: e.message }); }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         await Student.findByIdAndDelete(req.params.id);
//         res.json({ success: true });
//     } catch (e) { res.status(500).json({ success: false, message: e.message }); }
// });

// export default router;

import express from 'express';
import Student from '../models/Student.js';
const router = express.Router();

// GET all students (with optional search and class filters)
router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.standard) query.standard = req.query.standard;
        if (req.query.search) query.name = { $regex: req.query.search, $options: 'i' };

        const students = await Student.find(query).sort({ createdAt: -1 });
        
        // Send as 'data' so the frontend picks it up instantly
        res.json({ success: true, data: students });
    } catch (e) { 
        res.status(500).json({ success: false, message: e.message }); 
    }
});

// DELETE a student
router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

export default router;