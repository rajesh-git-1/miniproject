import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import { upload, uploadToS3 } from './utils/s3Upload.js';

const generateSequentialId = async (Model, prefix, fieldName) => {
  const lastDoc = await Model.findOne({}, { [fieldName]: 1 }).sort({ _id: -1 });
  if (!lastDoc || !lastDoc[fieldName]) return `${prefix}-1001`;
  const match = lastDoc[fieldName].match(/\d+$/);
  if (match) return `${prefix}-${parseInt(match[0], 10) + 1}`;
  return `${prefix}-1001`;
};

import principalRoutes from './routes/principal.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import marksRoutes from './routes/marksRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import apiRoutes from './routes/index.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import studentDashboardRoutes from './routes/student.js';

import { PendingRegistration, User, Student, Teacher, Class, CentralAuth, Attendance, Fee } from './models/index.js';
import FeePayment from './models/FeePayment.js';
import FeeStructure from './models/FeeStructure.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('✓ Connected to MongoDB Cluster Efficiently'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

mongoose.connection.on('error', err => {
  console.error('MongoDB runtime error:', err);
});

app.get('/', (req, res) => {
  res.send('Abhyaas ERP Backend API is running!');
});

app.get('/api/debug/purna', async (req, res) => {
  try {
    const student = await mongoose.models.Student.findOne({ name: /purna/i }).lean();
    const reg = await mongoose.models.Registration.findOne({ name: /purna/i }).lean();
    res.json({ student, reg });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 🟢 GLOBAL S3 UPLOAD ROUTE
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const fileUrl = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
    res.json({ success: true, url: fileUrl });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ success: false, message: 'File upload failed' });
  }
});

// 🟢 INTERNAL HELPERS for Attendance Marking screen
const getStudentProfileForAttendance = async (studentId) => {
  return await Student.findById(studentId).populate('classId', 'name standard section');
};

// ===================================================================
// 4. GET CLASS TREND (For the 7-day Bar Chart & Monthly Avg)
// ===================================================================
app.get('/api/attendance/trend', async (req, res) => {
  try {
    const { classId, date } = req.query;
    if (!classId) return res.status(400).json({ success: false, message: 'Class ID required' });

    const endDate = date ? new Date(date) : new Date();

    // Calculate Monthly Average (Last 30 days)
    const thirtyDaysAgo = new Date(endDate);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Fetch all records for this class from the last 30 days
    const monthlyRecords = await Attendance.find({
      classId: classId,
      date: { $gte: thirtyDaysAgo, $lte: endDate }
    });

    let totalMonthlyPresent = 0;
    monthlyRecords.forEach(r => { if (r.status === 'Present') totalMonthlyPresent++; });
    const monthlyAverage = monthlyRecords.length > 0
      ? Math.round((totalMonthlyPresent / monthlyRecords.length) * 100)
      : 0;

    // Calculate 7-Day Trend
    const trend = [];
    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date(endDate);
      targetDate.setDate(targetDate.getDate() - i);

      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

      const dailyRecords = monthlyRecords.filter(r =>
        new Date(r.date) >= startOfDay && new Date(r.date) <= endOfDay
      );

      let dailyPresent = 0;
      dailyRecords.forEach(r => { if (r.status === 'Present') dailyPresent++; });

      const dailyPct = dailyRecords.length > 0
        ? Math.round((dailyPresent / dailyRecords.length) * 100)
        : 0;

      trend.push({
        date: startOfDay.toISOString().split('T')[0],
        percentage: dailyPct
      });
    }

    res.json({
      success: true,
      data: { monthlyAverage, trend }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error fetching trend' });
  }
});

// ===================================================================
// 5. GET SINGLE STUDENT STATS (For the green bar under their name)
// ===================================================================
app.get('/api/attendance/student-stats/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find all attendance records for this specific student, sorted by date DESC
    const records = await Attendance.find({ student: studentId }).sort({ date: -1 });

    if (records.length === 0) {
      return res.json({ success: true, data: { percentage: 0, totalDays: 0, presentDays: 0, attendanceHistory: [] } });
    }

    let presentCount = 0;
    records.forEach(r => { if (r.status === 'Present') presentCount++; });

    const percentage = Math.round((presentCount / records.length) * 100);

    res.json({
      success: true,
      data: {
        percentage,
        totalDays: records.length,
        presentDays: presentCount,
        attendanceHistory: records
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error fetching student stats' });
  }
});

// ─── 1. REAL DATABASE LOGIN ROUTE (Multi-tenant) ───
app.post('/api/auth/login', async (req, res) => {
  try {
    const { loginId, password } = req.body;
    console.log(`🔍 LOGIN ATTEMPT: Trying to find ID: "${loginId}"`);
    if (!loginId || !password) {
      return res.status(400).json({ success: false, message: "Login ID and password required" });
    }

    const secretKey = process.env.JWT_SECRET || 'my_fallback_secret_key';

    // 1. Find in CentralAuth
    const authRecord = await CentralAuth.findOne({ loginId });
    if (!authRecord) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, authRecord.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 3. Search all profile collections
    const db = mongoose.connection.db;
    const refId = new mongoose.Types.ObjectId(authRecord.userRef);

    let user = await db.collection('students').findOne({ _id: refId });
    if (!user) user = await db.collection('teachers').findOne({ _id: refId });
    if (!user) user = await db.collection('abhyaas_users').findOne({ _id: refId });
    if (!user) user = await db.collection(`${authRecord.tenantId}_users`).findOne({ _id: refId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User profile not found" });
    }

    // 🟢 SYNC TRIGGER: Reconcile fees on every login for students
    if (authRecord.role === 'Student') {
      await reconcileStudentFeeStatus(user._id);
    }

    // 4. Generate Token
    const token = jwt.sign(
      {
        _id: user._id,
        tenantId: authRecord.tenantId,
        role: authRecord.role,
        name: user.name,
        email: user.email
      },
      secretKey,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: authRecord.role,
        tenantId: authRecord.tenantId,
        profilePhotoUrl: user.profilePhotoUrl || ''
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// ─── 2. PUBLIC REGISTRATION ROUTE (Goes to Pending) ───
app.post('/api/public/register', async (req, res) => {
  try {
    const newReg = await PendingRegistration.create({
      ...req.body,
      status: 'Pending'
    });
    return res.json({ success: true, message: "Registration submitted successfully! Please wait for Admin approval." });
  } catch (error) {
    console.error("Public Registration Error:", error);
    return res.status(500).json({ success: false, message: "Failed to register. " + error.message });
  }
});

// ─── 3. ADMIN USER CREATION ROUTE (Multi-Tenant Upgraded) ───
app.post('/api/admin/users/create', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { role, name, email, mobile, address, classId,
      parentName, parentPhone, gender, dob, bloodGroup, house, admissionDate,
      teacherId, qualification, department, experience, joiningDate, salary, designation, subjects
    } = req.body;

    if (!name || !email || !role || !mobile || !address) {
      return res.status(400).json({ success: false, message: 'All basic fields are required.' });
    }

    let prefix = 'AB-USR';
    if (role === 'Admin') prefix = 'AB-ADM';
    else if (role === 'Teacher') prefix = 'AB-EMP';
    else if (role === 'Student') prefix = 'AB-STD';

    const lastAuth = await CentralAuth.findOne({ loginId: new RegExp(`^${prefix}`) }).sort({ _id: -1 });
    let seq = 1;
    if (lastAuth && lastAuth.loginId) {
      const match = lastAuth.loginId.match(/\d+$/);
      if (match) seq = parseInt(match[0], 10) + 1;
    }
    const newLoginId = `${prefix}-${seq.toString().padStart(3, '0')}`;

    const hashedPassword = await bcrypt.hash('Welcome@123', 10);
    let profile = null;

    if (role === 'Student') {
      const rollNo = await generateSequentialId(Student, 'S', 'rollNo');

      let standard = req.body.standard || '';
      let section = req.body.section || 'A';

      if (classId) {
        const classDoc = await Class.findById(classId);
        if (classDoc) {
          standard = classDoc.standard;
          section = classDoc.section;
        }
      }

      let s3PhotoUrl = '';
      if (req.file) {
        s3PhotoUrl = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
      }

      profile = await Student.create({
        name, email: email.toLowerCase(), phone: mobile || '', address: address || '',
        gender: gender || 'Male', bloodGroup: bloodGroup || '', parentName: parentName || '',
        parentPhone: parentPhone || '', house: house || 'Red House',
        admissionDate: admissionDate ? new Date(admissionDate) : new Date(),
        classId: classId || null,
        standard,
        section,
        rollNo, feeStatus: 'Pending',
        profilePhotoUrl: req.body.profilePhotoUrl || s3PhotoUrl,
        isActive: true,
      });

      if (classId) {
        await Class.findByIdAndUpdate(classId, { $addToSet: { students: profile._id } });
      }

    } else if (role === 'Teacher') {
      let s3PhotoUrl = '';
      if (req.file) {
        s3PhotoUrl = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
      }
      const autoTeacherId = teacherId || await generateSequentialId(Teacher, 'T', 'teacherId');
      profile = await Teacher.create({
        name, email: email.toLowerCase(), phone: mobile || '', teacherId: autoTeacherId,
        designation: designation || '', department: department || '', qualification: qualification || '',
        experience: experience ? Number(experience) : 0, salary: salary ? Number(salary) : 0,
        subjects: subjects || [],
        profilePhotoUrl: req.body.profilePhotoUrl || s3PhotoUrl,
        isActive: true,
      });
    } else {
      profile = await User.create({ name, email: email.toLowerCase(), role, isActive: true });
    }

    await CentralAuth.create({
      loginId: newLoginId,
      password: hashedPassword,
      tenantId: 'abhyaas',
      role: role,
      userRef: profile._id
    });

    return res.json({
      success: true,
      message: `${role} created successfully! Login ID: ${newLoginId} | Password: Welcome@123`,
      data: { profile }
    });

  } catch (error) {
    console.error('User Creation Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ===================================================================
// 4. GET CLASS TREND (For the 7-day Bar Chart & Monthly Avg)
// ===================================================================
app.get('/api/attendance/trend', async (req, res) => {
  try {
    const { classId, date } = req.query;
    if (!classId) return res.status(400).json({ success: false, message: 'Class ID required' });

    const endDate = date ? new Date(date) : new Date();

    // Calculate Monthly Average (Last 30 days)
    const thirtyDaysAgo = new Date(endDate);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Fetch all records for this class from the last 30 days
    const monthlyRecords = await Attendance.find({
      classId: classId,
      date: { $gte: thirtyDaysAgo, $lte: endDate }
    });

    let totalMonthlyPresent = 0;
    monthlyRecords.forEach(r => { if (r.status === 'Present') totalMonthlyPresent++; });
    const monthlyAverage = monthlyRecords.length > 0
      ? Math.round((totalMonthlyPresent / monthlyRecords.length) * 100)
      : 0;

    // Calculate 7-Day Trend
    const trend = [];
    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date(endDate);
      targetDate.setDate(targetDate.getDate() - i);

      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

      const dailyRecords = monthlyRecords.filter(r =>
        new Date(r.date) >= startOfDay && new Date(r.date) <= endOfDay
      );

      let dailyPresent = 0;
      dailyRecords.forEach(r => { if (r.status === 'Present') dailyPresent++; });

      const dailyPct = dailyRecords.length > 0
        ? Math.round((dailyPresent / dailyRecords.length) * 100)
        : 0;

      trend.push({
        date: startOfDay.toISOString().split('T')[0],
        percentage: dailyPct
      });
    }

    res.json({
      success: true,
      data: { monthlyAverage, trend }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error fetching trend' });
  }
});

// ===================================================================
// 5. GET SINGLE STUDENT STATS (For the green bar under their name)
// ===================================================================
app.get('/api/attendance/student-stats/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find all attendance records for this specific student, sorted by date DESC
    const records = await Attendance.find({ student: studentId }).sort({ date: -1 });

    if (records.length === 0) {
      return res.json({ success: true, data: { percentage: 0, totalDays: 0, presentDays: 0, attendanceHistory: [] } });
    }

    let presentCount = 0;
    records.forEach(r => { if (r.status === 'Present') presentCount++; });

    const percentage = Math.round((presentCount / records.length) * 100);

    res.json({
      success: true,
      data: {
        percentage,
        totalDays: records.length,
        presentDays: presentCount,
        attendanceHistory: records
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error fetching student stats' });
  }
});

// ===================================================================
// 6. FEE RECONCILIATION HELPER
// ===================================================================
// This function ensures that student fee cards reflect actual payments
const reconcileStudentFeeStatus = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) return;

    // 1. Get all structures for this student's standard
    const structures = await FeeStructure.find({ standard: student.standard });
    if (structures.length === 0) return;

    // 2. Get all payments recorded for this student
    const payments = await FeePayment.find({ studentId });

    let totalDue = 0;
    let totalPaid = 0;

    structures.forEach(s => { totalDue += s.amount; });
    payments.forEach(p => { totalPaid += (p.amountPaid + (p.discount || 0)); });

    let newStatus = 'Pending';
    if (totalPaid >= totalDue) { newStatus = 'Paid'; }
    else if (totalPaid > 0) { newStatus = 'Partial'; }

    await Student.findByIdAndUpdate(studentId, { feeStatus: newStatus });

    // 3. Sync the legacy "Fee" model (which the Student Panel uses for its table)
    for (const s of structures) {
      const paidForThis = payments
        .filter(p => p.feeStructureId.toString() === s._id.toString())
        .reduce((sum, p) => sum + p.amountPaid + p.discount, 0);

      let status = 'Pending';
      if (paidForThis >= s.amount) status = 'Paid';
      else if (paidForThis > 0) status = 'Partial';

      await mongoose.model('Fee').findOneAndUpdate(
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
    console.error("Reconciliation error:", err);
  }
};

// Route to manually sync all students (for Admin)
app.post('/api/admin/fees/sync-all', async (req, res) => {
  try {
    const students = await Student.find({});
    for (const s of students) {
      await reconcileStudentFeeStatus(s._id);
    }
    res.json({ success: true, message: "Standardized and synced fee statuses for all students." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── ROUTER MOUNTS ───
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/principal', principalRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/student', studentDashboardRoutes);
app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});