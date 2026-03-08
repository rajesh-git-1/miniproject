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
import principalRoutes from './routes/principal.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
// Import your routes and models
import apiRoutes from './routes/index.js'; 
import { PendingRegistration, User } from './models/index.js';
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
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// ─── 2. REGISTRATION ROUTE ───
app.post('/api/auth/register', async (req, res) => {
  try {
    const newReg = await PendingRegistration.create({
      ...req.body,
      status: 'Pending' 
    });
    
    return res.json({ 
      success: true, 
      message: "Registration submitted successfully!" 
    });
  } catch (error) {
    console.error("Registration Error:", error);
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