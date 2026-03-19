























import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MasterLandingPage  from './pages/MasterLandingPage';
import LoginPage          from './pages/LoginPage';
import RegisterPage       from './pages/RegisterPage';
import SetPassword from "./pages/SetPassword";

// If you have these separate files, keep them imported:
import StudentDashboard   from './pages/StudentDashboard';
import TeacherDashboard   from './pages/TeacherDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import UserProfile        from './pages/UserProfile';
// import SubjectsPage from './pages/SubjectsPage';
// import { SubjectsPage } from "./pages/modules";

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
  ClassesViewPage,
  ClassesCreatePage,
  HousesCreatePage,
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
  SubjectsPage,
  MarksEntryPage
} from './pages/modules'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* ── 1. PUBLIC ROUTES ── */}
        <Route path="/" element={<MasterLandingPage />} />
        <Route path="/school/:schoolCode/login" element={<LoginPage />} />
        <Route path="/school/:schoolCode/register" element={<RegisterPage />} />

        {/* ── 2. NON-ADMIN DASHBOARDS ── (moved under DashboardLayout) */}
        {/* <Route path="/dashboard/principal" element={<PrincipalDashboard />} /> */}
        {/* <Route path="/dashboard/teacher" element={<TeacherDashboard />} /> */}
        {/* <Route path="/dashboard/student" element={<StudentDashboard />} /> */}

        {/* ── 3. ADMIN DASHBOARD LAYOUT & ROUTES ── */}
        <Route path="/" element={<DashboardLayout />}>

          <Route path="profile" element={<UserProfile />} />

          {/* THESE ARE THE FIXES: Pointing to the new pages we made! */}
          <Route path="dashboard/admin"                 element={<AdminDashboardPage />} />
          <Route path="dashboard/admin/registrations"   element={<RegistrationsPage />} />
          <Route path="dashboard/admin/user-creation"   element={<UserCreationPage />} />
          <Route path="dashboard/admin/inventory"       element={<InventoryPage />} />
          <Route path="dashboard/admin/subjects" element={<SubjectsPage />} />
          {/* <Route path="dashboard/admin/reports" element={<ReportsPage />} /> */}
          <Route path="dashboard/admin/marks" element={<MarksEntryPage />} />

          {/* Your existing working pages */}
          <Route path="dashboard/admin/students"        element={<StudentsPage />} />
          
          <Route path="dashboard/admin/teachers"        element={<TeachersPage />} />
          <Route path="dashboard/admin/classes/view"    element={<ClassesViewPage />} />
          <Route path="dashboard/admin/classes/create"  element={<ClassesCreatePage />} />
          <Route path="dashboard/admin/classes/houses"  element={<HousesCreatePage />} />
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
          
          {/* Added non-admin dashboards under shared layout */}
          <Route path="dashboard/principal" element={<PrincipalDashboard />} />
          <Route path="dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="dashboard/student" element={<StudentDashboard />} />

        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
<Route path="/set-password" element={<SetPassword />} />
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