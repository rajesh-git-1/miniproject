// import express from 'express';
// import Teacher from '../models/Teacher.js';
// const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const teachers = await Teacher.find().sort({ createdAt: -1 });
//         res.json({ success: true, teachers });
//     } catch (e) { res.status(500).json({ success: false, message: e.message }); }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json({ success: true, data: teacher });
//     } catch (e) { res.status(500).json({ success: false, message: e.message }); }
// });

// export default router;
import express from 'express';
import Teacher from '../models/Teacher.js';
const router = express.Router();

// GET all teachers
router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.search) query.name = { $regex: req.query.search, $options: 'i' };

        const teachers = await Teacher.find(query).sort({ createdAt: -1 });
        res.json({ success: true, data: teachers });
    } catch (e) { 
        res.status(500).json({ success: false, message: e.message }); 
    }
});

// DELETE a teacher
router.delete('/:id', async (req, res) => {
    try {
        await Teacher.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

export default router;