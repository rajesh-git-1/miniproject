// // import express from 'express';
// // import Registration from '../models/Registration.js';

// // const router = express.Router();

// // // GET all registrations (filtered by status)
// // // router.get('/', async (req, res) => {
// // //     try {
// // //         const { status } = req.query;
// // //         // If status is provided, filter by it. Otherwise, return all.
// // //         const query = status ? { status } : {};
        
// // //         const registrations = await Registration.find(query).sort({ createdAt: -1 });
// // //         res.json({ success: true, registrations });
// // //     } catch (error) {
// // //         res.status(500).json({ success: false, message: error.message });
// // //     }
// // // });

// // // GET all registrations
// // router.get('/', async (req, res) => {
// //     try {
// //         const { status } = req.query;
// //         // If status is provided and not empty, filter by it.
// //         const query = status ? { status } : {};
        
// //         const registrations = await Registration.find(query).sort({ createdAt: -1 });
        
// //         // FIX: Send it as 'data' so the frontend finds it easily
// //         res.json({ success: true, data: registrations });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });
// // // PUT Update status (Approve or Reject)
// // router.put('/:id/:action', async (req, res) => {
// //     try {
// //         const { id, action } = req.params;
// //         let newStatus = 'Pending';
        
// //         if (action === 'approve') newStatus = 'Approved';
// //         if (action === 'reject') newStatus = 'Rejected';

// //         const updatedRegistration = await Registration.findByIdAndUpdate(
// //             id, 
// //             { status: newStatus }, 
// //             { new: true }
// //         );
        
// //         res.json({ success: true, data: updatedRegistration, message: `Registration ${newStatus}` });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // // POST a new registration (Useful for testing)
// // router.post('/', async (req, res) => {
// //     try {
// //         const newReg = new Registration(req.body);
// //         await newReg.save();
// //         res.json({ success: true, data: newReg });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // export default router;






// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import Registration from '../models/Registration.js';

// const router = express.Router();

// // Ensure uploads folder exists
// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// // Set up Multer for local storage (This is the standard way before moving to S3)
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Saves files to backend/uploads/
//     },
//     filename: function (req, file, cb) {
//         // Creates a unique, permanent filename: 16892348123-photo.jpg
//         cb(null, Date.now() + path.extname(file.originalname)); 
//     }
// });
// const upload = multer({ storage: storage });

// // GET all registrations
// router.get('/', async (req, res) => {
//     try {
//         const { status } = req.query;
//         const query = status ? { status } : {};
//         const registrations = await Registration.find(query).sort({ createdAt: -1 });
//         res.json({ success: true, data: registrations });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // POST a new registration WITH a photo upload
// // Note: 'profilePhoto' must match the name appended in FormData on the frontend
// router.post('/', upload.single('profilePhoto'), async (req, res) => {
//     try {
//         const regData = { ...req.body };
        
//         // If a file was uploaded, generate the permanent URL
//         if (req.file) {
//             regData.profilePhotoUrl = `http://localhost:5000/uploads/${req.file.filename}`;
//         }

//         const newReg = new Registration(regData);
//         await newReg.save();
//         res.json({ success: true, data: newReg });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // PUT Update status (Approve/Reject)
// router.put('/:id/:action', async (req, res) => {
//     try {
//         const { id, action } = req.params;
//         let newStatus = action === 'approve' ? 'Approved' : 'Rejected';

//         const updatedRegistration = await Registration.findByIdAndUpdate(
//             id, { status: newStatus }, { new: true }
//         );
        
//         res.json({ success: true, data: updatedRegistration });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // export default router;

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Registration from '../models/Registration.js';

// 🔴 IMPORT THE NEW MODELS WE JUST CREATED
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

const router = express.Router();

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const { status } = req.query;
        const query = status ? { status } : {};
        const registrations = await Registration.find(query).sort({ createdAt: -1 });
        res.json({ success: true, data: registrations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/', upload.single('profilePhoto'), async (req, res) => {
    try {
        const regData = { ...req.body };
        if (req.file) regData.profilePhotoUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        const newReg = new Registration(regData);
        await newReg.save();
        res.json({ success: true, data: newReg });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 🔴 THE MAGIC HAPPENS HERE
router.put('/:id/:action', async (req, res) => {
    try {
        const { id, action } = req.params;
        let newStatus = action === 'approve' ? 'Approved' : 'Rejected';

        // 1. Find the registration details
        const reg = await Registration.findById(id);
        if (!reg) return res.status(404).json({ success: false, message: 'Registration not found' });

        // 2. If approving, migrate data to the correct official collection
        if (action === 'approve' && reg.status !== 'Approved') {
            if (reg.role === 'Student') {
                const newStudent = new Student({
                    name: reg.name,
                    email: reg.email,
                    rollNo: reg.rollNo || `STU-${Math.floor(Math.random()*10000)}`,
                    standard: reg.className || reg.standard,
                    section: reg.section,
                    phone: reg.mobile || reg.phone,
                    gender: reg.gender,
                    parentName: reg.fatherName || reg.motherName || 'Not Provided',
                    parentPhone: reg.mobile || reg.phone,
                    house: reg.house,
                    address: reg.address,
                    profilePhotoUrl: reg.profilePhotoUrl
                });
                await newStudent.save();
            } else if (reg.role === 'Teacher') {
                const newTeacher = new Teacher({
                    name: reg.name,
                    email: reg.email,
                    teacherId: reg.teacherId || `TCH-${Math.floor(Math.random()*10000)}`,
                    phone: reg.mobile || reg.phone,
                    department: reg.department,
                    qualification: reg.qualification,
                    experience: reg.experience,
                    salary: reg.salary,
                    designation: 'Faculty', // Default designation
                    profilePhotoUrl: reg.profilePhotoUrl
                });
                await newTeacher.save();
            }
        }

        // 3. Update the status of the registration to "Approved"
        reg.status = newStatus;
        await reg.save();
        
        res.json({ success: true, data: reg });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;