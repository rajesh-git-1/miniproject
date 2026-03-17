// ═══════════════════════════════════════════════════════════════════
// models/index.js  — All Mongoose schemas for Abhyaas School ERP
// ═══════════════════════════════════════════════════════════════════
import mongoose from 'mongoose';
const { Schema } = mongoose;

// ─── CENTRAL AUTH (Multi-tenant directory) ──────────────────────
const CentralAuthSchema = new Schema({
  loginId: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tenantId: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Principal', 'Teacher', 'Student'], required: true },
  userRef: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true });

// ─── USER (auth base) ────────────────────────────────────────────
const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Principal', 'Teacher', 'Student', 'Parent'], required: true },
  profilePhotoUrl: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, collection: 'abhyaas_users' });

// ─── STUDENT ─────────────────────────────────────────────────────
const StudentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: { type: String },
  classId: { type: Schema.Types.ObjectId, ref: 'Class' },
  standard: { type: String },   // "10", "9" etc.
  section: { type: String },   // "A","B"
  parentName: { type: String },
  parentPhone: { type: String },
  parentEmail: { type: String },
  feeStatus: { type: String, enum: ['Paid', 'Pending', 'Partial'], default: 'Pending' },
  house: { type: String, enum: ['Red House', 'Blue House', 'Green House', 'Yellow House'], default: 'Red House' },
  admissionDate: { type: Date, default: Date.now },
  bloodGroup: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// ─── TEACHER ─────────────────────────────────────────────────────
const TeacherSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  teacherId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  designation: { type: String },
  department: { type: String },
  subjects: [{ type: String }],
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  qualification: { type: String },
  experience: { type: Number, default: 0 }, // years
  joinDate: { type: Date, default: Date.now },
  salary: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// ─── CLASS ────────────────────────────────────────────────────────
const ClassSchema = new Schema({
  name: { type: String, required: true },   // "Class 10A"
  standard: { type: String, required: true },   // "10"
  section: { type: String, required: true },   // "A"
  classTeacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  subjects: [{ type: String }],
  room: { type: String },
  capacity: { type: Number, default: 40 },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

// ─── HOUSE ────────────────────────────────────────────────────────
const HouseSchema = new Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String, required: true },
  emoji: { type: String },
}, { timestamps: true });

// ─── SUBJECT ──────────────────────────────────────────────────────
const SubjectSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  standard: { type: String },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  type: { type: String, enum: ['Theory', 'Practical', 'Both'], default: 'Theory' },
}, { timestamps: true });

// ─── ATTENDANCE ───────────────────────────────────────────────────
const AttendanceSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Late', 'Holiday'], default: 'Present' },
  markedBy: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  remarks: { type: String },
}, { timestamps: true, collection: 'abhyaas_attendance' });

// ─── EXAM ─────────────────────────────────────────────────────────
const ExamSchema = new Schema({
  name: { type: String, required: true },   // "Unit Test 1"
  type: { type: String, enum: ['Unit Test', 'Mid Term', 'Final', 'Talent Test'], default: 'Unit Test' },
  standard: { type: String },
  subject: { type: String },
  date: { type: Date, required: true },
  totalMarks: { type: Number, default: 100 },
  duration: { type: Number, default: 180 },     // minutes
  venue: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });

// ─── RESULT ───────────────────────────────────────────────────────
const ResultSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  grade: { type: String },
  remarks: { type: String },
  enteredBy: { type: Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });

// ─── TIMETABLE ────────────────────────────────────────────────────
const TimetableSchema = new Schema({
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
  periods: [{
    periodNo: Number,
    subject: String,
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    startTime: String,
    endTime: String,
    room: String,
  }],
}, { timestamps: true });

// ─── FEE ─────────────────────────────────────────────────────────
const FeeSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  feeType: { type: String, enum: ['Tuition', 'Transport', 'Library', 'Lab', 'Sports', 'Miscellaneous'], default: 'Tuition' },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paidDate: { type: Date },
  status: { type: String, enum: ['Paid', 'Pending', 'Overdue', 'Partial'], default: 'Pending' },
  paidAmount: { type: Number, default: 0 },
  receiptNo: { type: String },
  method: { type: String, enum: ['Cash', 'Online', 'Cheque', 'DD'], default: 'Cash' },
  collectedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  remarks: { type: String },
}, { timestamps: true });

// ─── HOMEWORK ─────────────────────────────────────────────────────
const HomeworkSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject: { type: String, required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  dueDate: { type: Date, required: true },
  attachmentUrl: { type: String },
  submissions: [{
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    submittedAt: { type: Date },
    fileUrl: { type: String },
    remarks: { type: String },
    grade: { type: String },
    status: { type: String, enum: ['Submitted', 'Graded', 'Late'], default: 'Submitted' },
  }],
}, { timestamps: true });

// ─── LIBRARY ──────────────────────────────────────────────────────
const LibraryBookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String },
  isbn: { type: String, unique: true },
  category: { type: String },
  publisher: { type: String },
  year: { type: Number },
  copies: { type: Number, default: 1 },
  available: { type: Number, default: 1 },
  shelfNo: { type: String },
}, { timestamps: true });

const LibraryIssueSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'LibraryBook', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  issuedDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ['Issued', 'Returned', 'Overdue'], default: 'Issued' },
  fine: { type: Number, default: 0 },
  issuedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// ─── ANNOUNCEMENT ─────────────────────────────────────────────────
const AnnouncementSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  audience: [{ type: String, enum: ['All', 'Admin', 'Teacher', 'Student', 'Parent'] }],
  priority: { type: String, enum: ['Normal', 'Important', 'Urgent'], default: 'Normal' },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date },
  attachmentUrl: { type: String },
}, { timestamps: true });

// ─── TRANSPORT ────────────────────────────────────────────────────
const TransportRouteSchema = new Schema({
  routeNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  stops: [{ stop: String, time: String, fare: Number }],
  driver: { name: String, phone: String, license: String },
  vehicle: { number: String, model: String, capacity: Number },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const TransportAssignmentSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  route: { type: Schema.Types.ObjectId, ref: 'TransportRoute', required: true },
  stop: { type: String },
  fare: { type: Number },
}, { timestamps: true });

// ─── LEAVE ────────────────────────────────────────────────────────
const LeaveSchema = new Schema({
  applicant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String },
  type: { type: String, enum: ['Sick', 'Casual', 'Earned', 'Maternity', 'Emergency'], default: 'Casual' },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  days: { type: Number },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewNote: { type: String },
}, { timestamps: true });

// ─── PAYROLL ──────────────────────────────────────────────────────
const PayrollSchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  month: { type: String, required: true },  // "2024-03"
  basicSalary: { type: Number, default: 0 },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, default: 0 },
  status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  paidDate: { type: Date },
  remarks: { type: String },
}, { timestamps: true });

// ─── ACTIVITY LOG ─────────────────────────────────────────────────
const ActivityLogSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  module: { type: String },
  details: { type: String },
  ip: { type: String },
}, { timestamps: true });

// ─── TALENT TEST ──────────────────────────────────────────────────
const TalentTestSchema = new Schema({
  title: { type: String, required: true },
  standard: { type: String },
  subject: { type: String },
  questions: [{
    question: String,
    options: [String],
    answer: Number,  // index of correct option
    marks: { type: Number, default: 1 },
  }],
  duration: { type: Number, default: 60 }, // minutes
  date: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// ─── PENDING REGISTRATION ─────────────────────────────────────────
const PendingRegistrationSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  rollNo: String,
  standard: String,
  teacherId: String,
  designation: String,
  adminId: String,
  accessLevel: String,
  principalId: String,
  experience: String,
  profilePhotoUrl: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

// ─── COMPILE MODELS WITH SAFETY CHECKS ────────────────────────────
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
const Class = mongoose.models.Class || mongoose.model('Class', ClassSchema);
const House = mongoose.models.House || mongoose.model('House', HouseSchema);
const Subject = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);
const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
const Exam = mongoose.models.Exam || mongoose.model('Exam', ExamSchema);
const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema);
const Timetable = mongoose.models.Timetable || mongoose.model('Timetable', TimetableSchema);
const Fee = mongoose.models.Fee || mongoose.model('Fee', FeeSchema);
const Homework = mongoose.models.Homework || mongoose.model('Homework', HomeworkSchema);
const LibraryBook = mongoose.models.LibraryBook || mongoose.model('LibraryBook', LibraryBookSchema);
const LibraryIssue = mongoose.models.LibraryIssue || mongoose.model('LibraryIssue', LibraryIssueSchema);
const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);
const TransportRoute = mongoose.models.TransportRoute || mongoose.model('TransportRoute', TransportRouteSchema);
const TransportAssignment = mongoose.models.TransportAssignment || mongoose.model('TransportAssignment', TransportAssignmentSchema);
const Leave = mongoose.models.Leave || mongoose.model('Leave', LeaveSchema);
const Payroll = mongoose.models.Payroll || mongoose.model('Payroll', PayrollSchema);
const ActivityLog = mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
const TalentTest = mongoose.models.TalentTest || mongoose.model('TalentTest', TalentTestSchema);
const PendingRegistration = mongoose.models.PendingRegistration || mongoose.model('PendingRegistration', PendingRegistrationSchema);
const CentralAuth = mongoose.models.CentralAuth || mongoose.model('CentralAuth', CentralAuthSchema);

// ─── MODERN ES MODULE EXPORT ──────────────────────────────────────
export {
  User, Student, Teacher, Class, House, Subject,
  Attendance, Exam, Result, Timetable,
  Fee, Homework, LibraryBook, LibraryIssue,
  Announcement, TransportRoute, TransportAssignment,
  Leave, Payroll, ActivityLog, TalentTest,
  PendingRegistration, CentralAuth
};

export default mongoose;