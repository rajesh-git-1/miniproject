// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MasterLandingPage from './pages/MasterLandingPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardLayout from './layouts/DashboardLayout';
// import StudentDashboard from './pages/StudentDashboard';
// import TeacherDashboard from './pages/TeacherDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import PrincipalDashboard from './pages/PrincipalDashboard';
// import UserProfile from './pages/UserProfile';
// import SchoolDashboard from './pages/SchoolDashboard';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 {/* Public Routes */}
//                 <Route path="/" element={<MasterLandingPage />} />
//                 <Route path="/school/:schoolCode/login" element={<LoginPage />} />
//                 <Route path="/school/:schoolCode/register" element={<RegisterPage />} />

//                 {/* 👇 PASTE IT RIGHT HERE AS A STANDALONE ROUTE 👇 */}
//                 <Route path="/demo-dashboard" element={<SchoolDashboard />} />

//                 {/* Protected Dashboard Routes structured with Layout */}
//                 <Route path="/" element={<DashboardLayout />}>
//                     {/* Profile Route */}
//                     <Route path="profile" element={<UserProfile />} />

//                     {/* Role Specific Dashboards */}
//                     <Route path="dashboard/student" element={<StudentDashboard />} />
//                     <Route path="dashboard/teacher" element={<TeacherDashboard />} />

//                     <Route path="dashboard/admin" element={<AdminDashboard />} />
//                     <Route path="dashboard/admin/registrations" element={<AdminDashboard />} />

//                     <Route path="dashboard/principal" element={<PrincipalDashboard />} />
//                 </Route>

//                 {/* Catch-all redirect */}
//                 <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
// src/App.jsx — Updated with all module routes
// src/App.jsx — Updated with all module routes
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MasterLandingPage  from './pages/MasterLandingPage';
// import LoginPage          from './pages/LoginPage';
// import RegisterPage       from './pages/RegisterPage';
// import DashboardLayout    from './layouts/DashboardLayout';
// import AdminDashboard     from './pages/AdminDashboard';
// import StudentDashboard   from './pages/StudentDashboard';
// import TeacherDashboard   from './pages/TeacherDashboard';
// import PrincipalDashboard from './pages/PrincipalDashboard';
// import UserProfile        from './pages/UserProfile';
 

// // All module pages
// import {
//   StudentsPage, TeachersPage, ClassesPage,
//   AttendancePage, ExaminationsPage, TimetablePage,
//   FeesPage, HomeworkPage, LibraryPage,
//   AnnouncementsPage, TransportPage, LeavePage,
//   PayrollPage, ActivityLogsPage, TalentTestsPage, ReportsPage,
// } from './pages/modules';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public */}
//         <Route path="/"                           element={<MasterLandingPage />} />
//         <Route path="/school/:schoolCode/login"   element={<LoginPage />} />
//         <Route path="/school/:schoolCode/register"element={<RegisterPage />} />

//         {/* Protected — all share DashboardLayout (new sidebar+navbar) */}
//         <Route path="/" element={<DashboardLayout />}>

//           {/* Profile */}
//           <Route path="profile" element={<UserProfile />} />

//           {/* ── ADMIN ── */}
//           <Route path="dashboard/admin"                    element={<AdminDashboard />} />
//           <Route path="dashboard/admin/registrations"      element={<AdminDashboard />} />
//           <Route path="dashboard/admin/students"           element={<StudentsPage />} />
//           <Route path="dashboard/admin/teachers"           element={<TeachersPage />} />
//           <Route path="dashboard/admin/classes"            element={<ClassesPage />} />
//           <Route path="dashboard/admin/attendance"         element={<AttendancePage />} />
//           <Route path="dashboard/admin/exams"              element={<ExaminationsPage />} />
//           <Route path="dashboard/admin/timetable"          element={<TimetablePage />} />
//           <Route path="dashboard/admin/fees"               element={<FeesPage />} />
//           <Route path="dashboard/admin/homework"           element={<HomeworkPage />} />
//           <Route path="dashboard/admin/library"            element={<LibraryPage />} />
//           <Route path="dashboard/admin/communication"      element={<AnnouncementsPage />} />
//           <Route path="dashboard/admin/transport"          element={<TransportPage />} />
//           <Route path="dashboard/admin/reports"            element={<ReportsPage />} />
//           <Route path="dashboard/admin/talent"             element={<TalentTestsPage />} />
//           <Route path="dashboard/admin/leave"              element={<LeavePage />} />
//           <Route path="dashboard/admin/payroll"            element={<PayrollPage />} />
//           <Route path="dashboard/admin/logs"               element={<ActivityLogsPage />} />

//           {/* ── PRINCIPAL (reuses same module pages, read-only where applicable) ── */}
//           <Route path="dashboard/principal"                element={<PrincipalDashboard />} />
//           <Route path="dashboard/principal/students"       element={<StudentsPage />} />
//           <Route path="dashboard/principal/teachers"       element={<TeachersPage />} />
//           <Route path="dashboard/principal/attendance"     element={<AttendancePage />} />
//           <Route path="dashboard/principal/exams"          element={<ExaminationsPage />} />
//           <Route path="dashboard/principal/fees"           element={<FeesPage />} />
//           <Route path="dashboard/principal/timetable"      element={<TimetablePage />} />
//           <Route path="dashboard/principal/communication"  element={<AnnouncementsPage />} />
//           <Route path="dashboard/principal/talent"         element={<TalentTestsPage />} />
//           <Route path="dashboard/principal/reports"        element={<ReportsPage />} />

//           {/* ── TEACHER ── */}
//           <Route path="dashboard/teacher"                  element={<TeacherDashboard />} />
//           <Route path="dashboard/teacher/attendance"       element={<AttendancePage />} />
//           <Route path="dashboard/teacher/marks"            element={<ExaminationsPage />} />
//           <Route path="dashboard/teacher/homework"         element={<HomeworkPage />} />
//           <Route path="dashboard/teacher/assignments"      element={<HomeworkPage />} />
//           <Route path="dashboard/teacher/timetable"        element={<TimetablePage />} />
//           <Route path="dashboard/teacher/leave"            element={<LeavePage />} />
//           <Route path="dashboard/teacher/communication"    element={<AnnouncementsPage />} />

//           {/* ── STUDENT ── */}
//           <Route path="dashboard/student"                  element={<StudentDashboard />} />
//           <Route path="dashboard/student/attendance"       element={<AttendancePage />} />
//           <Route path="dashboard/student/results"          element={<ExaminationsPage />} />
//           <Route path="dashboard/student/timetable"        element={<TimetablePage />} />
//           <Route path="dashboard/student/homework"         element={<HomeworkPage />} />
//           <Route path="dashboard/student/fees"             element={<FeesPage />} />
//           <Route path="dashboard/student/library"          element={<LibraryPage />} />
//           <Route path="dashboard/student/notices"          element={<AnnouncementsPage />} />
//           <Route path="dashboard/student/talent"           element={<TalentTestsPage />} />
//         </Route>

//         {/* Catch-all */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MasterLandingPage  from './pages/MasterLandingPage';
// import LoginPage          from './pages/LoginPage';
// import RegisterPage       from './pages/RegisterPage';
// import DashboardLayout    from './layouts/DashboardLayout';
// import AdminDashboard     from './pages/AdminDashboard';
// import StudentDashboard   from './pages/StudentDashboard';
// import TeacherDashboard   from './pages/TeacherDashboard';
// import PrincipalDashboard from './pages/PrincipalDashboard';
// import UserProfile        from './pages/UserProfile';

// // All module pages
// import {
//   AdminDashboardPage,RegistrationsPage,UserCreationPage,InventoryPage,StudentsPage, TeachersPage, ClassesPage,
//   AttendancePage, ExaminationsPage, TimetablePage,
//   FeesPage, HomeworkPage, LibraryPage,
//   AnnouncementsPage, TransportPage, LeavePage,
//   PayrollPage, ActivityLogsPage, TalentTestsPage, ReportsPage,
// } from './pages/modules';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* ── 1. PUBLIC ROUTES ── */}
//         <Route path="/" element={<MasterLandingPage />} />
//         <Route path="/school/:schoolCode/login" element={<LoginPage />} />
//         <Route path="/school/:schoolCode/register" element={<RegisterPage />} />

//         {/* ── 2. NEW DASHBOARDS (These sit OUTSIDE the old layout so they don't double-up) ── */}
//         {/* <Route path="/dashboard/admin" element={<AdminDashboard />} /> */}
//         <Route path="/dashboard/principal" element={<PrincipalDashboard />} />
//         <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
// <Route path="/dashboard/student" element={<StudentDashboard />} />

//         {/* ── 3. OLD DASHBOARDS (These stay INSIDE the old layout) ── */}
//         <Route path="/" element={<DashboardLayout />}>

//           {/* Profile */}
//           <Route path="profile" element={<UserProfile />} />

          
//            <Route path="dashboard/admin"                    element={<AdminDashboard />} />
//            <Route path="dashboard/admin/registrations"      element={<AdminDashboard />} />
//            <Route path="dashboard/admin/students"           element={<StudentsPage />} />
//            <Route path="dashboard/admin/teachers"           element={<TeachersPage />} />
//            <Route path="dashboard/admin/classes"            element={<ClassesPage />} />
//            <Route path="dashboard/admin/attendance"         element={<AttendancePage />} />
//            <Route path="dashboard/admin/exams"              element={<ExaminationsPage />} />
//            <Route path="dashboard/admin/timetable"          element={<TimetablePage />} />
//            <Route path="dashboard/admin/fees"               element={<FeesPage />} />
//            <Route path="dashboard/admin/homework"           element={<HomeworkPage />} />
//            <Route path="dashboard/admin/library"            element={<LibraryPage />} />
//         <Route path="dashboard/admin/communication"      element={<AnnouncementsPage />} />
//          <Route path="dashboard/admin/transport"          element={<TransportPage />} />
//          <Route path="dashboard/admin/reports"            element={<ReportsPage />} />
//          <Route path="dashboard/admin/talent"             element={<TalentTestsPage />} />
//          <Route path="dashboard/admin/leave"              element={<LeavePage />} />
//          <Route path="dashboard/admin/payroll"            element={<PayrollPage />} />
//           <Route path="dashboard/admin/logs"               element={<ActivityLogsPage />} />

//           {/* ── TEACHER ──
//           <Route path="dashboard/teacher" element={<TeacherDashboard />} />
//           <Route path="dashboard/teacher/attendance" element={<AttendancePage />} />
//           <Route path="dashboard/teacher/marks" element={<ExaminationsPage />} />
//           <Route path="dashboard/teacher/homework" element={<HomeworkPage />} />
//           <Route path="dashboard/teacher/assignments" element={<HomeworkPage />} />
//           <Route path="dashboard/teacher/timetable" element={<TimetablePage />} />
//           <Route path="dashboard/teacher/leave" element={<LeavePage />} />
//           <Route path="dashboard/teacher/communication" element={<AnnouncementsPage />} /> */}

// {/*          
//           <Route path="dashboard/student" element={<StudentDashboard />} />
//           <Route path="dashboard/student/attendance" element={<AttendancePage />} />
//           <Route path="dashboard/student/results" element={<ExaminationsPage />} />
//           <Route path="dashboard/student/timetable" element={<TimetablePage />} />
//           <Route path="dashboard/student/homework" element={<HomeworkPage />} />
//           <Route path="dashboard/student/fees" element={<FeesPage />} />
//           <Route path="dashboard/student/library" element={<LibraryPage />} />
//           <Route path="dashboard/student/notices" element={<AnnouncementsPage />} />
//           <Route path="dashboard/student/talent" element={<TalentTestsPage />} />
//         </Route> */}

//         {/* Catch-all */}
// </Route>
//         <Route path="*" element={<Navigate to="/" replace />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;
























import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MasterLandingPage  from './pages/MasterLandingPage';
import LoginPage          from './pages/LoginPage';
import RegisterPage       from './pages/RegisterPage';

// If you have these separate files, keep them imported:
import StudentDashboard   from './pages/StudentDashboard';
import TeacherDashboard   from './pages/TeacherDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import UserProfile        from './pages/UserProfile';

// Make sure your Layout is imported from where it lives!
import DashboardLayout    from './layouts/DashboardLayout'; 

// ─── IMPORT ALL MODULES FROM index.jsx ────────────────────────────────────────
import {
  AdminDashboardPage, 
  RegistrationsPage, 
  UserCreationPage,
  InventoryPage,
  StudentsPage, 
  TeachersPage, 
  ClassesPage,
  AttendancePage, 
  ExaminationsPage, 
  TimetablePage,
  FeesPage, 
  HomeworkPage, 
  LibraryPage,
  AnnouncementsPage, 
  TransportPage, 
  LeavePage,
  PayrollPage, 
  ActivityLogsPage, 
  TalentTestsPage, 
  ReportsPage,
} from './pages/modules'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* ── 1. PUBLIC ROUTES ── */}
        <Route path="/" element={<MasterLandingPage />} />
        <Route path="/school/:schoolCode/login" element={<LoginPage />} />
        <Route path="/school/:schoolCode/register" element={<RegisterPage />} />

        {/* ── 2. NON-ADMIN DASHBOARDS ── */}
        <Route path="/dashboard/principal" element={<PrincipalDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />

        {/* ── 3. ADMIN DASHBOARD LAYOUT & ROUTES ── */}
        <Route path="/" element={<DashboardLayout />}>

          <Route path="profile" element={<UserProfile />} />

          {/* THESE ARE THE FIXES: Pointing to the new pages we made! */}
          <Route path="dashboard/admin"                 element={<AdminDashboardPage />} />
          <Route path="dashboard/admin/registrations"   element={<RegistrationsPage />} />
          <Route path="dashboard/admin/user-creation"   element={<UserCreationPage />} />
          <Route path="dashboard/admin/inventory"       element={<InventoryPage />} />
          
          {/* Your existing working pages */}
          <Route path="dashboard/admin/students"        element={<StudentsPage />} />
          <Route path="dashboard/admin/teachers"        element={<TeachersPage />} />
          <Route path="dashboard/admin/classes"         element={<ClassesPage />} />
          <Route path="dashboard/admin/attendance"      element={<AttendancePage />} />
          <Route path="dashboard/admin/exams"           element={<ExaminationsPage />} />
          <Route path="dashboard/admin/timetable"       element={<TimetablePage />} />
          <Route path="dashboard/admin/fees"            element={<FeesPage />} />
          <Route path="dashboard/admin/homework"        element={<HomeworkPage />} />
          <Route path="dashboard/admin/library"         element={<LibraryPage />} />
          <Route path="dashboard/admin/communication"   element={<AnnouncementsPage />} />
          <Route path="dashboard/admin/transport"       element={<TransportPage />} />
          <Route path="dashboard/admin/reports"         element={<ReportsPage />} />
          <Route path="dashboard/admin/talent"          element={<TalentTestsPage />} />
          <Route path="dashboard/admin/leave"           element={<LeavePage />} />
          <Route path="dashboard/admin/payroll"         element={<PayrollPage />} />
          <Route path="dashboard/admin/logs"            element={<ActivityLogsPage />} />

        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;



















// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MasterLandingPage  from './pages/MasterLandingPage';
// import LoginPage          from './pages/LoginPage';
// import RegisterPage       from './pages/RegisterPage';
// import StudentDashboard   from './pages/StudentDashboard';
// import TeacherDashboard   from './pages/TeacherDashboard';
// import PrincipalDashboard from './pages/PrincipalDashboard';
// import UserProfile        from './pages/UserProfile';

// // ─── IMPORT ALL MODULES ────────────────────────────────────────────────────────
// import DashboardLayout, {
//   AdminDashboardPage, 
//   RegistrationsPage, 
//   UserCreationPage,
//   InventoryPage,
//   StudentsPage, 
//   TeachersPage, 
//   ClassesPage,
//   AttendancePage, 
//   ExaminationsPage, 
//   TimetablePage,
//   // FeesPage, 
//   HomeworkPage, 
//   // LibraryPage,
//   // AnnouncementsPage, 
//   TransportPage, 
//   LeavePage,
//   PayrollPage, 
//   ActivityLogsPage, 
//   // TalentTestsPage, 
//   // ReportsPage,
// } from './pages/modules'; // Make sure this path points to where you saved the index.jsx file!

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* ── 1. PUBLIC ROUTES ── */}
//         <Route path="/" element={<MasterLandingPage />} />
//         <Route path="/school/:schoolCode/login" element={<LoginPage />} />
//         <Route path="/school/:schoolCode/register" element={<RegisterPage />} />

//         {/* ── 2. NON-ADMIN DASHBOARDS ── */}
//         <Route path="/dashboard/principal" element={<PrincipalDashboard />} />
//         <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
//         <Route path="/dashboard/student" element={<StudentDashboard />} />

//         {/* ── 3. ADMIN DASHBOARD LAYOUT & ROUTES ── */}
//         <Route path="/" element={<DashboardLayout />}>
          
//           <Route path="profile" element={<UserProfile />} />

//           {/* Admin specific routes mapped to their exact components */}
//           <Route path="dashboard/admin"                 element={<AdminDashboardPage />} />
//           <Route path="dashboard/admin/registrations"   element={<RegistrationsPage />} />
//           <Route path="dashboard/admin/user-creation"   element={<UserCreationPage />} />
//           <Route path="dashboard/admin/inventory"       element={<InventoryPage />} />
//           <Route path="dashboard/admin/students"        element={<StudentsPage />} />
//           <Route path="dashboard/admin/teachers"        element={<TeachersPage />} />
//           <Route path="dashboard/admin/classes"         element={<ClassesPage />} />
//           <Route path="dashboard/admin/attendance"      element={<AttendancePage />} />
//           <Route path="dashboard/admin/exams"           element={<ExaminationsPage />} />
//           <Route path="dashboard/admin/timetable"       element={<TimetablePage />} />
//           <Route path="dashboard/admin/fees"            element={<FeesPage />} />
//           <Route path="dashboard/admin/homework"        element={<HomeworkPage />} />
//           <Route path="dashboard/admin/library"         element={<LibraryPage />} />
//           <Route path="dashboard/admin/communication"   element={<AnnouncementsPage />} />
//           <Route path="dashboard/admin/transport"       element={<TransportPage />} />
//           <Route path="dashboard/admin/reports"         element={<ReportsPage />} />
//           <Route path="dashboard/admin/talent"          element={<TalentTestsPage />} />
//           <Route path="dashboard/admin/leave"           element={<LeavePage />} />
//           <Route path="dashboard/admin/payroll"         element={<PayrollPage />} />
//           <Route path="dashboard/admin/logs"            element={<ActivityLogsPage />} />

//         </Route>

//         {/* Catch-all */}
//         <Route path="*" element={<Navigate to="/" replace />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;