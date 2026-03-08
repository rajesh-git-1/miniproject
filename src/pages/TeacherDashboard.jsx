// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

// const TeacherDashboard = () => {
//     // 1. Grab the user data from your Redux store
//     // Adjust 'state.auth.user' if your slice is named differently
//     const user = useSelector((state) => state.auth?.user || {}); 
    
//     // 2. State to control the profile modal visibility
//     const [isProfileOpen, setIsProfileOpen] = useState(false);

//     const actions = [
//         { title: 'Mark Student Attendance', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
//         { title: 'Upload Exam Marks', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
//         { title: 'Apply for Leave', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
//     ];

//     return (
//         <div className="space-y-6">
            
//             {/* --- HEADER & PROFILE BUTTON --- */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-800">
//                         Welcome back, {user.name || 'Teacher'}!
//                     </h2>
//                     <p className="text-gray-500 text-sm mt-1">Have a great day managing your classes.</p>
//                 </div>
//                 <button 
//                     onClick={() => setIsProfileOpen(true)}
//                     className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors border border-primary/20 shadow-sm"
//                 >
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                     <span>View Profile</span>
//                 </button>
//             </div>

//             {/* --- QUICK ACTIONS --- */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {actions.map((action, idx) => (
//                     <div key={idx} className="card cursor-pointer hover:-translate-y-1 transition-transform flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                         <div className="p-3 bg-primary/10 text-primary rounded-lg">
//                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon} />
//                             </svg>
//                         </div>
//                         <h3 className="text-md font-semibold text-gray-800">{action.title}</h3>
//                     </div>
//                 ))}
//             </div>

//             {/* --- RECENT CLASSES TABLE --- */}
//             <div className="card bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">Recent Classes</h3>
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="text-sm text-gray-500 border-b border-gray-100">
//                                 <th className="pb-3 font-semibold">Class</th>
//                                 <th className="pb-3 font-semibold">Subject</th>
//                                 <th className="pb-3 font-semibold">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
//                                 <td className="py-4 font-medium text-gray-800">10th A</td>
//                                 <td className="py-4 text-gray-600">Mathematics</td>
//                                 <td className="py-4">
//                                     <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-700">Done</span>
//                                 </td>
//                             </tr>
//                             <tr className="hover:bg-gray-50/50 transition-colors">
//                                 <td className="py-4 font-medium text-gray-800">9th B</td>
//                                 <td className="py-4 text-gray-600">Physics</td>
//                                 <td className="py-4">
//                                     <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-yellow-100 text-yellow-700">Pending</span>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* --- PROFILE MODAL --- */}
//             {isProfileOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
//                     <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out]">
                        
//                         {/* Modal Header */}
//                         <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
//                             <h2 className="text-xl font-bold text-gray-800 font-serif">Teacher Profile</h2>
//                             <button 
//                                 onClick={() => setIsProfileOpen(false)}
//                                 className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600 transition-colors"
//                             >
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>

//                         {/* Modal Body */}
//                         <div className="p-6 space-y-4">
//                             <div className="flex justify-center mb-6">
//                                 <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
//                                     {user.name ? user.name.charAt(0).toUpperCase() : 'T'}
//                                 </div>
//                             </div>

//                             {/* Profile Details Grid */}
//                             <div className="space-y-3">
//                                 <ProfileItem label="Full Name" value={user.name || 'Not Provided'} />
//                                 <ProfileItem label="Email Address" value={user.email || 'Not Provided'} />
//                                 <ProfileItem label="Phone Number" value={user.phone || 'Not Provided'} />
//                                 <ProfileItem label="Role" value={user.role || 'Teacher'} />
//                                 {/* Add any other fields your registration form captures here, e.g.: */}
//                                 {/* <ProfileItem label="Assigned Subject" value={user.subject || 'Not Assigned'} /> */}
//                             </div>
//                         </div>

//                         {/* Modal Footer */}
//                         <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
//                             <p className="text-xs text-gray-500">Contact the admin to update your information.</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
            
//         </div>
//     );
// };

// // A small helper component to format the profile data rows cleanly
// const ProfileItem = ({ label, value }) => (
//     <div className="flex flex-col bg-gray-50 p-3 rounded-lg border border-gray-100">
//         <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</span>
//         <span className="text-sm font-semibold text-gray-800">{value}</span>
//     </div>
// );

// export default TeacherDashboard;






// frontend/src/pages/TeacherDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTeacherStats, fetchTeacherActivity } from "../api/teacher";

// ─── DESIGN SYSTEM ───────────────────────────────────────────────────────────
const theme = {
  colors: {
    bg: "#0d1117", surface: "#161b22", surfaceHover: "#1c2128", border: "#30363d",
    text: "#e6edf3", textMuted: "#8b949e", textFaint: "#484f58",
    teacherColor: "#3fb950", success: "#3fb950", warning: "#d29922", danger: "#f85149",
    accent: "#58a6ff", purple: "#bc8cff"
  },
};

// ─── TEACHER CONFIG ────────────────────────────────────────────────────────
const TEACHER_CONFIG = {
  label: "Teacher",
  icon: "📚",
  color: theme.colors.teacherColor,
  gradient: "linear-gradient(135deg, #3fb950 0%, #238636 100%)",
  nav: [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "profile", icon: "◉", label: "My Profile" },
    { id: "classes", icon: "⬡", label: "My Classes" },
    { id: "attendance", icon: "◷", label: "Mark Attendance" },
    { id: "marks", icon: "◈", label: "Enter Marks" },
    { id: "homework", icon: "◉", label: "Upload Homework" },
    { id: "assignments", icon: "◫", label: "Evaluate Assignments" },
    { id: "timetable", icon: "⬢", label: "View Timetable" },
    { id: "leave", icon: "◷", label: "Leave Request" },
    { id: "communication", icon: "◎", label: "Parent Communication" },
  ]
};

// ─── CHARTS & MINI COMPONENTS ─────────────────────────────────────────────────
function DonutChart({ pct, color, size = 80 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={theme.colors.border} strokeWidth={8} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
    </svg>
  );
}

function StatCard({ label, value, delta, color, icon, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: theme.colors.surface, border: `1px solid ${hovered ? color + "60" : theme.colors.border}`,
        borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "none", boxShadow: hovered ? `0 8px 24px ${color}20` : "none",
        animation: `fadeInUp 0.4s ease ${index * 0.06}s both`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: theme.colors.textMuted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.text, marginTop: 6, fontFamily: "'Syne', sans-serif" }}>{value}</div>
          <div style={{ fontSize: 12, color: color, marginTop: 4, fontWeight: 500 }}>{delta}</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: color }}>{icon}</div>
      </div>
    </div>
  );
}

// ─── DASHBOARD CONTENT ────────────────────────────────────────────────────────
function DashboardContent({ activeModule, userName, stats, activities }) {
  if (activeModule !== "dashboard") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 16 }}>
        <div style={{ width: 80, height: 80, borderRadius: 20, background: TEACHER_CONFIG.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{TEACHER_CONFIG.nav.find((n) => n.id === activeModule)?.icon || "◈"}</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: theme.colors.text }}>{TEACHER_CONFIG.nav.find((n) => n.id === activeModule)?.label}</div>
        <div style={{ fontSize: 13, color: theme.colors.textMuted }}>This module is under development.</div>
      </div>
    );
  }

  // Cards mapped to Teacher API data
  const dynamicCards = [
    { label: "Today's Classes", value: stats?.todaysClasses || "0", delta: "Scheduled", color: "#3fb950", icon: "⬡" },
    { label: "Pending Evals", value: stats?.pendingEvals || "0", delta: "Assignments", color: "#f85149", icon: "◫" },
    { label: "My Classes", value: stats?.totalClasses || "0", delta: "Assigned", color: "#58a6ff", icon: "📚" },
    { label: "Leave Requests", value: stats?.pendingLeaves || "0", delta: "Pending", color: "#d29922", icon: "◷" },
  ];

  const typeColors = { homework: "#58a6ff", attendance: "#3fb950", notice: "#bc8cff", leave: "#d29922" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Welcome Banner */}
      <div style={{ background: `linear-gradient(135deg, ${TEACHER_CONFIG.color}15 0%, transparent 60%)`, border: `1px solid ${TEACHER_CONFIG.color}30`, borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, fontFamily: "'Syne', sans-serif" }}>Good Morning, {userName}! 👋</div>
          <div style={{ fontSize: 13, color: theme.colors.textMuted, marginTop: 4 }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} · <span style={{ color: TEACHER_CONFIG.color }}>{TEACHER_CONFIG.label} Dashboard</span>
          </div>
        </div>
        <div style={{ fontSize: 48, opacity: 0.6 }}>{TEACHER_CONFIG.icon}</div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {dynamicCards.map((card, i) => <StatCard key={i} {...card} index={i} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Attendance Task Card */}
        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text, fontFamily: "'Syne', sans-serif" }}>Daily Attendance Status</div>
              <div style={{ fontSize: 11, color: theme.colors.textMuted, marginTop: 2 }}>Classes taught today</div>
            </div>
            <DonutChart pct={Math.round((stats?.attendanceDone || 0) / (stats?.todaysClasses || 1) * 100) || 0} color={TEACHER_CONFIG.color} size={60} />
          </div>
          <div style={{ background: theme.colors.bg, borderRadius: 8, padding: 12, border: `1px solid ${theme.colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: theme.colors.text }}>Completed</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: theme.colors.success }}>{stats?.attendanceDone || 0} / {stats?.todaysClasses || 0}</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Recent Activity</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {activities.length === 0 ? <div style={{color: theme.colors.textMuted, fontSize: 12}}>No recent activity.</div> : 
              activities.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: typeColors[a.type] || "#8b949e", marginTop: 4, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: theme.colors.text }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: theme.colors.textMuted, marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────
export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [activeModule, setActiveModule] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userStr || !token) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== 'Teacher' && user.role !== 'Admin') {
      navigate("/"); // Kick out if not a teacher or admin
      return;
    }
    setUserName(user.name);

    // Fetch Teacher API Data
    const loadData = async () => {
      try {
        const [statsRes, actRes] = await Promise.all([ fetchTeacherStats(), fetchTeacherActivity() ]);
        if (statsRes.success) setStats(statsRes.data);
        if (actRes.success) setActivities(actRes.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };
    loadData();
  }, [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${theme.colors.bg}; color: ${theme.colors.text}; font-family: 'DM Sans', sans-serif; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: theme.colors.bg }}>
        
        {/* Sidebar */}
        <aside style={{ width: collapsed ? 64 : 240, minHeight: "100vh", background: theme.colors.surface, borderRight: `1px solid ${theme.colors.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s ease", overflow: "hidden", position: "relative", zIndex: 10 }}>
          <div style={{ padding: collapsed ? "20px 0" : "20px 16px", borderBottom: `1px solid ${theme.colors.border}`, display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: TEACHER_CONFIG.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{TEACHER_CONFIG.icon}</div>
            {!collapsed && (
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: theme.colors.text, letterSpacing: "0.02em" }}>ABHYAAS</div>
                <div style={{ fontSize: 10, color: TEACHER_CONFIG.color, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Teacher Portal</div>
              </div>
            )}
          </div>
          <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
            {TEACHER_CONFIG.nav.map((item) => {
              const isActive = activeModule === item.id;
              return (
                <div key={item.id} onClick={() => setActiveModule(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px 0" : "9px 16px", margin: "1px 8px", borderRadius: 8, cursor: "pointer", background: isActive ? `${TEACHER_CONFIG.color}18` : "transparent", borderLeft: isActive ? `2px solid ${TEACHER_CONFIG.color}` : "2px solid transparent", transition: "all 0.15s ease", justifyContent: collapsed ? "center" : "flex-start" }}>
                  <span style={{ fontSize: 16, color: isActive ? TEACHER_CONFIG.color : theme.colors.textMuted, width: 20, textAlign: "center" }}>{item.icon}</span>
                  {!collapsed && <span style={{ fontSize: 13, color: isActive ? TEACHER_CONFIG.color : theme.colors.textMuted, fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap" }}>{item.label}</span>}
                </div>
              );
            })}
          </nav>
          <div onClick={() => setCollapsed(!collapsed)} style={{ padding: "16px", borderTop: `1px solid ${theme.colors.border}`, cursor: "pointer", display: "flex", justifyContent: collapsed ? "center" : "flex-end", color: theme.colors.textMuted, fontSize: 18 }}>
            {collapsed ? "→" : "←"}
          </div>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          
          {/* Topbar */}
          <header style={{ height: 60, background: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 16, position: "sticky", top: 0, zIndex: 9 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: theme.colors.textMuted }}>Teacher</span>
                <span style={{ color: theme.colors.textFaint, fontSize: 11 }}>›</span>
                <span style={{ fontSize: 13, color: theme.colors.text, fontWeight: 600 }}>{TEACHER_CONFIG.nav.find((n) => n.id === activeModule)?.label || "Dashboard"}</span>
              </div>
            </div>
            <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login"); }} style={{ background: theme.colors.surfaceHover, border: `1px solid ${theme.colors.border}`, borderRadius: 8, padding: "6px 12px", color: theme.colors.danger, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              Logout
            </button>
          </header>

          <main style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
            <DashboardContent activeModule={activeModule} userName={userName} stats={stats} activities={activities} />
          </main>

        </div>
      </div>
    </>
  );
}