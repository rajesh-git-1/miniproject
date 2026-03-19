import express from 'express';
import FeeStructure from '../models/FeeStructure.js';
import FeePayment from '../models/FeePayment.js';

const router = express.Router();

// --- FEE STRUCTURES (The Rules) ---
router.get('/structures', async (req, res) => {
    try {
        const query = req.query.standard ? { standard: req.query.standard } : {};
        const structures = await FeeStructure.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: structures });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/structures', async (req, res) => {
    try {
        const newStructure = new FeeStructure(req.body);
        await newStructure.save();
        res.status(201).json({ success: true, message: 'Fee rule created', data: newStructure });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// --- FEE PAYMENTS (The Transactions) ---
router.get('/payments/:studentId', async (req, res) => {
    try {
        const payments = await FeePayment.find({ studentId: req.params.studentId })
            .populate('feeStructureId')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/payments', async (req, res) => {
    try {
        const newPayment = new FeePayment(req.body);
        await newPayment.save();
        res.status(201).json({ success: true, message: 'Payment recorded successfully', data: newPayment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;