// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const apiRoutes = require('./routes/index.js'); 
// // import PendingRegistration from './models/PendingRegistration.js';

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✓ Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// app.get('/', (req, res) => {
//   res.send('Abhyaas ERP Backend API is running!');
// });

// // ─── 1. LOGIN ROUTE ───
// app.post('/api/auth/login', (req, res) => {
//   const { email, password } = req.body;
//   const secretKey = process.env.JWT_SECRET || 'my_fallback_secret_key';

//   if (email === 'admin@abhyaas.in' && password === 'admin123') {
//     const user = { _id: 'admin_id_123', role: 'Admin', name: 'Admin User', email };
//     const token = jwt.sign(user, secretKey, { expiresIn: '1d' });
//     return res.json({ success: true, message: "Login successful!", user, token });
//   }

//   if (email === 'principal@abhyaas.in' && password === 'principal123') {
//     const user = { _id: 'principal_id_123', role: 'Principal', name: 'Principal User', email };
//     const token = jwt.sign(user, secretKey, { expiresIn: '1d' });
//     return res.json({ success: true, message: "Login successful!", user, token });
//   }

//   return res.status(401).json({ success: false, message: "Invalid credentials" });
// });

// // ─── 2. REGISTRATION ROUTE ───
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const PendingRegistration = require('./models/PendingRegistration');

//     const newReg = await PendingRegistration.create({
//       ...req.body,
//       status: 'Pending' 
//     });

//     return res.json({ 
//       success: true, 
//       message: "Registration submitted successfully! Please wait for Admin approval." 
//     });
//   } catch (error) {
//     console.error("Registration Error:", error);
//     return res.status(500).json({ 
//       success: false, 
//       message: "Failed to register. " + error.message 
//     });
//   }
// });

// // ─── 3. CONNECT ALL OTHER ROUTES (Students, Teachers, etc.) ───
// app.use('/api', apiRoutes);

// // ─── 4. CATCH-ALL ROUTE (Must be absolutely last!) ───
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'API route not found' });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

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
// Import your routes and models
import apiRoutes from './routes/index.js';
import { PendingRegistration, User, Student, Teacher, Class, CentralAuth } from './models/index.js';
import inventoryRoutes from './routes/inventoryRoutes.js'; // Note the .js at the end
import registrationRoutes from './routes/registrationRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Abhyaas ERP Backend API is running!');
});

// ─── 1. REAL DATABASE LOGIN ROUTE (Multi-tenant) ───
// ─── 1. REAL DATABASE LOGIN ROUTE (Multi-tenant) ───
// ─── 1. REAL DATABASE LOGIN ROUTE (Multi-tenant) ───
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

    // 3. FIX #1: THE GOOD SOLUTION: Search all profile collections!
    const db = mongoose.connection.db;
    const refId = new mongoose.Types.ObjectId(authRecord.userRef);

    // Check Students, then Teachers, then old Users, then Tenant users
    let user = await db.collection('students').findOne({ _id: refId });
    if (!user) user = await db.collection('teachers').findOne({ _id: refId });
    if (!user) user = await db.collection('abhyaas_users').findOne({ _id: refId });
    if (!user) user = await db.collection(`${authRecord.tenantId}_users`).findOne({ _id: refId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User profile not found" });
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

    // 1. Generate the new Multi-Tenant Login ID
    let prefix = 'AB-USR';
    if (role === 'Admin') prefix = 'AB-ADM';
    else if (role === 'Teacher') prefix = 'AB-EMP';
    else if (role === 'Student') prefix = 'AB-STD';

    // Find the last created user with this prefix to get the next number
    const lastAuth = await CentralAuth.findOne({ loginId: new RegExp(`^${prefix}`) }).sort({ _id: -1 });
    let seq = 1;
    if (lastAuth && lastAuth.loginId) {
      const match = lastAuth.loginId.match(/\d+$/);
      if (match) seq = parseInt(match[0], 10) + 1;
    }
    const newLoginId = `${prefix}-${seq.toString().padStart(3, '0')}`; // e.g., AB-STD-001

    // Hash the default password
    const hashedPassword = await bcrypt.hash('Welcome@123', 10);

    let profile = null;

    // 2. Create the role-specific profile (Keeping your original logic!)
    if (role === 'Student') {
      const rollNo = await generateSequentialId(Student, 'S', 'rollNo');
      profile = await Student.create({
        name, email: email.toLowerCase(), phone: mobile || '', address: address || '',
        gender: gender || 'Male', bloodGroup: bloodGroup || '', parentName: parentName || '',
        parentPhone: parentPhone || '', house: house || 'Red House',
        admissionDate: admissionDate ? new Date(admissionDate) : new Date(),
        classId: classId || null, rollNo, feeStatus: 'Pending',
        profilePhotoUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '',
        isActive: true,
      });

      if (classId) {
        await Class.findByIdAndUpdate(classId, { $push: { students: profile._id } });
      }

    } else if (role === 'Teacher') {
      const autoTeacherId = teacherId || await generateSequentialId(Teacher, 'T', 'teacherId');
      profile = await Teacher.create({
        name, email: email.toLowerCase(), phone: mobile || '', teacherId: autoTeacherId,
        designation: designation || '', department: department || '', qualification: qualification || '',
        experience: experience ? Number(experience) : 0, salary: salary ? Number(salary) : 0,
        subjects: subjects || [],
        profilePhotoUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '',
        isActive: true,
      });
    } else {
      // Fallback for Admins/Principals
      profile = await User.create({ name, email: email.toLowerCase(), role, isActive: true });
    }

    // 3. THE MAGIC STEP: Create the CentralAuth Master Key
    await CentralAuth.create({
      loginId: newLoginId,
      password: hashedPassword,
      tenantId: 'abhyaas', // Automatically assigns them to your school
      role: role,
      userRef: profile._id
    });

    // 4. Send the exact Login ID back to your screen!
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


// ... under your existing app.use calls:
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
// Add this where your other routes are

app.use('/api/inventory', inventoryRoutes); // Now your frontend can hit /api/inventory!

app.use('/api/principal', principalRoutes);
// app.use('/api', apiRoutes); // Your existing routes
app.use('/api/registrations', registrationRoutes);
app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});
app.use('/uploads', express.static('uploads'));
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});