

// import express from 'express';
// import { Student, CentralAuth } from '../models/index.js'; // We must import CentralAuth to get the IDs!

// const router = express.Router();

// // GET all students (with optional search and class filters)
// router.get('/', async (req, res) => {
//     try {
//         const query = {};
//         if (req.query.standard) query.standard = req.query.standard;
//         if (req.query.search) query.name = { $regex: req.query.search, $options: 'i' };

//         // 1. Fetch students and use .lean() to strip away Mongoose's strict rules
//         const students = await Student.find(query).sort({ createdAt: -1 }).lean();

//         // 2. Extract all the student IDs so we can look up their auth records
//         const studentIds = students.map(student => student._id);

//         // 3. Find all CentralAuth records that match these students
//         const authRecords = await CentralAuth.find({ userRef: { $in: studentIds } }).lean();

//         // Create a quick lookup dictionary: { "student_id": "AB-STD-XXX" }
//         const authMap = {};
//         authRecords.forEach(record => {
//             authMap[record.userRef.toString()] = record.loginId;
//         });

//         // 4. Stitch the loginId onto every single student object
//         const studentsWithLoginIds = students.map(student => ({
//             ...student,
//             // If they have an ID, attach it. If not, say 'Pending'
//             loginId: authMap[student._id.toString()] || 'Pending'
//         }));

//         // Send the combined data to the frontend!
//         res.json({ success: true, data: studentsWithLoginIds });
//     } catch (e) {
//         console.error("Error fetching students:", e);
//         res.status(500).json({ success: false, message: e.message });
//     }
// });

// // DELETE a student
// router.delete('/:id', async (req, res) => {
//     try {
//         await Student.findByIdAndDelete(req.params.id);
//         res.json({ success: true });
//     } catch (e) { res.status(500).json({ success: false, message: e.message }); }
// });

// export default router;
import express from 'express';
import mongoose from 'mongoose'; // We need mongoose for the native dragnet search!
import { Student, CentralAuth } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.standard) query.standard = req.query.standard;
        if (req.query.search) query.name = { $regex: req.query.search, $options: 'i' };

        // 1. Fetch all students from the new Student collection
        const students = await Student.find(query).sort({ createdAt: -1 }).lean();

        // 2. Grab all their emails
        const studentEmails = students.filter(s => s.email).map(s => s.email.toLowerCase());

        // 3. THE DRAGNET: Search abhyaas_users collection for these emails
        const db = mongoose.connection.db;
        const allUsers = await db.collection('abhyaas_users').find({ email: { $in: studentEmails } }).toArray();

        // Map emails to their old database _ids
        const emailToOldIdMap = {};
        allUsers.forEach(u => emailToOldIdMap[u.email.toLowerCase()] = u._id.toString());

        // 4. Gather ALL possible IDs to search CentralAuth
        const possibleRefs = students.map(s => s._id.toString());
        Object.values(emailToOldIdMap).forEach(id => possibleRefs.push(id));

        // Safely convert string IDs back to ObjectIds for the query
        const objectIdRefs = possibleRefs
            .filter(id => mongoose.Types.ObjectId.isValid(id))
            .map(id => new mongoose.Types.ObjectId(id));

        // 5. Fetch the IDs from the CentralAuth Master Key table
        const authRecords = await CentralAuth.find({ userRef: { $in: objectIdRefs } }).lean();

        const authMap = {};
        authRecords.forEach(record => {
            authMap[record.userRef.toString()] = record.loginId;
        });

        // 6. Stitch the Login IDs to the right student
        const studentsWithLoginIds = students.map(student => {
            const studentIdStr = student._id.toString();
            const studentEmailStr = student.email ? student.email.toLowerCase() : '';

            // Check the new database structure first (for sai, janu)
            let matchedId = authMap[studentIdStr];

            // If not found, check the old database structures using their email
            if (!matchedId && emailToOldIdMap[studentEmailStr]) {
                const oldUserId = emailToOldIdMap[studentEmailStr];
                matchedId = authMap[oldUserId];
            }

            return {
                ...student,
                loginId: matchedId || 'Pending'
            };
        });

        res.json({ success: true, data: studentsWithLoginIds });
    } catch (e) {
        console.error("Error fetching students:", e);
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