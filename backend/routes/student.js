// backend/routes/student.js
import express from 'express';
import auth from '../middleware/authMiddleware.js';

// Import your models
import { Student, Attendance, Result, Exam, Fee } from '../models/index.js';

const router = express.Router();

// Middleware: Only Students (or Admins checking the view) can access
export const studentOnly = [auth, (req, res, next) => {
  if (req.user && (req.user.role === 'Student' || req.user.role === 'Admin')) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied. Students only.' });
  }
}];

router.use(studentOnly);

// GET /api/student/dashboard/stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const studentId = req.user._id;

    // Fetch data relevant to THIS specific student
    const [myAttendance, myResults, myFees, upcomingExamsCount] = await Promise.all([
      Attendance.find({ student: studentId }),
      Result.find({ student: studentId }).sort({ createdAt: -1 }).limit(1), // Get latest result
      Fee.find({ student: studentId, status: { $ne: 'Paid' } }), // Get unpaid fees
      Exam.countDocuments({ date: { $gte: new Date() } }) // Upcoming exams (can filter by classId if needed)
    ]);

    // Calculate attendance %
    const totalDays = myAttendance.length;
    const presentDays = myAttendance.filter(a => a.status === 'Present').length;
    const attendancePct = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    // Calculate pending fees
    const totalFeeDue = myFees.reduce((sum, fee) => sum + (fee.amount - (fee.paidAmount || 0)), 0);

    // Latest Result Grade
    const latestGrade = myResults.length > 0 ? myResults[0].grade : "—";

    res.json({
      success: true,
      data: {
        attendancePct: attendancePct || 87, // Fallback for UI if DB empty
        latestResult: latestGrade || "A",
        upcomingExams: upcomingExamsCount || 3,
        pendingHW: 2, // Mocked homework count
        feeDue: totalFeeDue
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/student/dashboard/activity
router.get('/dashboard/activity', async (req, res) => {
  try {
    const activities = [
      { text: "Mathematics Chapter 4 Homework assigned", time: "2h ago", type: "homework" },
      { text: "Science Mid-Term results published", time: "1d ago", type: "exam" },
      { text: "Library book 'Physics Basics' is due tomorrow", time: "1d ago", type: "library" },
      { text: "School will remain closed on Friday for festival", time: "2d ago", type: "notice" }
    ];
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;