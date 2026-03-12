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
import { PendingRegistration, User, Student, Teacher, Class } from './models/index.js';
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

// ─── 1. REAL DATABASE LOGIN ROUTE ───
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const secretKey = process.env.JWT_SECRET || 'my_fallback_secret_key';

    // 1. Find the user in the real database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 2. Check if the password matches the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 3. Generate a token using their REAL MongoDB _id
    const token = jwt.sign(
      { _id: user._id, role: user.role, name: user.name, email: user.email },
      secretKey,
      { expiresIn: '1d' }
    );

    return res.json({ success: true, message: "Login successful!", user, token });
  } catch (error) {
    console.error("Login Error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: error.message || "Server error during login" });
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

// ─── 3. ADMIN USER CREATION ROUTE (Bypasses Pending — Creates permanently) ───
app.post('/api/admin/users/create', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { role, name, email, mobile, address, classId,
      // Student fields
      parentName, parentPhone, gender, dob, bloodGroup, house, admissionDate,
      // Teacher fields
      teacherId, qualification, department, experience, joiningDate, salary, designation, subjects
    } = req.body;

    if (!name || !email || !role || !mobile || !address) {
      return res.status(400).json({ success: false, message: 'All basic fields are required.' });
    }
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Mobile number must be exactly 10 digits.' });
    }

    if (role === 'Student') {
      if (!classId || !parentName || !gender || !dob || !admissionDate) {
        return res.status(400).json({ success: false, message: 'All student fields are required.' });
      }
      if (parentPhone && !/^\d{10}$/.test(parentPhone)) {
        return res.status(400).json({ success: false, message: 'Parent phone must be exactly 10 digits.' });
      }
    } else if (role === 'Teacher') {
      if (!qualification || !department || experience === undefined || !joiningDate) {
        return res.status(400).json({ success: false, message: 'All teacher fields are required.' });
      }
    }

    // Check for duplicate email in User collection
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A user with this email already exists.' });
    }

    // Hash the default password
    const hashedPassword = await bcrypt.hash('Welcome@123', 10);

    // 1. Create User (auth/login record)
    const authUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      isActive: true,
    });

    let profile = null;

    // 2. Create the role-specific profile
    if (role === 'Student') {
      // Look up the class to get standard & section strings
      let standard = '';
      let section = '';
      let resolvedClassId = classId || null;

      if (classId) {
        const classDoc = await Class.findById(classId);
        if (classDoc) {
          standard = classDoc.standard || '';
          section = classDoc.section || '';
        }
      }

      // Auto-generate unique roll number
      const rollNo = await generateSequentialId(Student, 'S', 'rollNo');

      profile = await Student.create({
        name,
        email: email.toLowerCase(),
        phone: mobile || '',           // mobile → phone field mapping
        address: address || '',
        gender: gender || 'Male',
        bloodGroup: bloodGroup || '',
        parentName: parentName || '',
        parentPhone: parentPhone || '',
        house: house || 'Red House',
        admissionDate: admissionDate ? new Date(admissionDate) : new Date(),
        classId: resolvedClassId,
        standard,
        section,
        rollNo,
        feeStatus: 'Pending',
        profilePhotoUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '',
        isActive: true,
      });

      // 3. Push student into the Class's students array
      if (resolvedClassId) {
        await Class.findByIdAndUpdate(resolvedClassId, {
          $push: { students: profile._id }
        });
      }

    } else if (role === 'Teacher') {
      const autoTeacherId = teacherId || await generateSequentialId(Teacher, 'T', 'teacherId');

      profile = await Teacher.create({
        name,
        email: email.toLowerCase(),
        phone: mobile || '',           // mobile → phone field mapping
        teacherId: autoTeacherId,
        designation: designation || '',
        department: department || '',
        qualification: qualification || '',
        experience: experience ? Number(experience) : 0,
        salary: salary ? Number(salary) : 0,
        subjects: subjects || [],
        profilePhotoUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '',
        isActive: true,
      });
    }

    return res.json({
      success: true,
      message: `${role} account created successfully! Default password: Welcome@123`,
      data: { user: authUser, profile }
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