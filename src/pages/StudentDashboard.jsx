// import React from 'react';

// const StudentDashboard = () => {
//     const cards = [
//         { title: 'View Attendance', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', bg: 'bg-blue-50', text: 'text-blue-600', val: '92%' },
//         { title: 'View Exam Results', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', bg: 'bg-green-50', text: 'text-green-600', val: 'New' },
//         { title: 'View Fees Status', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', bg: 'bg-purple-50', text: 'text-purple-600', val: 'Paid' },
//         { title: 'View Notices', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', bg: 'bg-orange-50', text: 'text-orange-600', val: '3' },
//     ];

//     return (
//         // <div className="space-y-6">
//             <div className="stats-grid">
//                 {cards.map((card, idx) => (
//                     <div key={idx} className="stat-box flex flex-col items-center text-center cursor-pointer">
//                         <div className={`p-4 rounded-full ${card.bg} ${card.text} mb-4`}>
//                             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon} />
//                             </svg>
//                         </div>
//                         <h3 className="text-lg font-semibold text-textMain">{card.title}</h3>
//                         <span className={`mt-2 text-sm font-medium px-2.5 py-0.5 rounded-full ${card.bg} ${card.text}`}>{card.val}</span>
//                     </div>
//                 ))}
//             </div>

//             <div className="card">
//                 <h3 className="text-lg font-bold text-textMain mb-4">Upcoming Schedule</h3>
//                 <p className="text-textMuted text-sm">Dashboard metrics and charts placeholder. The UI structure is prepared.</p>
//             </div>
//         </div>
//     );
// };

// export default StudentDashboard;
// frontend/src/pages/StudentDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStudentStats, fetchStudentActivity } from "../api/student";

// ─── DESIGN SYSTEM ───────────────────────────────────────────────────────────
const theme = {
  colors: {
    bg: "#0d1117", surface: "#161b22", surfaceHover: "#1c2128", border: "#30363d",
    text: "#e6edf3", textMuted: "#8b949e", textFaint: "#484f58",
    studentColor: "#ffa657", success: "#3fb950", warning: "#d29922", danger: "#f85149",
    accent: "#58a6ff", purple: "#bc8cff"
  },
};

// ─── STUDENT CONFIG ────────────────────────────────────────────────────────
const STUDENT_CONFIG = {
  label: "Student",
  icon: "🎒",
  color: theme.colors.studentColor,
  gradient: "linear-gradient(135deg, #ffa657 0%, #e0713b 100%)",
  nav: [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "profile", icon: "◉", label: "My Profile" },
    { id: "attendance", icon: "◷", label: "My Attendance" },
    { id: "results", icon: "◈", label: "Exam Results" },
    { id: "timetable", icon: "⬢", label: "Timetable" },
    { id: "homework", icon: "◉", label: "Homework & Submit" },
    { id: "fees", icon: "◆", label: "Fee Status" },
    { id: "library", icon: "▣", label: "Library" },
    { id: "notices", icon: "◎", label: "Notices" },
    { id: "talent", icon: "★", label: "Talent Tests" },
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
        <div style={{ width: 80, height: 80, borderRadius: 20, background: STUDENT_CONFIG.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{STUDENT_CONFIG.nav.find((n) => n.id === activeModule)?.icon || "◈"}</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: theme.colors.text }}>{STUDENT_CONFIG.nav.find((n) => n.id === activeModule)?.label}</div>
        <div style={{ fontSize: 13, color: theme.colors.textMuted }}>This module is under development.</div>
      </div>
    );
  }

  // Cards mapped to Student API data
  const dynamicCards = [
    { label: "Attendance %", value: `${stats?.attendancePct || 0}%`, delta: "Overall", color: "#ffa657", icon: "◷" },
    { label: "Latest Result", value: stats?.latestResult || "—", delta: "Grade", color: "#3fb950", icon: "◈" },
    { label: "Upcoming Exams", value: stats?.upcomingExams || "0", delta: "Scheduled", color: "#f85149", icon: "◎" },
    { label: "Pending HW", value: stats?.pendingHW || "0", delta: "Due soon", color: "#d29922", icon: "◉" },
    { label: "Fee Due", value: stats?.feeDue > 0 ? `₹${stats.feeDue}` : "None", delta: stats?.feeDue > 0 ? "Overdue" : "Paid", color: stats?.feeDue > 0 ? "#f85149" : "#3fb950", icon: "◆" },
  ];

  const typeColors = { homework: "#58a6ff", exam: "#bc8cff", library: "#ffa657", notice: "#39d353" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Welcome Banner */}
      <div style={{ background: `linear-gradient(135deg, ${STUDENT_CONFIG.color}15 0%, transparent 60%)`, border: `1px solid ${STUDENT_CONFIG.color}30`, borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, fontFamily: "'Syne', sans-serif" }}>Welcome back, {userName}! 📝</div>
          <div style={{ fontSize: 13, color: theme.colors.textMuted, marginTop: 4 }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} · <span style={{ color: STUDENT_CONFIG.color }}>{STUDENT_CONFIG.label} Dashboard</span>
          </div>
        </div>
        <div style={{ fontSize: 48, opacity: 0.6 }}>{STUDENT_CONFIG.icon}</div>
      </div>

      {/* Info Banner */}
      <div style={{ background: "#ffa65715", border: "1px solid #ffa65740", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 24 }}>💡</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme.colors.text }}>Student View</div>
          <div style={{ fontSize: 12, color: theme.colors.textMuted }}>Navigate to the Homework module to submit your pending assignments for this week.</div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {dynamicCards.map((card, i) => <StatCard key={i} {...card} index={i} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Attendance Donut Card */}
        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text, fontFamily: "'Syne', sans-serif" }}>My Attendance</div>
              <div style={{ fontSize: 11, color: theme.colors.textMuted, marginTop: 2 }}>Current Academic Year</div>
            </div>
            <DonutChart pct={stats?.attendancePct || 0} color={STUDENT_CONFIG.color} size={70} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: theme.colors.bg, borderRadius: 8, padding: 12, border: `1px solid ${theme.colors.border}`, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: theme.colors.textMuted }}>Target</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.colors.success, marginTop: 4 }}>75%</div>
            </div>
            <div style={{ flex: 1, background: theme.colors.bg, borderRadius: 8, padding: 12, border: `1px solid ${theme.colors.border}`, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: theme.colors.textMuted }}>Current</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: STUDENT_CONFIG.color, marginTop: 4 }}>{stats?.attendancePct || 0}%</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Recent Updates</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {activities.length === 0 ? <div style={{color: theme.colors.textMuted, fontSize: 12}}>No recent updates.</div> : 
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
export default function StudentDashboard() {
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
    if (user.role !== 'Student' && user.role !== 'Admin') {
      navigate("/"); // Kick out if not a student or admin
      return;
    }
    setUserName(user.name);

    // Fetch Student API Data
    const loadData = async () => {
      try {
        const [statsRes, actRes] = await Promise.all([ fetchStudentStats(), fetchStudentActivity() ]);
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
            <div style={{ width: 32, height: 32, borderRadius: 8, background: STUDENT_CONFIG.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{STUDENT_CONFIG.icon}</div>
            {!collapsed && (
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: theme.colors.text, letterSpacing: "0.02em" }}>ABHYAAS</div>
                <div style={{ fontSize: 10, color: STUDENT_CONFIG.color, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Student Portal</div>
              </div>
            )}
          </div>
          <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
            {STUDENT_CONFIG.nav.map((item) => {
              const isActive = activeModule === item.id;
              return (
                <div key={item.id} onClick={() => setActiveModule(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px 0" : "9px 16px", margin: "1px 8px", borderRadius: 8, cursor: "pointer", background: isActive ? `${STUDENT_CONFIG.color}18` : "transparent", borderLeft: isActive ? `2px solid ${STUDENT_CONFIG.color}` : "2px solid transparent", transition: "all 0.15s ease", justifyContent: collapsed ? "center" : "flex-start" }}>
                  <span style={{ fontSize: 16, color: isActive ? STUDENT_CONFIG.color : theme.colors.textMuted, width: 20, textAlign: "center" }}>{item.icon}</span>
                  {!collapsed && <span style={{ fontSize: 13, color: isActive ? STUDENT_CONFIG.color : theme.colors.textMuted, fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap" }}>{item.label}</span>}
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
                <span style={{ fontSize: 11, color: theme.colors.textMuted }}>Student</span>
                <span style={{ color: theme.colors.textFaint, fontSize: 11 }}>›</span>
                <span style={{ fontSize: 13, color: theme.colors.text, fontWeight: 600 }}>{STUDENT_CONFIG.nav.find((n) => n.id === activeModule)?.label || "Dashboard"}</span>
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