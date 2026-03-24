// routes/index.js — All API routes for Abhyaas School ERP
import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/authMiddleware.js';
import bcrypt from 'bcryptjs';
// Import all models using ES Module syntax
import {
  User, Student, Teacher, Class, Subject,
  Attendance, Exam, Result, Timetable,
  Fee, Homework, LibraryBook, LibraryIssue,
  Announcement, TransportRoute, TransportAssignment,
  Leave, Payroll, ActivityLog, TalentTest,
  PendingRegistration,CentralAuth
} from '../models/index.js';
import { sendAbsentNotification } from '../utils/whatsapp.js';

const router = express.Router();

// ── helpers ──────────────────────────────────────────────────────
const ok = (res, data, msg = 'Success') => res.json({ success: true, message: msg, data });
const err = (res, msg = 'Server error', code = 500) => res.status(code).json({ success: false, message: msg });
const adminOnly = [auth, (req, res, next) => req.user.role === 'Admin' ? next() : err(res, 'Admin only', 403)];

const generateSequentialId = async (Model, prefix, fieldName) => {
  const lastDoc = await Model.findOne({}, { [fieldName]: 1 }).sort({ _id: -1 });
  if (!lastDoc || !lastDoc[fieldName]) return `${prefix}-1001`;
  const match = lastDoc[fieldName].match(/\d+$/);
  if (match) {
    return `${prefix}-${parseInt(match[0], 10) + 1}`;
  }
  return `${prefix}-1001`;
};


router.post("/set-password", auth, async (req, res) => {
  try {
    const { newPassword } = req.body;

    // 1. Encrypt the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 2. Find the logged-in user and update their password
    await User.findByIdAndUpdate(req.user.id, {
      password: hashedPassword,
      isFirstLogin: false // Changes their status so they don't see this page again
    });

    res.json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    console.error("Set Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// ════════════════════════════════════════════════════════════════
// DASHBOARD STATS
// ════════════════════════════════════════════════════════════════
router.get('/dashboard/stats', auth, async (req, res) => {
  try {
    const [totalStudents, totalTeachers, totalClasses,
      pendingFees, pendingLeaves, upcomingExams,
      pendingRegs, totalAnnouncements] = await Promise.all([
        Student.countDocuments({ isActive: true }),
        Teacher.countDocuments({ isActive: true }),
        Class.countDocuments(),
        Fee.countDocuments({ status: { $in: ['Pending', 'Overdue'] } }),
        Leave.countDocuments({ status: 'Pending' }),
        Exam.countDocuments({ date: { $gte: new Date() } }),
        PendingRegistration.countDocuments({ status: 'Pending' }),
        Announcement.countDocuments(),
      ]);

    // Fee collection total
    const feeAgg = await Fee.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$paidAmount' } } },
    ]);
    const feeCollected = feeAgg[0]?.total || 0;

    // Attendance % today
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const attAgg = await Attendance.aggregate([
      { $match: { date: { $gte: today } } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ['$status', 'Present'] }, 1, 0] } }
        }
      },
    ]);
    const attPct = attAgg[0] ? Math.round((attAgg[0].present / attAgg[0].total) * 100) : 0;

    ok(res, {
      totalStudents, totalTeachers, totalClasses,
      pendingFees, pendingLeaves, upcomingExams,
      pendingRegs, feeCollected, attendancePct: attPct,
      totalAnnouncements,
    });
  } catch (e) { err(res, e.message); }
});

// Recent activity for dashboard
router.get('/dashboard/activity', auth, async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 }).limit(10)
      .populate('user', 'name role');
    ok(res, logs);
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// REGISTRATIONS (existing)
// ════════════════════════════════════════════════════════════════
// router.get('/admin/registrations', adminOnly, async (req, res) => {
//   try {
//     const regs = await PendingRegistration.find({ status:'Pending' }).sort({ createdAt:-1 });
//     ok(res, regs);
//   } catch(e) { err(res, e.message); }
// });

// router.put('/admin/registrations/:id', adminOnly, async (req, res) => {
//   try {
//     const { status } = req.body;
//     const reg = await PendingRegistration.findByIdAndUpdate(req.params.id, { status }, { new:true });
//     if (!reg) return err(res,'Registration not found',404);
//     if (status === 'Approved') {
//       await ActivityLog.create({ user:req.user._id, action:'User Approved', module:'Registrations', details:`Approved ${reg.role}: ${reg.name}` });
//     }
//     ok(res, reg, `Registration ${status}`);
//   } catch(e) { err(res, e.message); }
// });

// ════════════════════════════════════════════════════════════════
// REGISTRATIONS (Permanent Approval Logic)
// ════════════════════════════════════════════════════════════════
// const bcrypt = require('bcryptjs'); // Ensure bcrypt is available for password hashing

router.get('/admin/registrations', adminOnly, async (req, res) => {
  try {
    const { status } = req.query;
    const q = status ? { status } : {};
    const regs = await PendingRegistration.find(q).sort({ createdAt: -1 });
    res.json({ success: true, data: regs });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.put('/admin/registrations/:id/:action', adminOnly, async (req, res) => {
  try {
    const { id, action } = req.params;
    const reg = await PendingRegistration.findById(id);

    if (!reg) return res.status(404).json({ success: false, message: 'Registration not found' });
    if (reg.status === 'Approved') return res.status(400).json({ success: false, message: 'Already approved!' });

    // IF REJECTED
    if (action === 'reject') {
      reg.status = 'Rejected';
      await reg.save();
      return res.json({ success: true, message: 'Registration rejected.' });
    }

    //     // IF APPROVED
    //     if (action === 'approve') {
    //       // 1. Create the permanent User for login
    //       const salt = await bcrypt.genSalt(10);
    //       const hashedPassword = await bcrypt.hash("Welcome@123", salt);

    //       const authUser = await User.create({
    //         name: reg.name,
    //         email: reg.email,
    //         password: hashedPassword,
    //         role: reg.role,
    //         isFirstLogin: true
    //       });

    //       // 2. Move data to Students or Teachers collection permanently
    //       if (reg.role === 'Student') {
    //         await Student.create({
    //           name: reg.name,
    //           email: reg.email,
    //           user: authUser._id,
    //           rollNo: reg.rollNo || `S-${Date.now().toString().slice(-6)}`,
    //           standard: reg.className || reg.standard,
    //           section: reg.section,
    //           gender: reg.gender,
    //           fatherName: reg.fatherName,
    //           motherName: reg.motherName,
    //           house: reg.house,
    //           address: reg.address,
    //           phone: reg.mobile || reg.phone,
    //           profilePhotoUrl: reg.profilePhotoUrl,
    //           isActive: true
    //         });
    //       } else if (reg.role === 'Teacher') {
    //         await Teacher.create({
    //           name: reg.name,
    //           email: reg.email,
    //           user: authUser._id,
    //           teacherId: reg.teacherId || `T-${Date.now().toString().slice(-6)}`,
    //           department: reg.department,
    //           qualification: reg.qualification,
    //           experience: reg.experience,
    //           salary: reg.salary,
    //           phone: reg.mobile || reg.phone,
    //           address: reg.address,
    //           profilePhotoUrl: reg.profilePhotoUrl,
    //           isActive: true
    //         });
    //       }

    //       // 3. Mark as approved in the pending list
    //       reg.status = 'Approved';
    //       await reg.save();

    //       // Log the activity
    //       await ActivityLog.create({ user: req.user._id, action: 'User Approved', module: 'Registrations', details: `Approved ${reg.role}: ${reg.name}` });

    //       return res.json({ success: true, message: `${reg.role} permanently added to the system!` });
    //     }
    // IF APPROVED
    if (action === 'approve') {
      // 🕵️‍♂️ SPY LOG: See exactly what the DB is holding
      console.log("Found Registration Data:", reg);

      // 1. Create the permanent User for login
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("Welcome@123", salt);

      // Use || to handle different possible naming conventions (e.g., mobile vs phone)
      const userData = {
        name: reg.name || reg.fullName,
        email: reg.email,
        password: hashedPassword,
        role: reg.role,
        isFirstLogin: true
      };

      console.log("Attempting to create User with:", userData);
      const authUser = await User.create(userData);

      // 2. Move data to Students or Teachers collection permanently
      if (reg.role === 'Student') {
        const generatedRollNo = await generateSequentialId(Student, 'S', 'rollNo');
        const studentProfile = await Student.create({
          name: userData.name,
          email: userData.email,
          user: authUser._id,
          rollNo: reg.rollNo || reg.studentId || generatedRollNo,
          standard: reg.className || reg.standard,
          section: reg.section || 'A',
          classId: (reg.classId && mongoose.Types.ObjectId.isValid(reg.classId)) ? reg.classId : null,
          gender: reg.gender,
          fatherName: reg.fatherName,
          motherName: reg.motherName,
          house: reg.house,
          address: reg.address,
          phone: reg.mobile || reg.phone,
          profilePhotoUrl: reg.profilePhotoUrl,
          isActive: true
        });

        // 🟢 SYNC WITH CLASS
        const finalClassId = reg.classId || null;
        if (finalClassId && mongoose.Types.ObjectId.isValid(finalClassId)) {
          await Class.findByIdAndUpdate(finalClassId, { $addToSet: { students: studentProfile._id } });
        } else if (reg.standard) {
          // Fallback: try to find class by standard and section
          const targetClass = await Class.findOne({ standard: reg.standard, section: reg.section || 'A' });
          if (targetClass) {
            await Student.findByIdAndUpdate(studentProfile._id, { classId: targetClass._id });
            await Class.findByIdAndUpdate(targetClass._id, { $addToSet: { students: studentProfile._id } });
          }
        }
      } else if (reg.role === 'Teacher') {
        const generatedTeacherId = await generateSequentialId(Teacher, 'T', 'teacherId');
        await Teacher.create({
          name: userData.name,
          email: userData.email,
          user: authUser._id,
          teacherId: reg.teacherId || generatedTeacherId,
          department: reg.department,
          qualification: reg.qualification,
          experience: reg.experience,
          salary: reg.salary,
          phone: reg.mobile || reg.phone,
          address: reg.address,
          profilePhotoUrl: reg.profilePhotoUrl,
          isActive: true
        });
      }

      // 3. Mark as approved
      reg.status = 'Approved';
      await reg.save();

      await ActivityLog.create({ user: req.user._id, action: 'User Approved', module: 'Registrations', details: `Approved ${reg.role}: ${userData.name}` });

      return res.json({ success: true, message: `${reg.role} permanently added to the system!` });
    }

  } catch (e) {
    console.error("Approval Error:", e);
    res.status(500).json({ success: false, message: e.message });
  }
});
// ════════════════════════════════════════════════════════════════
// STUDENTS
// ════════════════════════════════════════════════════════════════
router.get('/students', auth, async (req, res) => {
  try {
    const { standard, section, search, page = 1, limit = 20 } = req.query;
    const q = { isActive: true };
    if (standard) q.standard = standard;
    if (section) q.section = section;
    if (search) q.name = { $regex: search, $options: 'i' };
    const [students, total] = await Promise.all([
      Student.find(q)
        .populate('classId', 'name standard section')  // Populate for combined class label e.g. '7A'
        .sort({ rollNo: 1 })
        .skip((page - 1) * limit).limit(+limit),
      Student.countDocuments(q),
    ]);

    // Attach Login IDs from CentralAuth
    const studentIds = students.map(s => s._id);
    const authRecords = await CentralAuth.find({ 
      userRef: { $in: studentIds },
      role: 'Student'
    }).select('loginId userRef');

    const authMap = authRecords.reduce((acc, curr) => {
      acc[curr.userRef.toString()] = curr.loginId;
      return acc;
    }, {});

    const studentsWithLogin = students.map(s => ({
      ...s.toObject(),
      loginId: authMap[s._id.toString()] || 'N/A'
    }));

    ok(res, { students: studentsWithLogin, total, page: +page, pages: Math.ceil(total / limit) });
  } catch (e) { err(res, e.message); }
});

router.get('/students/:id', auth, async (req, res) => {
  try {
    const s = await Student.findById(req.params.id).populate('classId', 'name standard section');
    if (!s) return err(res, 'Student not found', 404);
    ok(res, s);
  } catch (e) { err(res, e.message); }
});

// router.post('/students', adminOnly, async (req, res) => {
//   try {
//     const studentData = { ...req.body };

//     // 🛡️ BULLETPROOF FIX: Force a brand new, unique Roll Number every single time.
//     studentData.rollNo = `S-${Date.now().toString().slice(-6)}`;

//     const s = await Student.create(studentData);

//     if (studentData.classId) {
//       await Class.findByIdAndUpdate(studentData.classId, { $push:{ students: s._id } });
//     }

//     await ActivityLog.create({ user:req.user._id, action:'Student Added', module:'Students', details:`Added ${s.name}` });

//     ok(res, s, `Student created successfully with Roll No: ${studentData.rollNo}`);

//   } catch(e) { 
//     // Catch duplicate errors gracefully
//     if (e.code === 11000) {
//       return res.status(400).json({ success: false, message: "A student with this Email or Roll Number already exists!" });
//     }
//     err(res, e.message); 
//   }
// });

router.post('/students', adminOnly, async (req, res) => {
  try {
    const studentData = { ...req.body };

    // 1. Force the default password (Ignore anything sent from the frontend)
    const salt = await bcrypt.genSalt(10);
    studentData.password = await bcrypt.hash("Welcome@123", salt);

    // Force them to change it on first login
    studentData.isFirstLogin = true;

    // Force unique Roll Number
    studentData.rollNo = await generateSequentialId(Student, 'S', 'rollNo');

    const s = await Student.create(studentData);

    if (studentData.classId) {
      await Class.findByIdAndUpdate(studentData.classId, { $push: { students: s._id } });
    }

    await ActivityLog.create({ user: req.user._id, action: 'Student Added', module: 'Students', details: `Added ${s.name}` });

    ok(res, s, `Student created! Default Password is: Welcome@123`);
  } catch (e) {
    if (e.code === 11000) return res.status(400).json({ success: false, message: "Email or Roll Number already exists!" });
    err(res, e.message);
  }
});

router.put('/students/:id', adminOnly, async (req, res) => {
  try {
    const oldS = await Student.findById(req.params.id);
    const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    // Legacy Sync: Keep the old abhyaas_users email identical so the Login ID dragnet doesn't break!
    if (oldS && oldS.email && s.email && oldS.email.toLowerCase() !== s.email.toLowerCase()) {
      const db = mongoose.connection.db;
      await db.collection('abhyaas_users').updateOne(
        { email: oldS.email.toLowerCase() },
        { $set: { email: s.email.toLowerCase() } }
      );
    }
    ok(res, s, 'Student updated');
  } catch (e) { err(res, e.message); }
});

router.delete('/students/:id', adminOnly, async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, { isActive: false });
    ok(res, null, 'Student deactivated');
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// TEACHERS
// ════════════════════════════════════════════════════════════════
router.get('/teachers', auth, async (req, res) => {
  try {
    const { department, search, page = 1, limit = 20 } = req.query;
    const q = { isActive: true };
    if (department) q.department = department;
    if (search) q.name = { $regex: search, $options: 'i' };
    const [teachers, total] = await Promise.all([
      Teacher.find(q).populate('classes', 'name').sort({ name: 1 })
        .skip((page - 1) * limit).limit(+limit),
      Teacher.countDocuments(q),
    ]);

    // Attach Login IDs from CentralAuth
    const teacherIds = teachers.map(t => t._id);
    const authRecords = await CentralAuth.find({ 
      userRef: { $in: teacherIds },
      role: 'Teacher'
    }).select('loginId userRef');

    const authMap = authRecords.reduce((acc, curr) => {
      acc[curr.userRef.toString()] = curr.loginId;
      return acc;
    }, {});

    const teachersWithLogin = teachers.map(t => ({
      ...t.toObject(),
      loginId: authMap[t._id.toString()] || 'N/A'
    }));

    ok(res, { teachers: teachersWithLogin, total, pages: Math.ceil(total / limit) });
  } catch (e) { err(res, e.message); }
});

router.get('/teachers/:id', auth, async (req, res) => {
  try {
    const t = await Teacher.findById(req.params.id).populate('classes', 'name');
    if (!t) return err(res, 'Teacher not found', 404);
    ok(res, t);
  } catch (e) { err(res, e.message); }
});

// router.post('/teachers', adminOnly, async (req, res) => {
//   try {
//     const t = await Teacher.create(req.body);
//     await ActivityLog.create({ user:req.user._id, action:'Teacher Added', module:'Teachers', details:`Added ${t.name}` });
//     ok(res, t, 'Teacher created');
//   } catch(e) { err(res, e.message); }
// });

router.post('/teachers', adminOnly, async (req, res) => {
  try {
    const teacherData = { ...req.body };

    // 1. Force the default password
    const salt = await bcrypt.genSalt(10);
    teacherData.password = await bcrypt.hash("Welcome@123", salt);

    // 2. Force them to change it on first login
    teacherData.isFirstLogin = true;

    // Assign sequential Teacher ID if not provided
    teacherData.teacherId = teacherData.teacherId || await generateSequentialId(Teacher, 'T', 'teacherId');

    const t = await Teacher.create(teacherData);
    await ActivityLog.create({ user: req.user._id, action: 'Teacher Added', module: 'Teachers', details: `Added ${t.name}` });

    ok(res, t, 'Teacher created! Default Password is: Welcome@123');
  } catch (e) { err(res, e.message); }
});

router.put('/teachers/:id', adminOnly, async (req, res) => {
  try {
    const oldT = await Teacher.findById(req.params.id);
    const t = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Legacy Sync: Keep the old abhyaas_users email identical so the Login ID dragnet doesn't break!
    if (oldT && oldT.email && t.email && oldT.email.toLowerCase() !== t.email.toLowerCase()) {
      const db = mongoose.connection.db;
      await db.collection('abhyaas_users').updateOne(
        { email: oldT.email.toLowerCase() },
        { $set: { email: t.email.toLowerCase() } }
      );
    }
    ok(res, t, 'Teacher updated');
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// CLASSES
// ════════════════════════════════════════════════════════════════
// router.get('/classes', auth, async (req, res) => {
//   try {
//     const classes = await Class.find()
//       .populate('classTeacher', 'name')
//       .populate('students', 'name rollNo')
//       .sort({ standard: 1, section: 1 });
//     ok(res, classes);
//   } catch (e) { err(res, e.message); }
// });

// router.get('/classes/:id', auth, async (req, res) => {
//   try {
//     const c = await Class.findById(req.params.id)
//       .populate('classTeacher', 'name email')
//       .populate('students', 'name rollNo feeStatus');
//     ok(res, c);
//   } catch (e) { err(res, e.message); }
// });
// ════════════════════════════════════════════════════════════════
// CLASSES
// ════════════════════════════════════════════════════════════════
router.get('/classes', auth, async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('classTeacher', 'name')
      .sort({ standard: 1, section: 1 })
      .lean(); // .lean() lets us safely modify the object

    // 🟢 BULLETPROOF SYNC: Dynamically fetch students so the list is never left behind!
    for (let c of classes) {
      const students = await Student.find({
        $or: [
          { classId: c._id }, 
          { standard: c.standard, section: c.section }
        ],
        isActive: true
      }).select('name rollNo');
      
      c.students = students;
    }
    
    ok(res, classes);
  } catch (e) { err(res, e.message); }
});

router.get('/classes/:id', auth, async (req, res) => {
  try {
    const c = await Class.findById(req.params.id)
      .populate('classTeacher', 'name email')
      .lean();
      
    if (!c) return err(res, 'Class not found', 404);

    // 🟢 BULLETPROOF SYNC: Find every single active student matching this class
    const students = await Student.find({
      $or: [
        { classId: c._id }, 
        { standard: c.standard, section: c.section }
      ],
      isActive: true
    }).select('name rollNo feeStatus');

    c.students = students;
    ok(res, c);
  } catch (e) { err(res, e.message); }
});

// ... Leave your router.post('/classes') and router.put('/classes/:id') as they are!
router.post('/classes', adminOnly, async (req, res) => {
  try {
    const { standard, section } = req.body;

    // Check if class with the same standard and section already exists
    const existingClass = await Class.findOne({ standard, section: section || 'A' });
    if (existingClass) {
      return res.status(400).json({ success: false, message: `Class ${standard} - Section ${section || 'A'} already exists!` });
    }

    const c = await Class.create(req.body);
    ok(res, c, 'Class created');
  } catch (e) { err(res, e.message); }
});

router.put('/classes/:id', adminOnly, async (req, res) => {
  try {
    const c = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    ok(res, c, 'Class updated');
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// HOUSES
// ════════════════════════════════════════════════════════════════
router.get('/houses', auth, async (req, res) => {
  try {
    const houses = await House.find().sort({ name: 1 });
    ok(res, houses);
  } catch (e) { err(res, e.message); }
});

router.post('/houses', adminOnly, async (req, res) => {
  try {
    const { name, color, emoji } = req.body;

    // Check for duplicate house name
    const existingHouse = await House.findOne({ name });
    if (existingHouse) {
      return res.status(400).json({ success: false, message: `House '${name}' already exists!` });
    }

    const h = await House.create({ name, color, emoji });
    ok(res, h, 'House created');
  } catch (e) { err(res, e.message); }
});

router.delete('/houses/:id', adminOnly, async (req, res) => {
  try {
    await House.findByIdAndDelete(req.params.id);
    ok(res, null, 'House deleted');
  } catch (e) { err(res, e.message); }
});

// Subjects
router.get('/subjects', auth, async (req, res) => {
  try {
    const subjects = await Subject.find().populate('teacher', 'name');
    ok(res, subjects);
  } catch (e) { err(res, e.message); }
});

router.post('/subjects', adminOnly, async (req, res) => {
  try {
    const s = await Subject.create(req.body);
    ok(res, s, 'Subject created');
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// ATTENDANCE
// ════════════════════════════════════════════════════════════════
router.get('/attendance', auth, async (req, res) => {
  try {
    const { classId, date, studentId, from, to, page = 1, limit = 50 } = req.query;
    const q = {};
    if (classId) q.classId = classId;
    if (studentId) q.student = studentId;
    if (date) q.date = { $gte: new Date(date), $lt: new Date(new Date(date).getTime() + 86400000) };
    if (from && to) q.date = { $gte: new Date(from), $lte: new Date(to) };
    const att = await Attendance.find(q)
      .populate('student', 'name rollNo')
      .populate('classId', 'name')
      .populate('markedBy', 'name')
      .sort({ date: -1 })
      .skip((page - 1) * limit).limit(+limit);
    const total = await Attendance.countDocuments(q);
    ok(res, { attendance: att, total });
  } catch (e) { err(res, e.message); }
});

// Attendance summary/stats for a class
router.get('/attendance/summary/:classId', auth, async (req, res) => {
  try {
    const { month } = req.query;
    const start = month ? new Date(`${month}-01`) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    const agg = await Attendance.aggregate([
      { $match: { classId: new mongoose.Types.ObjectId(req.params.classId), date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: '$student',
          total: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ['$status', 'Present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'Absent'] }, 1, 0] } },
        }
      },
      { $lookup: { from: 'students', localField: '_id', foreignField: '_id', as: 'student' } },
      { $unwind: '$student' },
    ]);
    ok(res, agg);
  } catch (e) { err(res, e.message); }
});

// Mark attendance (bulk) + WhatsApp notifications for absent students
router.post('/attendance', auth, async (req, res) => {
  try {
    const { classId, date, records } = req.body;
    // records: [{ studentId, status }]

    // 0. Fetch existing attendance to prevent duplicate WhatsApp messages
    const existingRecords = await Attendance.find({ classId, date: new Date(date) });
    const existingStatusMap = {};
    existingRecords.forEach(r => {
      existingStatusMap[r.student.toString()] = r.status;
    });

    // 1. Save attendance records (upsert)
    const ops = records.map(r => ({
      updateOne: {
        filter: { student: r.studentId, classId, date: new Date(date) },
        update: { $set: { student: r.studentId, classId, date: new Date(date), status: r.status, markedBy: req.user._id } },
        upsert: true,
      },
    }));
    await Attendance.bulkWrite(ops);
    await ActivityLog.create({ user: req.user._id, action: 'Attendance Marked', module: 'Attendance', details: `Class attendance for ${date}` });

    // 2. Send WhatsApp to parents of NEWLY ABSENT students (fire-and-forget, non-blocking)
    // We only notify if their incoming status is 'Absent' AND their previous DB status was NOT 'Absent'
    const newlyAbsentIds = records
      .filter(r => r.status === 'Absent' && existingStatusMap[r.studentId] !== 'Absent')
      .map(r => r.studentId);

    let whatsappStats = { notified: 0, failed: 0, noPhone: 0 };

    if (newlyAbsentIds.length > 0) {
      // Format date nicely: e.g. "17 Mar 2026"
      const dateObj = date ? new Date(date) : new Date();
      const dateStr = dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

      const absentStudents = await Student.find(
        { _id: { $in: newlyAbsentIds } },
        { name: 1, parentPhone: 1 }
      );

      const notifyResults = await Promise.all(
        absentStudents.map(async (student) => {
          if (!student.parentPhone) {
            whatsappStats.noPhone++;
            return;
          }
          const result = await sendAbsentNotification({
            parentPhone: student.parentPhone,
            studentName: student.name,
            dateStr,
          });
          if (result.success) whatsappStats.notified++;
          else whatsappStats.failed++;
        })
      );
    }

    ok(res, { whatsapp: whatsappStats }, 'Attendance saved');
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// EXAMINATIONS & RESULTS
// ════════════════════════════════════════════════════════════════
// router.get('/exams', auth, async (req, res) => {
//   try {
//     const { standard, type, upcoming } = req.query;
//     const q = {};
//     if (standard) q.standard = standard;
//     if (type) q.type = type;
//     if (upcoming) q.date = { $gte: new Date() };
//     const exams = await Exam.find(q).populate('createdBy', 'name').sort({ date: -1 });
//     ok(res, exams);
//   } catch (e) { err(res, e.message); }
// });

// router.post('/exams', auth, async (req, res) => {
//   try {
//     const exam = await Exam.create({ ...req.body, createdBy: req.user._id });
//     ok(res, exam, 'Exam created');
//   } catch (e) { err(res, e.message); }
// });

// router.put('/exams/:id', auth, async (req, res) => {
//   try {
//     const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     ok(res, exam, 'Exam updated');
//   } catch (e) { err(res, e.message); }
// });

// router.delete('/exams/:id', adminOnly, async (req, res) => {
//   try {
//     await Exam.findByIdAndDelete(req.params.id);
//     ok(res, null, 'Exam deleted');
//   } catch (e) { err(res, e.message); }
// });

// // Results
// router.get('/results', auth, async (req, res) => {
//   try {
//     const { examId, studentId, standard } = req.query;
//     const q = {};
//     if (examId) q.exam = examId;
//     if (studentId) q.student = studentId;
//     const results = await Result.find(q)
//       .populate('student', 'name rollNo standard section')
//       .populate('exam', 'name subject totalMarks date type')
//       .sort({ createdAt: -1 });
//     ok(res, results);
//   } catch (e) { err(res, e.message); }
// });

// router.post('/results', auth, async (req, res) => {
//   try {
//     // bulk enter results: body.results = [{ student, exam, marksObtained, totalMarks }]
//     const { results } = req.body;
//     const graded = results.map(r => {
//       const pct = (r.marksObtained / r.totalMarks) * 100;
//       return {
//         ...r, enteredBy: req.user._id,
//         grade: pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B+' : pct >= 60 ? 'B' : pct >= 50 ? 'C' : 'F',
//       };
//     });
//     const ops = graded.map(r => ({
//       updateOne: {
//         filter: { student: r.student, exam: r.exam },
//         update: { $set: r },
//         upsert: true,
//       },
//     }));
//     await Result.bulkWrite(ops);
//     await ActivityLog.create({ user: req.user._id, action: 'Results Entered', module: 'Exams', details: `Results entered for ${results.length} students` });
//     ok(res, null, 'Results saved');
//   } catch (e) { err(res, e.message); }
// });
// ════════════════════════════════════════════════════════════════
// EXAMINATIONS, RESULTS & MARKS (Bulletproof Sync)
// ════════════════════════════════════════════════════════════════
router.get('/exams', auth, async (req, res) => {
  try {
    const { standard, type, upcoming } = req.query;
    const q = {};
    
    // 🟢 FIX 1: Flexible matching so "Class 10" and "10" always match perfectly!
    if (standard) {
      const baseStd = standard.replace('Class ', '').trim();
      q.$or = [
        { standard: baseStd },
        { standard: `Class ${baseStd}` },
        { standard: standard }
      ];
    }
    
    if (type) q.type = type;
    if (upcoming) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      q.date = { $gte: yesterday }; // Keeps today's exams visible all day!
    }
    
    const exams = await Exam.find(q).populate('createdBy', 'name').sort({ date: -1 });
    res.json({ success: true, data: exams });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/exams', auth, async (req, res) => {
  try {
    const exam = await Exam.create({ ...req.body, createdBy: req.user._id });
    res.json({ success: true, data: exam, message: 'Exam created' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.put('/exams/:id', auth, async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: exam, message: 'Exam updated' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.delete('/exams/:id', adminOnly, async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: null, message: 'Exam deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// 🟢 FIX 2: BRAND NEW MARKS ENTRY SYNC
router.get('/marks', auth, async (req, res) => {
  try {
    const { examTitle, subject } = req.query;
    const exam = await Exam.findOne({ name: examTitle, subject });
    if (!exam) return res.json({ success: true, data: { records: [] } });
    
    const results = await Result.find({ exam: exam._id });
    const records = results.map(r => ({ studentId: r.student, marksObtained: r.marksObtained }));
    res.json({ success: true, data: { records } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/marks', adminOnly, async (req, res) => {
  try {
    const { examType, examTitle, standard, subject, maxMarks, records } = req.body;
    
    // Find or Create the Exam to ensure the student has a parent record to view
    let exam = await Exam.findOne({ name: examTitle, subject: subject });
    if (!exam) {
      exam = await Exam.create({
        name: examTitle, type: examType || 'Formative', standard: standard,
        subject: subject, totalMarks: maxMarks || 100, date: new Date(), createdBy: req.user._id
      });
    } else {
      exam.totalMarks = maxMarks || 100;
      await exam.save();
    }

    // Upsert the results exactly where the Student Dashboard looks for them
    const ops = records.map(r => {
      let marks = Number(r.marksObtained) || 0;
      let total = Number(maxMarks) || 100;
      let pct = (marks / total) * 100;
      let grade = r.isAbsent ? 'Abs' : (pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B+' : pct >= 60 ? 'B' : pct >= 50 ? 'C' : 'F');

      return {
        updateOne: {
          filter: { student: r.studentId, exam: exam._id },
          update: { 
            $set: { student: r.studentId, exam: exam._id, marksObtained: marks, totalMarks: total, grade, enteredBy: req.user._id } 
          },
          upsert: true
        }
      };
    });

    if (ops.length > 0) await Result.bulkWrite(ops);
    await ActivityLog.create({ user: req.user._id, action: 'Marks Entered', module: 'Exams', details: `Entered marks for ${examTitle} (${subject})` });
    
    res.json({ success: true, message: 'Marks successfully translated to Student Results!' });
  } catch (e) { 
    console.error("Marks Save Error:", e);
    res.status(500).json({ success: false, message: e.message }); 
  }
});

// Results (Legacy Fallback)
router.get('/results', auth, async (req, res) => {
  try {
    const { examId, studentId } = req.query;
    const q = {};
    if (examId) q.exam = examId;
    if (studentId) q.student = studentId;
    const results = await Result.find(q).populate('student', 'name rollNo standard section').populate('exam', 'name subject totalMarks date type').sort({ createdAt: -1 });
    res.json({ success: true, data: results });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
// Performance summary
router.get('/results/performance/:studentId', auth, async (req, res) => {
  try {
    const results = await Result.find({ student: req.params.studentId })
      .populate('exam', 'name subject date type');
    const avg = results.length ? Math.round(results.reduce((sum, r) => sum + (r.marksObtained / r.totalMarks * 100), 0) / results.length) : 0;
    ok(res, { results, average: avg, total: results.length });
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// TIMETABLE
// ════════════════════════════════════════════════════════════════
router.get('/timetable', auth, async (req, res) => {
  try {
    const { classId } = req.query;
    const q = classId ? { classId } : {};
    const tt = await Timetable.find(q)
      .populate('classId', 'name standard section')
      .populate('periods.teacher', 'name');
    ok(res, tt);
  } catch (e) { err(res, e.message); }
});

router.post('/timetable', adminOnly, async (req, res) => {
  try {
    const { classId, day, periods } = req.body;
    const tt = await Timetable.findOneAndUpdate(
      { classId, day }, { classId, day, periods }, { upsert: true, new: true }
    );
    ok(res, tt, 'Timetable saved');
  } catch (e) { err(res, e.message); }
});

// Teacher timetable
router.get('/timetable/teacher/:teacherId', auth, async (req, res) => {
  try {
    const tt = await Timetable.find({ 'periods.teacher': req.params.teacherId })
      .populate('classId', 'name');
    ok(res, tt);
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// FEES
// ════════════════════════════════════════════════════════════════
router.get('/fees', auth, async (req, res) => {
  try {
    const { studentId, status, feeType, page = 1, limit = 20 } = req.query;
    const q = {};
    if (studentId) q.student = studentId;
    if (status) q.status = status;
    if (feeType) q.feeType = feeType;
    const [fees, total] = await Promise.all([
      Fee.find(q).populate('student', 'name rollNo standard section')
        .sort({ dueDate: -1 }).skip((page - 1) * limit).limit(+limit),
      Fee.countDocuments(q),
    ]);
    ok(res, { fees, total, pages: Math.ceil(total / limit) });
  } catch (e) { err(res, e.message); }
});

router.get('/fees/summary', auth, async (req, res) => {
  try {
    const agg = await Fee.aggregate([
      {
        $group: {
          _id: '$status',
          total: { $sum: '$amount' },
          paid: { $sum: '$paidAmount' },
          count: { $sum: 1 },
        }
      },
    ]);
    const monthly = await Fee.aggregate([
      { $match: { status: 'Paid', paidDate: { $ne: null } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$paidDate' } }, collected: { $sum: '$paidAmount' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }, { $limit: 6 },
    ]);
    ok(res, { byStatus: agg, monthly });
  } catch (e) { err(res, e.message); }
});

router.post('/fees', adminOnly, async (req, res) => {
  try {
    const fee = await Fee.create({ ...req.body, collectedBy: req.user._id });
    ok(res, fee, 'Fee record created');
  } catch (e) { err(res, e.message); }
});

router.put('/fees/:id', adminOnly, async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (req.body.status === 'Paid') {
      await ActivityLog.create({ user: req.user._id, action: 'Fee Collected', module: 'Fees', details: `Fee marked paid: ₹${fee.paidAmount}` });
    }
    ok(res, fee, 'Fee updated');
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// HOMEWORK
// ════════════════════════════════════════════════════════════════
router.get('/homework', auth, async (req, res) => {
  try {
    const { classId, subject, teacherId } = req.query;
    const q = {};
    if (classId) q.classId = classId;
    if (subject) q.subject = { $regex: subject, $options: 'i' };
    if (teacherId) q.assignedBy = teacherId;
    const hw = await Homework.find(q)
      .populate('classId', 'name')
      .populate('assignedBy', 'name')
      .sort({ dueDate: 1 });
    ok(res, hw);
  } catch (e) { err(res, e.message); }
});

router.post('/homework', auth, async (req, res) => {
  try {
    const hw = await Homework.create({ ...req.body, assignedBy: req.user._id });
    ok(res, hw, 'Homework assigned');
  } catch (e) { err(res, e.message); }
});

// Submit homework (student)
router.post('/homework/:id/submit', auth, async (req, res) => {
  try {
    const { studentId, fileUrl, remarks } = req.body;
    await Homework.findByIdAndUpdate(req.params.id, {
      $push: { submissions: { student: studentId, submittedAt: new Date(), fileUrl, remarks, status: 'Submitted' } },
    });
    ok(res, null, 'Homework submitted');
  } catch (e) { err(res, e.message); }
});

// Grade submission
router.put('/homework/:id/grade/:studentId', auth, async (req, res) => {
  try {
    const { grade, remarks } = req.body;
    await Homework.updateOne(
      { _id: req.params.id, 'submissions.student': req.params.studentId },
      { $set: { 'submissions.$.grade': grade, 'submissions.$.remarks': remarks, 'submissions.$.status': 'Graded' } }
    );
    ok(res, null, 'Submission graded');
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// LIBRARY
// ════════════════════════════════════════════════════════════════
router.get('/library/books', auth, async (req, res) => {
  try {
    const { search, category, available } = req.query;
    const q = {};
    if (search) q.$or = [{ title: { $regex: search, $options: 'i' } }, { author: { $regex: search, $options: 'i' } }];
    if (category) q.category = category;
    if (available) q.available = { $gt: 0 };
    const books = await LibraryBook.find(q).sort({ title: 1 });
    ok(res, books);
  } catch (e) { err(res, e.message); }
});

router.post('/library/books', adminOnly, async (req, res) => {
  try {
    const book = await LibraryBook.create(req.body);
    ok(res, book, 'Book added');
  } catch (e) { err(res, e.message); }
});

router.get('/library/issues', auth, async (req, res) => {
  try {
    const { status, studentId } = req.query;
    const q = {};
    if (status) q.status = status;
    if (studentId) q.student = studentId;
    const issues = await LibraryIssue.find(q)
      .populate('book', 'title author isbn')
      .populate('student', 'name rollNo')
      .sort({ issuedDate: -1 });
    ok(res, issues);
  } catch (e) { err(res, e.message); }
});

router.post('/library/issue', adminOnly, async (req, res) => {
  try {
    const { bookId, studentId, dueDate } = req.body;
    const book = await LibraryBook.findById(bookId);
    if (!book || book.available < 1) return err(res, 'Book not available', 400);
    const issue = await LibraryIssue.create({
      book: bookId, student: studentId,
      dueDate: new Date(dueDate),
      issuedBy: req.user._id,
    });
    await LibraryBook.findByIdAndUpdate(bookId, { $inc: { available: -1 } });
    ok(res, issue, 'Book issued');
  } catch (e) { err(res, e.message); }
});

router.put('/library/return/:id', adminOnly, async (req, res) => {
  try {
    const issue = await LibraryIssue.findById(req.params.id);
    if (!issue) return err(res, 'Issue not found', 404);
    const fine = issue.dueDate < new Date() ? Math.floor((new Date() - issue.dueDate) / 86400000) * 5 : 0;
    issue.returnDate = new Date();
    issue.status = 'Returned';
    issue.fine = fine;
    await issue.save();
    await LibraryBook.findByIdAndUpdate(issue.book, { $inc: { available: 1 } });
    ok(res, issue, `Book returned. Fine: ₹${fine}`);
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// ANNOUNCEMENTS
// ════════════════════════════════════════════════════════════════
router.get('/announcements', auth, async (req, res) => {
  try {
    const role = req.user.role;
    const q = { $or: [{ audience: 'All' }, { audience: role }] };
    const announcements = await Announcement.find(q)
      .populate('postedBy', 'name role')
      .sort({ createdAt: -1 })
      .limit(50);
    ok(res, announcements);
  } catch (e) { err(res, e.message); }
});

router.post('/announcements', auth, async (req, res) => {
  try {
    const ann = await Announcement.create({ ...req.body, postedBy: req.user._id });
    await ActivityLog.create({ user: req.user._id, action: 'Announcement Posted', module: 'Announcements', details: ann.title });
    ok(res, ann, 'Announcement posted');
  } catch (e) { err(res, e.message); }
});

router.delete('/announcements/:id', auth, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    ok(res, null, 'Announcement deleted');
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// TRANSPORT
// ════════════════════════════════════════════════════════════════
router.get('/transport/routes', auth, async (req, res) => {
  try {
    const routes = await TransportRoute.find({ isActive: true }).sort({ routeNo: 1 });
    ok(res, routes);
  } catch (e) { err(res, e.message); }
});

router.post('/transport/routes', adminOnly, async (req, res) => {
  try {
    const route = await TransportRoute.create(req.body);
    ok(res, route, 'Route created');
  } catch (e) { err(res, e.message); }
});

router.put('/transport/routes/:id', adminOnly, async (req, res) => {
  try {
    const route = await TransportRoute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    ok(res, route, 'Route updated');
  } catch (e) { err(res, e.message); }
});

router.get('/transport/assignments', auth, async (req, res) => {
  try {
    const assignments = await TransportAssignment.find()
      .populate('student', 'name rollNo standard section')
      .populate('route', 'routeNo name');
    ok(res, assignments);
  } catch (e) { err(res, e.message); }
});

router.post('/transport/assign', adminOnly, async (req, res) => {
  try {
    const a = await TransportAssignment.findOneAndUpdate(
      { student: req.body.studentId },
      { student: req.body.studentId, route: req.body.routeId, stop: req.body.stop, fare: req.body.fare },
      { upsert: true, new: true }
    );
    ok(res, a, 'Student assigned to route');
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// LEAVE MANAGEMENT
// ════════════════════════════════════════════════════════════════
router.get('/leaves', auth, async (req, res) => {
  try {
    const { status, role } = req.query;
    const q = {};
    if (status) q.status = status;
    if (role) q.role = role;
    // teachers can only see own leaves
    if (req.user.role === 'Teacher') q.applicant = req.user._id;
    const leaves = await Leave.find(q)
      .populate('applicant', 'name role')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });
    ok(res, leaves);
  } catch (e) { err(res, e.message); }
});

router.post('/leaves', auth, async (req, res) => {
  try {
    const from = new Date(req.body.from);
    const to = new Date(req.body.to);
    const days = Math.ceil((to - from) / 86400000) + 1;
    const leave = await Leave.create({ ...req.body, applicant: req.user._id, role: req.user.role, days });
    ok(res, leave, 'Leave application submitted');
  } catch (e) { err(res, e.message); }
});

router.put('/leaves/:id', auth, async (req, res) => {
  try {
    const { status, reviewNote } = req.body;
    const leave = await Leave.findByIdAndUpdate(req.params.id,
      { status, reviewNote, reviewedBy: req.user._id }, { new: true }
    );
    await ActivityLog.create({ user: req.user._id, action: `Leave ${status}`, module: 'Leave', details: `Leave for ${leave.days} days` });
    ok(res, leave, `Leave ${status}`);
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// PAYROLL
// ════════════════════════════════════════════════════════════════
router.get('/payroll', adminOnly, async (req, res) => {
  try {
    const { month, teacherId } = req.query;
    const q = {};
    if (month) q.month = month;
    if (teacherId) q.teacher = teacherId;
    const records = await Payroll.find(q)
      .populate('teacher', 'name teacherId department designation')
      .sort({ month: -1, createdAt: -1 });
    ok(res, records);
  } catch (e) { err(res, e.message); }
});

router.post('/payroll/generate', adminOnly, async (req, res) => {
  try {
    const { month } = req.body;
    const teachers = await Teacher.find({ isActive: true });
    const ops = teachers.map(t => ({
      updateOne: {
        filter: { teacher: t._id, month },
        update: {
          $setOnInsert: {
            teacher: t._id, month,
            basicSalary: t.salary || 40000,
            allowances: 5000, deductions: 2000,
            netSalary: (t.salary || 40000) + 5000 - 2000,
            status: 'Pending',
          }
        },
        upsert: true,
      },
    }));
    await Payroll.bulkWrite(ops);
    ok(res, null, `Payroll generated for ${month}`);
  } catch (e) { err(res, e.message); }
});

router.put('/payroll/:id/pay', adminOnly, async (req, res) => {
  try {
    const p = await Payroll.findByIdAndUpdate(req.params.id,
      { status: 'Paid', paidDate: new Date() }, { new: true }
    );
    await ActivityLog.create({ user: req.user._id, action: 'Salary Paid', module: 'Payroll', details: `Payroll ID ${p._id}` });
    ok(res, p, 'Salary marked as paid');
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// ACTIVITY LOGS
// ════════════════════════════════════════════════════════════════
router.get('/logs', adminOnly, async (req, res) => {
  try {
    const { module, page = 1, limit = 30 } = req.query;
    const q = module ? { module } : {};
    const [logs, total] = await Promise.all([
      ActivityLog.find(q).populate('user', 'name role')
        .sort({ createdAt: -1 }).skip((page - 1) * limit).limit(+limit),
      ActivityLog.countDocuments(q),
    ]);
    ok(res, { logs, total, pages: Math.ceil(total / limit) });
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// TALENT TESTS
// ════════════════════════════════════════════════════════════════
router.get('/talent', auth, async (req, res) => {
  try {
    const { standard } = req.query;
    const q = standard ? { standard } : {};
    const tests = await TalentTest.find(q).populate('createdBy', 'name').sort({ date: 1 });
    ok(res, tests);
  } catch (e) { err(res, e.message); }
});

router.post('/talent', auth, async (req, res) => {
  try {
    const test = await TalentTest.create({ ...req.body, createdBy: req.user._id });
    ok(res, test, 'Talent test created');
  } catch (e) { err(res, e.message); }
});

router.get('/talent/:id', auth, async (req, res) => {
  try {
    // For students — send without answers
    const test = await TalentTest.findById(req.params.id).populate('createdBy', 'name');
    if (!test) return err(res, 'Test not found', 404);
    if (req.user.role === 'Student') {
      const sanitized = test.toObject();
      sanitized.questions = sanitized.questions.map(q => ({ ...q, answer: undefined }));
      return ok(res, sanitized);
    }
    ok(res, test);
  } catch (e) { err(res, e.message); }
});

// ════════════════════════════════════════════════════════════════
// REPORTS & ANALYTICS
// ════════════════════════════════════════════════════════════════
router.get('/reports/overview', auth, async (req, res) => {
  try {
    // Monthly attendance trend
    const attTrend = await Attendance.aggregate([
      {
        $group: {
          _id: { month: { $dateToString: { format: '%Y-%m', date: '$date' } }, status: '$status' },
          count: { $sum: 1 },
        }
      },
      { $sort: { '_id.month': 1 } }, { $limit: 24 },
    ]);

    // Fee collection trend
    const feeTrend = await Fee.aggregate([
      { $match: { status: 'Paid', paidDate: { $ne: null } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$paidDate' } }, total: { $sum: '$paidAmount' } } },
      { $sort: { _id: 1 } }, { $limit: 6 },
    ]);

    // Grade distribution
    const gradeDist = await Result.aggregate([
      { $group: { _id: '$grade', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // Students per class
    const classStrength = await Class.aggregate([
      { $project: { name: 1, count: { $size: '$students' } } },
      { $sort: { name: 1 } },
    ]);

    ok(res, { attTrend, feeTrend, gradeDist, classStrength });
  } catch (e) { err(res, e.message); }
});


// ════════════════════════════════════════════════════════════════
// PRINCIPAL DASHBOARD API
// ════════════════════════════════════════════════════════════════
router.get('/dashboard/principal', auth, async (req, res) => {
  try {
    // 1. Security Check: Only Admin and Principal can access this
    if (req.user.role !== 'Principal' && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Management only.' });
    }

    // 2. Fetch basic counts and recent announcements simultaneously
    const [totalStudents, totalTeachers, totalClasses, recentAnnouncements] = await Promise.all([
      Student.countDocuments({ isActive: true }),
      Teacher.countDocuments({ isActive: true }),
      Class.countDocuments(),
      Announcement.find().sort({ createdAt: -1 }).limit(5) // Get latest 5 notices
    ]);

    // 3. Calculate Overall Attendance Percentage for Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const attAgg = await Attendance.aggregate([
      { $match: { date: { $gte: today } } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ['$status', 'Present'] }, 1, 0] } }
        }
      }
    ]);
    const attendancePct = attAgg[0] ? Math.round((attAgg[0].present / attAgg[0].total) * 100) : 0;

    // 4. Calculate Total Fees Collected
    const feeAgg = await Fee.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$paidAmount' } } },
    ]);
    const feeCollected = feeAgg[0]?.total || 0;

    // 5. Send it all back to the frontend
    ok(res, {
      totalStudents,
      totalTeachers,
      totalClasses,
      attendancePct,
      feeCollected,
      recentAnnouncements
    });

  } catch (e) {
    err(res, e.message);
  }
});
// ════════════════════════════════════════════════════════════════
// ADMIN DIRECT USER CREATION (Instant Reflection)
// ════════════════════════════════════════════════════════════════
router.post('/auth/register', adminOnly, async (req, res) => {
  try {
    const { role, name, email, mobile, address, profilePhotoUrl, classId } = req.body;

    // 1. Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'User already exists' });

    // 2. Create the permanent login account
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Welcome@123", salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isFirstLogin: true
    });

    // 3. Create the specific profile (Student or Teacher)
    if (role === 'Student') {
      const generatedRollNo = await generateSequentialId(Student, 'S', 'rollNo');
      const newStudent = await Student.create({
        name,
        email,
        user: newUser._id,
        rollNo: req.body.rollNo || generatedRollNo,
        classId: classId,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        gender: req.body.gender,
        house: req.body.house,
        dob: req.body.dob,
        phone: mobile,
        address: address,
        profilePhotoUrl: profilePhotoUrl,
        isActive: true
      });

      // 🚀 4. LINK STUDENT TO CLASS: Push student ID into the Class's student array
      if (classId) {
        await Class.findByIdAndUpdate(classId, {
          $push: { students: newStudent._id }
        });
      }
    } // <--- THIS BRACKET WAS MISSING!
    else if (role === 'Teacher') {
      const generatedTeacherId = await generateSequentialId(Teacher, 'T', 'teacherId');
      await Teacher.create({
        name,
        email,
        user: newUser._id,
        teacherId: req.body.teacherId || generatedTeacherId,
        department: req.body.department,
        qualification: req.body.qualification,
        experience: req.body.experience,
        salary: req.body.salary,
        phone: mobile,
        address: address,
        profilePhotoUrl: profilePhotoUrl,
        isActive: true
      });
    }

    // 5. Log the action for the Admin audit trail
    await ActivityLog.create({
      user: req.user._id,
      action: `Created ${role}`,
      module: 'Auth',
      details: `Admin manually created ${role}: ${name}`
    });

    res.json({ success: true, message: `${role} created and successfully linked to lists!` });

  } catch (e) {
    console.error("❌ User Creation Error:", e);
    res.status(500).json({ success: false, message: e.message });
  }
});


// ════════════════════════════════════════════════════════════════
// 🎓 STUDENT PORTAL ROUTES
// ════════════════════════════════════════════════════════════════

// 🟢 SUPER-FINDER: Guarantees we find the Student Profile
const getStudent = async (req) => {
  const userId = req.user.id || req.user._id;
  
  let student = await Student.findOne({ user: userId }).populate('classId', 'name standard section');
  if (student) return student;

  student = await Student.findById(userId).populate('classId', 'name standard section');
  if (student) return student;

  const userAccount = await User.findById(userId);
  if (userAccount && userAccount.email) {
    student = await Student.findOne({ email: userAccount.email }).populate('classId', 'name standard section');
    if (student) return student;
  }
  return null;
};

// 1. GET PROFILE
router.get('/student/profile', auth, async (req, res) => {
  try {
    const student = await getStudent(req);
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found.' });
    res.json({ success: true, data: student });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// 2. GET DASHBOARD STATS
router.get('/student/dashboard/stats', auth, async (req, res) => {
  try {
    const student = await getStudent(req);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const totalAtt = await Attendance.countDocuments({ student: student._id });
    const presentAtt = await Attendance.countDocuments({ student: student._id, status: 'Present' });
    const attendancePct = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 0;
    const attendanceHistory = await Attendance.find({ student: student._id }).sort({ date: -1 }).limit(15);
    const latestResult = await Result.findOne({ student: student._id }).sort({ createdAt: -1 });
    const upcomingExams = await Exam.countDocuments({ standard: student.standard, date: { $gte: new Date() } });

    let pendingHW = 0;
    if (student.classId) {
      const totalHW = await Homework.countDocuments({ classId: student.classId });
      const submittedHW = await Homework.countDocuments({ classId: student.classId, 'submissions.student': student._id });
      pendingHW = Math.max(0, totalHW - submittedHW);
    }

    // 🟢 BULLETPROOF FEE CALCULATION (Checks both old and new fee systems)
    let feeDue = 0;
    
    // Check old Fee model
    try {
      const oldFees = await Fee.find({ student: student._id, status: { $in: ['Pending', 'Overdue', 'Partial'] } });
      feeDue += oldFees.reduce((sum, f) => sum + ((Number(f.amount) || 0) - (Number(f.paidAmount) || 0)), 0);
    } catch(e) {}

    // Check new FeeStructure & FeePayment model
    try {
      const FeeStructure = mongoose.model('FeeStructure');
      const FeePayment = mongoose.model('FeePayment');
      const structures = await FeeStructure.find({ standard: student.standard });
      const payments = await FeePayment.find({ studentId: student._id });
      
      structures.forEach(s => {
        const paid = payments
          .filter(p => p.feeStructureId.toString() === s._id.toString())
          .reduce((sum, p) => sum + p.amountPaid + (p.discount || 0), 0);
        if (s.amount - paid > 0) feeDue += (s.amount - paid);
      });
    } catch(e) {}

    res.json({
      success: true,
      data: { totalDays: totalAtt, presentDays: presentAtt, attendancePct, attendanceHistory, latestResult: latestResult ? latestResult.grade : 'N/A', upcomingExams, pendingHW, feeDue }
    });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.get('/student/dashboard/activity', auth, async (req, res) => {
  try {
    const student = await getStudent(req);
    if (!student) return res.json({ success: true, data: [] });

    const notices = await Announcement.find({ audience: { $in: ['All', 'Student'] } }).sort({ createdAt: -1 }).limit(3);
    const results = await Result.find({ student: student._id }).populate('exam', 'name').sort({ createdAt: -1 }).limit(2);

    const activities = [
      ...notices.map(n => ({ type: 'notice', text: `New Notice: ${n.title}`, time: new Date(n.createdAt).toLocaleDateString() })),
      ...results.map(r => ({ type: 'exam', text: `Result Published: ${r.exam?.name} (${r.grade})`, time: new Date(r.createdAt).toLocaleDateString() }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

    res.json({ success: true, data: activities });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});
// 4. GET MY FEES
router.get('/student/my-fees', auth, async (req, res) => {
  try {
    const student = await getStudent(req);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    
    let feesList = [];

    // 🟢 BULLETPROOF FETCH 1: New FeeStructure System
    try {
      const FeeStructure = mongoose.model('FeeStructure');
      const FeePayment = mongoose.model('FeePayment');
      const structures = await FeeStructure.find({ standard: student.standard }).sort({ dueDate: -1 });
      const payments = await FeePayment.find({ studentId: student._id });

      if (structures.length > 0) {
        const newSystemFees = structures.map(s => {
          const paid = payments
            .filter(p => p.feeStructureId.toString() === s._id.toString())
            .reduce((sum, p) => sum + p.amountPaid + (p.discount || 0), 0);

          const balance = s.amount - paid;
          let status = 'Pending';
          if (balance <= 0) status = 'Paid';
          else if (paid > 0) status = 'Partial';
          else if (new Date(s.dueDate) < new Date()) status = 'Overdue';

          return {
            _id: s._id,
            feeType: s.title || s.feeType || 'Class Fee',
            amount: s.amount,
            dueDate: s.dueDate,
            paidAmount: paid,
            balance: balance,
            status: status
          };
        });
        feesList = [...feesList, ...newSystemFees];
      }
    } catch(e) { console.log("FeeStructure check skipped"); }

    // 🟢 BULLETPROOF FETCH 2: Old Manual Fee System
    try {
      const oldFees = await Fee.find({ student: student._id }).sort({ dueDate: -1 });
      if (oldFees.length > 0) {
        const manualFees = oldFees.map(f => {
          const amount = Number(f.amount) || 0;
          const paid = Number(f.paidAmount) || 0;
          return {
            _id: f._id,
            feeType: f.feeType || 'Manual Fee',
            amount: amount,
            dueDate: f.dueDate,
            paidAmount: paid,
            balance: amount - paid,
            status: f.status
          };
        });
        feesList = [...feesList, ...manualFees];
      }
    } catch(e) { console.log("Old Fee check skipped"); }

    res.json({ success: true, data: feesList }); 
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});
// 3. GET RECENT ACTIVITY



// 5. GET MY RESULTS
router.get('/student/my-results', auth, async (req, res) => {
  try {
    const student = await getStudent(req);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    const results = await Result.find({ student: student._id }).populate('exam', 'name subject totalMarks').sort({ createdAt: -1 });
    res.json({ success: true, data: results });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// Make sure this is still at the very bottom!
// export default router;

export default router;