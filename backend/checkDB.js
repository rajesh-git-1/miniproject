import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection.db;
const students = await db.collection('students').find({ name: /purna/i }).toArray();
console.log(JSON.stringify(students, null, 2));
process.exit(0);
