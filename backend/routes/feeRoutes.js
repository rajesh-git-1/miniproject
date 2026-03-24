import express from 'express';
import FeeStructure from '../models/FeeStructure.js';
import FeePayment from '../models/FeePayment.js';
import { Student, Fee } from '../models/index.js';
import mongoose from 'mongoose';

const router = express.Router();

// HELPER: Reconcile student fee status (Ported for modular safety)
const reconcileStudentFeeStatus = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) return;

        const structures = await FeeStructure.find({ standard: student.standard });
        const payments = await FeePayment.find({ studentId });

        let totalDue = 0;
        let totalPaid = 0;
        structures.forEach(s => { totalDue += s.amount; });
        payments.forEach(p => { totalPaid += (p.amountPaid + (p.discount || 0)); });

        let newStatus = 'Pending';
        if (totalPaid >= totalDue) newStatus = 'Paid';
        else if (totalPaid > 0) newStatus = 'Partial';

        await Student.findByIdAndUpdate(studentId, { feeStatus: newStatus });

        for (const s of structures) {
            const paidForThis = payments
                .filter(p => p.feeStructureId.toString() === s._id.toString())
                .reduce((sum, p) => sum + p.amountPaid + p.discount, 0);

            let status = 'Pending';
            if (paidForThis >= s.amount) status = 'Paid';
            else if (paidForThis > 0) status = 'Partial';

            await Fee.findOneAndUpdate(
                { student: studentId, feeType: s.feeType },
                {
                    student: studentId,
                    feeType: s.feeType,
                    amount: s.amount,
                    paidAmount: paidForThis,
                    status: status,
                    dueDate: s.dueDate
                },
                { upsert: true }
            );
        }
    } catch (err) {
        console.error("Internal Sync Error:", err);
    }
};

// --- FEE STRUCTURES ---
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

// --- FEE PAYMENTS ---
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

        // 🟢 SYNC TRIGGER: Immediately update student profile and ledger
        await reconcileStudentFeeStatus(req.body.studentId);

        res.status(201).json({ success: true, message: 'Payment recorded and synced! ✅', data: newPayment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;