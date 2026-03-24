// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { fetchStudentStats, fetchStudentActivity } from "../api/student";

// // // ─── DESIGN SYSTEM ───────────────────────────────────────────────────────────
// // const theme = {
// //   colors: {
// //     bg: "#0d1117", surface: "#161b22", surfaceHover: "#1c2128", border: "#30363d",
// //     text: "#e6edf3", textMuted: "#8b949e", textFaint: "#484f58",
// //     studentColor: "#ffa657", success: "#3fb950", warning: "#d29922", danger: "#f85149",
// //     accent: "#58a6ff", purple: "#bc8cff"
// //   },
// // };

// // // ─── STUDENT CONFIG ────────────────────────────────────────────────────────
// // const STUDENT_CONFIG = {
// //   label: "Student",
// //   icon: "🎒",
// //   color: theme.colors.studentColor,
// //   gradient: "linear-gradient(135deg, #ffa657 0%, #e0713b 100%)",
// //   nav: [
// //     { id: "dashboard", icon: "◈", label: "Dashboard" },
// //     { id: "profile", icon: "◉", label: "My Profile" },
// //     { id: "attendance", icon: "◷", label: "My Attendance" },
// //     { id: "results", icon: "◈", label: "Exam Results" },
// //     { id: "timetable", icon: "⬢", label: "Timetable" },
// //     { id: "homework", icon: "◉", label: "Homework & Submit" },
// //     { id: "fees", icon: "◆", label: "Fee Status" },
// //     { id: "library", icon: "▣", label: "Library" },
// //     { id: "notices", icon: "◎", label: "Notices" },
// //     { id: "talent", icon: "★", label: "Talent Tests" },
// //   ]
// // };

// // // ─── CHARTS & MINI COMPONENTS ─────────────────────────────────────────────────
// // function DonutChart({ pct, color, size = 80 }) {
// //   const r = (size - 10) / 2;
// //   const circ = 2 * Math.PI * r;
// //   const dash = (pct / 100) * circ;
// //   return (
// //     <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
// //       <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={theme.colors.border} strokeWidth={8} />
// //       <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
// //     </svg>
// //   );
// // }

// // function StatCard({ label, value, delta, color, icon, index }) {
// //   const [hovered, setHovered] = useState(false);
// //   return (
// //     <div
// //       onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
// //       style={{
// //         background: theme.colors.surface, border: `1px solid ${hovered ? color + "60" : theme.colors.border}`,
// //         borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "all 0.2s ease",
// //         transform: hovered ? "translateY(-2px)" : "none", boxShadow: hovered ? `0 8px 24px ${color}20` : "none",
// //         animation: `fadeInUp 0.4s ease ${index * 0.06}s both`,
// //       }}
// //     >
// //       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
// //         <div>
// //           <div style={{ fontSize: 11, color: theme.colors.textMuted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
// //           <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.text, marginTop: 6, fontFamily: "'Syne', sans-serif" }}>{value}</div>
// //           <div style={{ fontSize: 12, color: color, marginTop: 4, fontWeight: 500 }}>{delta}</div>
// //         </div>
// //         <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: color }}>{icon}</div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── DASHBOARD CONTENT ────────────────────────────────────────────────────────
// // function DashboardContent({ activeModule, userName, stats, activities }) {
// //   if (activeModule === "attendance") {
// //     return (
// //       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
// //         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24 }}>
// //           <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>Attendance Dashboard</h2>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
// //             <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
// //               <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Total Days</div>
// //               <div style={{ fontSize: 24, color: theme.colors.text, fontWeight: 700, marginTop: 4 }}>{stats?.totalDays || 0}</div>
// //             </div>
// //             <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
// //               <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Present</div>
// //               <div style={{ fontSize: 24, color: theme.colors.success, fontWeight: 700, marginTop: 4 }}>{stats?.presentDays || 0}</div>
// //             </div>
// //             <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
// //               <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Absent</div>
// //               <div style={{ fontSize: 24, color: theme.colors.danger, fontWeight: 700, marginTop: 4 }}>{(stats?.totalDays || 0) - (stats?.presentDays || 0)}</div>
// //             </div>
// //           </div>

// //           <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>Attendance History</h3>
// //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //             {(!stats?.attendanceHistory || stats.attendanceHistory.length === 0) ? (
// //               <div style={{ color: theme.colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>No attendance records found.</div>
// //             ) : (
// //               stats.attendanceHistory.map((record, i) => (
// //                 <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}` }}>
// //                   <div>
// //                     <div style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>{new Date(record.date).toLocaleDateString("en-IN", { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</div>
// //                   </div>
// //                   <div style={{
// //                     padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
// //                     background: record.status === 'Present' ? theme.colors.success + '20' : theme.colors.danger + '20',
// //                     color: record.status === 'Present' ? theme.colors.success : theme.colors.danger
// //                   }}>
// //                     {record.status}
// //                   </div>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (activeModule !== "dashboard") {
// //     return (
// //       <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 16 }}>
// //         <div style={{ width: 80, height: 80, borderRadius: 20, background: STUDENT_CONFIG.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{STUDENT_CONFIG.nav.find((n) => n.id === activeModule)?.icon || "◈"}</div>
// //         <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: theme.colors.text }}>{STUDENT_CONFIG.nav.find((n) => n.id === activeModule)?.label}</div>
// //         <div style={{ fontSize: 13, color: theme.colors.textMuted }}>This module is under development.</div>
// //       </div>
// //     );
// //   }

// //   // Cards mapped to Student API data
// //   const dynamicCards = [
// //     { label: "Attendance %", value: `${stats?.attendancePct || 0}%`, delta: "Overall", color: "#ffa657", icon: "◷" },
// //     { label: "Latest Result", value: stats?.latestResult || "—", delta: "Grade", color: "#3fb950", icon: "◈" },
// //     { label: "Upcoming Exams", value: stats?.upcomingExams || "0", delta: "Scheduled", color: "#f85149", icon: "◎" },
// //     { label: "Pending HW", value: stats?.pendingHW || "0", delta: "Due soon", color: "#d29922", icon: "◉" },
// //     { label: "Fee Due", value: stats?.feeDue > 0 ? `₹${stats.feeDue}` : "None", delta: stats?.feeDue > 0 ? "Overdue" : "Paid", color: stats?.feeDue > 0 ? "#f85149" : "#3fb950", icon: "◆" },
// //   ];

// //   const typeColors = { homework: "#58a6ff", exam: "#bc8cff", library: "#ffa657", notice: "#39d353" };

// //   return (
// //     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
// //       {/* Welcome Banner */}
// //       <div style={{ background: `linear-gradient(135deg, ${STUDENT_CONFIG.color}15 0%, transparent 60%)`, border: `1px solid ${STUDENT_CONFIG.color}30`, borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //         <div>
// //           <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, fontFamily: "'Syne', sans-serif" }}>Welcome back, {userName}! 📝</div>
// //           <div style={{ fontSize: 13, color: theme.colors.textMuted, marginTop: 4 }}>
// //             {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} · <span style={{ color: STUDENT_CONFIG.color }}>{STUDENT_CONFIG.label} Dashboard</span>
// //           </div>
// //         </div>
// //         <div style={{ fontSize: 48, opacity: 0.6 }}>{STUDENT_CONFIG.icon}</div>
// //       </div>

// //       {/* Info Banner */}
// //       <div style={{ background: "#ffa65715", border: "1px solid #ffa65740", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
// //         <span style={{ fontSize: 24 }}>💡</span>
// //         <div>
// //           <div style={{ fontSize: 13, fontWeight: 600, color: theme.colors.text }}>Student View</div>
// //           <div style={{ fontSize: 12, color: theme.colors.textMuted }}>Navigate to the Homework module to submit your pending assignments for this week.</div>
// //         </div>
// //       </div>

// //       {/* Stat Cards */}
// //       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
// //         {dynamicCards.map((card, i) => <StatCard key={i} {...card} index={i} />)}
// //       </div>

// //       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// //         {/* Attendance Donut Card */}
// //         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 20 }}>
// //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
// //             <div>
// //               <div style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text, fontFamily: "'Syne', sans-serif" }}>My Attendance</div>
// //               <div style={{ fontSize: 11, color: theme.colors.textMuted, marginTop: 2 }}>Current Academic Year</div>
// //             </div>
// //             <DonutChart pct={stats?.attendancePct || 0} color={STUDENT_CONFIG.color} size={70} />
// //           </div>
// //           <div style={{ display: "flex", gap: 10 }}>
// //             <div style={{ flex: 1, background: theme.colors.bg, borderRadius: 8, padding: 12, border: `1px solid ${theme.colors.border}`, textAlign: 'center' }}>
// //               <div style={{ fontSize: 11, color: theme.colors.textMuted }}>Target</div>
// //               <div style={{ fontSize: 14, fontWeight: 700, color: theme.colors.success, marginTop: 4 }}>75%</div>
// //             </div>
// //             <div style={{ flex: 1, background: theme.colors.bg, borderRadius: 8, padding: 12, border: `1px solid ${theme.colors.border}`, textAlign: 'center' }}>
// //               <div style={{ fontSize: 11, color: theme.colors.textMuted }}>Current</div>
// //               <div style={{ fontSize: 14, fontWeight: 700, color: STUDENT_CONFIG.color, marginTop: 4 }}>{stats?.attendancePct || 0}%</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Recent Activity */}
// //         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 20 }}>
// //           <div style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Recent Updates</div>
// //           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
// //             {activities.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 12 }}>No recent updates.</div> :
// //               activities.map((a, i) => (
// //                 <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
// //                   <div style={{ width: 8, height: 8, borderRadius: "50%", background: typeColors[a.type] || "#8b949e", marginTop: 4, flexShrink: 0 }} />
// //                   <div style={{ flex: 1 }}>
// //                     <div style={{ fontSize: 12, color: theme.colors.text }}>{a.text}</div>
// //                     <div style={{ fontSize: 11, color: theme.colors.textMuted, marginTop: 2 }}>{a.time}</div>
// //                   </div>
// //                 </div>
// //               ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────
// // export default function StudentDashboard() {
// //   const navigate = useNavigate();
// //   const [userName, setUserName] = useState("");
// //   const [activeModule, setActiveModule] = useState("dashboard");
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [stats, setStats] = useState(null);
// //   const [activities, setActivities] = useState([]);

// //   useEffect(() => {
// //     const userStr = localStorage.getItem("user");
// //     const token = localStorage.getItem("token");

// //     if (!userStr || !token) {
// //       navigate("/login");
// //       return;
// //     }

// //     const user = JSON.parse(userStr);
// //     if (user.role !== 'Student' && user.role !== 'Admin') {
// //       navigate("/"); // Kick out if not a student or admin
// //       return;
// //     }
// //     setUserName(user.name);

// //     // Fetch Student API Data
// //     const loadData = async () => {
// //       try {
// //         const [statsRes, actRes] = await Promise.all([fetchStudentStats(), fetchStudentActivity()]);
// //         if (statsRes.success) setStats(statsRes.data);
// //         if (actRes.success) setActivities(actRes.data);
// //       } catch (err) {
// //         console.error("Failed to load dashboard data", err);
// //       }
// //     };
// //     loadData();
// //   }, [navigate]);

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
// //         * { box-sizing: border-box; margin: 0; padding: 0; }
// //         body { background: ${theme.colors.bg}; color: ${theme.colors.text}; font-family: 'DM Sans', sans-serif; }
// //         @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
// //       `}</style>

// //       <div style={{ display: "flex", minHeight: "100vh", background: theme.colors.bg }}>

// //         {/* Sidebar */}
// //         <aside style={{ width: collapsed ? 64 : 240, minHeight: "100vh", background: theme.colors.surface, borderRight: `1px solid ${theme.colors.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s ease", overflow: "hidden", position: "relative", zIndex: 10 }}>
// //           <div style={{ padding: collapsed ? "20px 0" : "20px 16px", borderBottom: `1px solid ${theme.colors.border}`, display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start" }}>
// //             <div style={{ width: 32, height: 32, borderRadius: 8, background: STUDENT_CONFIG.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{STUDENT_CONFIG.icon}</div>
// //             {!collapsed && (
// //               <div>
// //                 <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: theme.colors.text, letterSpacing: "0.02em" }}>ABHYAAS</div>
// //                 <div style={{ fontSize: 10, color: STUDENT_CONFIG.color, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Student Portal</div>
// //               </div>
// //             )}
// //           </div>
// //           <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
// //             {STUDENT_CONFIG.nav.map((item) => {
// //               const isActive = activeModule === item.id;
// //               return (
// //                 <div key={item.id} onClick={() => setActiveModule(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px 0" : "9px 16px", margin: "1px 8px", borderRadius: 8, cursor: "pointer", background: isActive ? `${STUDENT_CONFIG.color}18` : "transparent", borderLeft: isActive ? `2px solid ${STUDENT_CONFIG.color}` : "2px solid transparent", transition: "all 0.15s ease", justifyContent: collapsed ? "center" : "flex-start" }}>
// //                   <span style={{ fontSize: 16, color: isActive ? STUDENT_CONFIG.color : theme.colors.textMuted, width: 20, textAlign: "center" }}>{item.icon}</span>
// //                   {!collapsed && <span style={{ fontSize: 13, color: isActive ? STUDENT_CONFIG.color : theme.colors.textMuted, fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap" }}>{item.label}</span>}
// //                 </div>
// //               );
// //             })}
// //           </nav>
// //           <div onClick={() => setCollapsed(!collapsed)} style={{ padding: "16px", borderTop: `1px solid ${theme.colors.border}`, cursor: "pointer", display: "flex", justifyContent: collapsed ? "center" : "flex-end", color: theme.colors.textMuted, fontSize: 18 }}>
// //             {collapsed ? "→" : "←"}
// //           </div>
// //         </aside>

// //         {/* Main Content Area */}
// //         <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

// //           {/* Topbar */}
// //           <header style={{ height: 60, background: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 16, position: "sticky", top: 0, zIndex: 9 }}>
// //             <div style={{ flex: 1 }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //                 <span style={{ fontSize: 11, color: theme.colors.textMuted }}>Student</span>
// //                 <span style={{ color: theme.colors.textFaint, fontSize: 11 }}>›</span>
// //                 <span style={{ fontSize: 13, color: theme.colors.text, fontWeight: 600 }}>{STUDENT_CONFIG.nav.find((n) => n.id === activeModule)?.label || "Dashboard"}</span>
// //               </div>
// //             </div>
// //             <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login"); }} style={{ background: theme.colors.surfaceHover, border: `1px solid ${theme.colors.border}`, borderRadius: 8, padding: "6px 12px", color: theme.colors.danger, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
// //               Logout
// //             </button>
// //           </header>

// //           <main style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
// //             <DashboardContent activeModule={activeModule} userName={userName} stats={stats} activities={activities} />
// //           </main>

// //         </div>
// //       </div>
// //     </>
// //   );
// // }



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // ─── SAFE API FETCHERS ───
// const BASE_URL = 'http://localhost:5000/api/student';
// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   'Authorization': `Bearer ${localStorage.getItem('token')}`
// });

// const fetchStudentProfile = async () => (await fetch(`${BASE_URL}/profile`, { headers: getHeaders() })).json();
// const fetchStudentStats = async () => (await fetch(`${BASE_URL}/dashboard/stats`, { headers: getHeaders() })).json();
// const fetchStudentActivity = async () => (await fetch(`${BASE_URL}/dashboard/activity`, { headers: getHeaders() })).json();
// const fetchStudentFees = async () => (await fetch(`${BASE_URL}/my-fees`, { headers: getHeaders() })).json();
// const fetchStudentExams = async () => (await fetch(`${BASE_URL}/my-results`, { headers: getHeaders() })).json();

// // ─── DESIGN SYSTEM ───
// const theme = {
//   colors: {
//     bg: "#0d1117", surface: "#161b22", surfaceHover: "#1c2128", border: "#30363d",
//     text: "#e6edf3", textMuted: "#8b949e", textFaint: "#484f58",
//     studentColor: "#ffa657", success: "#3fb950", warning: "#d29922", danger: "#f85149",
//     accent: "#58a6ff", purple: "#bc8cff"
//   },
// };

// const STUDENT_CONFIG = {
//   label: "Student", icon: "🎒", color: theme.colors.studentColor,
//   gradient: "linear-gradient(135deg, #ffa657 0%, #e0713b 100%)",
//   nav: [
//     { id: "dashboard", icon: "◈", label: "Dashboard" },
//     { id: "profile", icon: "◉", label: "My Profile" },
//     { id: "attendance", icon: "◷", label: "My Attendance" },
//     { id: "results", icon: "◈", label: "Exam Results" },
//     { id: "fees", icon: "◆", label: "Fee Status" },
//   ]
// };

// // ─── UI COMPONENTS ───
// function DonutChart({ pct, color, size = 80 }) {
//   const r = (size - 10) / 2;
//   const circ = 2 * Math.PI * r;
//   const dash = (pct / 100) * circ;
//   return (
//     <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
//       <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={theme.colors.border} strokeWidth={8} />
//       <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
//     </svg>
//   );
// }

// function StatCard({ label, value, delta, color, icon, index }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
//       style={{
//         background: theme.colors.surface, border: `1px solid ${hovered ? color + "60" : theme.colors.border}`,
//         borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "all 0.2s ease",
//         transform: hovered ? "translateY(-2px)" : "none", boxShadow: hovered ? `0 8px 24px ${color}20` : "none",
//         animation: `fadeInUp 0.4s ease ${index * 0.06}s both`,
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
//         <div>
//           <div style={{ fontSize: 11, color: theme.colors.textMuted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
//           <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.text, marginTop: 6, fontFamily: "'Syne', sans-serif" }}>{value}</div>
//           <div style={{ fontSize: 12, color: color, marginTop: 4, fontWeight: 500 }}>{delta}</div>
//         </div>
//         <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: color }}>{icon}</div>
//       </div>
//     </div>
//   );
// }

// // 🟢 NEW: Dedicated Fee Component to fix the React Refresh Bug
// function FeeModule() {
//   const [fees, setFees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudentFees().then(res => {
//       if(res.success) setFees(res.data || []);
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24 }}>
//         <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>My Fee Ledger</h2>
//         {loading ? <p style={{color: theme.colors.textMuted}}>Loading your fees...</p> : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {fees.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 14 }}>No fee records found.</div> :
//               fees.map((f, i) => {
//                 const amount = Number(f.amount) || 0;
//                 const paid = Number(f.paidAmount) || 0;
//                 const balance = amount - paid;
                
//                 return (
//                   <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}` }}>
//                     <div>
//                       <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text }}>{f.feeType || 'School Fee'}</div>
//                       <div style={{ fontSize: 12, color: theme.colors.textMuted, marginTop: 4 }}>Due: {f.dueDate ? new Date(f.dueDate).toLocaleDateString('en-IN') : 'N/A'}</div>
//                     </div>
//                     <div style={{ textAlign: 'right' }}>
//                       <div style={{ fontSize: 16, fontWeight: 800, color: theme.colors.text }}>Total: ₹{amount.toLocaleString()}</div>
                      
//                       {/* 🟢 FIXED: Shows exactly what was paid and what is left! */}
//                       {paid > 0 && <div style={{ fontSize: 13, color: theme.colors.success, marginTop: 2, fontWeight: 600 }}>Paid: ₹{paid.toLocaleString()}</div>}
//                       {balance > 0 && <div style={{ fontSize: 13, color: theme.colors.danger, marginTop: 2, fontWeight: 600 }}>Balance: ₹{balance.toLocaleString()}</div>}
                      
//                       <div style={{
//                         marginTop: 8, display: 'inline-block', padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
//                         background: f.status === 'Paid' ? theme.colors.success + '20' : theme.colors.warning + '20',
//                         color: f.status === 'Paid' ? theme.colors.success : theme.colors.warning
//                       }}>
//                         {f.status}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             }
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // 🟢 NEW: Dedicated Results Component to fix the React Refresh Bug
// function ResultsModule() {
//   const [exams, setExams] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudentExams().then(res => {
//       if(res.success) setExams(res.data || []);
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24 }}>
//         <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>My Exam Results</h2>
//         {loading ? <p style={{color: theme.colors.textMuted}}>Loading your results...</p> : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {exams.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 14 }}>No exam results published yet.</div> :
//               exams.map((e, i) => (
//                 <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}` }}>
//                   <div>
//                     <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text }}>{e.exam?.name || "Exam"}</div>
//                     <div style={{ fontSize: 12, color: theme.colors.accent, marginTop: 4, fontWeight: 600 }}>{e.exam?.subject || "Subject"}</div>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//                     <div style={{ textAlign: 'right' }}>
//                       <div style={{ fontSize: 12, color: theme.colors.textMuted }}>Score</div>
//                       <div style={{ fontSize: 16, fontWeight: 800, color: theme.colors.text }}>{e.marksObtained} / {e.exam?.totalMarks || 100}</div>
//                     </div>
//                     <div style={{ width: 40, height: 40, borderRadius: '50%', background: theme.colors.purple+'20', color: theme.colors.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800 }}>
//                       {e.grade}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             }
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── MAIN DASHBOARD CONTENT ROUTER ───
// function DashboardContent({ activeModule, userName, stats, activities, profile }) {
  
//   // 1. MY PROFILE
//   if (activeModule === "profile") {
//     if (!profile) return <div style={{ color: theme.colors.textMuted, padding: 40, textAlign: 'center' }}>Loading Profile...</div>;
//     if (profile.error) return <div style={{ color: theme.colors.danger, padding: 40, textAlign: 'center' }}>Could not load profile. Please contact Admin.</div>;
    
//     const InfoRow = ({ label, value }) => (
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
//         <span style={{ fontSize: 11, color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{label}</span>
//         <span style={{ fontSize: 14, color: theme.colors.text, fontWeight: 500 }}>{value || '—'}</span>
//       </div>
//     );
//     return (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 }}>
//         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 16, overflow: 'hidden' }}>
//           <div style={{ height: 120, background: STUDENT_CONFIG.gradient, position: 'relative' }}>
//             <div style={{ position: 'absolute', bottom: -40, left: 30, width: 90, height: 90, borderRadius: '50%', background: theme.colors.surface, border: `4px solid ${theme.colors.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
//               {profile.profilePhotoUrl ? <img src={profile.profilePhotoUrl} alt="DP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 32 }}>🎒</span>}
//             </div>
//           </div>
//           <div style={{ padding: '50px 30px 30px 30px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
//               <div>
//                 <h2 style={{ fontSize: 24, fontWeight: 800, color: theme.colors.text, fontFamily: "'Syne', sans-serif" }}>{profile.name}</h2>
//                 <div style={{ fontSize: 14, color: STUDENT_CONFIG.color, fontWeight: 600, marginTop: 4 }}>Roll No: {profile.rollNo}</div>
//               </div>
//               <div style={{ display: 'flex', gap: 8 }}>
//                 <span style={{ padding: '6px 14px', borderRadius: 20, background: theme.colors.accent+'20', color: theme.colors.accent, fontSize: 12, fontWeight: 700 }}>Class {profile.classId?.name || profile.standard} {profile.section}</span>
//                 {profile.house && <span style={{ padding: '6px 14px', borderRadius: 20, background: theme.colors.purple+'20', color: theme.colors.purple, fontSize: 12, fontWeight: 700 }}>{profile.house} House</span>}
//               </div>
//             </div>
//             <div style={{ borderTop: `1px solid ${theme.colors.border}`, marginTop: 24, paddingTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px' }}>
//               <div style={{ gridColumn: '1 / -1', fontSize: 14, fontWeight: 700, color: theme.colors.text, marginBottom: 8 }}>Personal Details</div>
//               <InfoRow label="Email Address" value={profile.email} />
//               <InfoRow label="Phone Number" value={profile.phone} />
//               <InfoRow label="Date of Birth" value={profile.dob ? new Date(profile.dob).toLocaleDateString() : null} />
//               <InfoRow label="Blood Group" value={profile.bloodGroup} />
//               <div style={{ gridColumn: '1 / -1', fontSize: 14, fontWeight: 700, color: theme.colors.text, marginBottom: 8, marginTop: 16 }}>Guardian Details</div>
//               <InfoRow label="Parent/Guardian Name" value={profile.fatherName || profile.parentName} />
//               <InfoRow label="Parent Contact" value={profile.parentPhone} />
//               <div style={{ gridColumn: '1 / -1' }}><InfoRow label="Residential Address" value={profile.address} /></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 2. ATTENDANCE
//   if (activeModule === "attendance") {
//     return (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24 }}>
//           <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>Attendance Dashboard</h2>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
//             <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
//               <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Total Days</div>
//               <div style={{ fontSize: 24, color: theme.colors.text, fontWeight: 700, marginTop: 4 }}>{stats?.totalDays || 0}</div>
//             </div>
//             <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
//               <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Present</div>
//               <div style={{ fontSize: 24, color: theme.colors.success, fontWeight: 700, marginTop: 4 }}>{stats?.presentDays || 0}</div>
//             </div>
//             <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
//               <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Absent</div>
//               <div style={{ fontSize: 24, color: theme.colors.danger, fontWeight: 700, marginTop: 4 }}>{(stats?.totalDays || 0) - (stats?.presentDays || 0)}</div>
//             </div>
//           </div>

//           <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>Attendance History</h3>
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {(!stats?.attendanceHistory || stats.attendanceHistory.length === 0) ? (
//               <div style={{ color: theme.colors.textMuted, fontSize: 13, textAlign: "center", padding: 20 }}>No attendance records found.</div>
//             ) : (
//               stats.attendanceHistory.map((record, i) => (
//                 <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}` }}>
//                   <div style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>
//                     {new Date(record.date).toLocaleDateString("en-IN", { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
//                   </div>
//                   <div style={{
//                     padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
//                     background: record.status === 'Present' ? theme.colors.success + '20' : theme.colors.danger + '20',
//                     color: record.status === 'Present' ? theme.colors.success : theme.colors.danger
//                   }}>
//                     {record.status}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 3. FEES
//   if (activeModule === "fees") return <FeeModule />;

//   // 4. RESULTS
//   if (activeModule === "results") return <ResultsModule />;


//   // 5. MAIN DASHBOARD OVERVIEW (Default)
//   const dynamicCards = [
//     { label: "Attendance %", value: `${stats?.attendancePct || 0}%`, delta: "Overall", color: "#ffa657", icon: "◷" },
//     { label: "Latest Result", value: stats?.latestResult || "—", delta: "Grade", color: "#3fb950", icon: "◈" },
//     { label: "Upcoming Exams", value: stats?.upcomingExams || "0", delta: "Scheduled", color: "#f85149", icon: "◎" },
//     { label: "Fee Due", value: stats?.feeDue > 0 ? `₹${stats.feeDue.toLocaleString()}` : "None", delta: stats?.feeDue > 0 ? "Overdue" : "Paid", color: stats?.feeDue > 0 ? "#f85149" : "#3fb950", icon: "◆" },
//   ];

//   const typeColors = { homework: "#58a6ff", exam: "#bc8cff", library: "#ffa657", notice: "#39d353" };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <div style={{ background: `linear-gradient(135deg, ${STUDENT_CONFIG.color}15 0%, transparent 60%)`, border: `1px solid ${STUDENT_CONFIG.color}30`, borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <div>
//           <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, fontFamily: "'Syne', sans-serif" }}>Welcome back, {userName}! 📝</div>
//           <div style={{ fontSize: 13, color: theme.colors.textMuted, marginTop: 4 }}>
//             {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} · <span style={{ color: STUDENT_CONFIG.color }}>{STUDENT_CONFIG.label} Dashboard</span>
//           </div>
//         </div>
//         <div style={{ fontSize: 48, opacity: 0.6 }}>{STUDENT_CONFIG.icon}</div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
//         {dynamicCards.map((card, i) => <StatCard key={i} {...card} index={i} />)}
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 20 }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <div>
//               <div style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text, fontFamily: "'Syne', sans-serif" }}>My Attendance</div>
//               <div style={{ fontSize: 11, color: theme.colors.textMuted, marginTop: 2 }}>Current Academic Year</div>
//             </div>
//             <DonutChart pct={stats?.attendancePct || 0} color={STUDENT_CONFIG.color} size={70} />
//           </div>
//         </div>

//         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 20 }}>
//           <div style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>Recent Updates</div>
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {activities.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 12 }}>No recent updates.</div> :
//               activities.map((a, i) => (
//                 <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
//                   <div style={{ width: 8, height: 8, borderRadius: "50%", background: typeColors[a.type] || "#8b949e", marginTop: 4, flexShrink: 0 }} />
//                   <div style={{ flex: 1 }}>
//                     <div style={{ fontSize: 12, color: theme.colors.text }}>{a.text}</div>
//                     <div style={{ fontSize: 11, color: theme.colors.textMuted, marginTop: 2 }}>{a.time}</div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── MAIN WRAPPER COMPONENT ───
// export default function StudentDashboard() {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("");
//   const [activeModule, setActiveModule] = useState("dashboard");
//   const [collapsed, setCollapsed] = useState(false);
  
//   const [stats, setStats] = useState(null);
//   const [activities, setActivities] = useState([]);
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const userStr = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (!userStr || !token) {
//       navigate("/login");
//       return;
//     }

//     const user = JSON.parse(userStr);
//     if (user.role !== 'Student' && user.role !== 'Admin') {
//       navigate("/");
//       return;
//     }
//     setUserName(user.name);

//     const loadData = async () => {
//       try {
//         const [statsRes, actRes, profRes] = await Promise.all([
//           fetchStudentStats(), 
//           fetchStudentActivity(),
//           fetchStudentProfile()
//         ]);
//         if (statsRes.success) setStats(statsRes.data);
//         if (actRes.success) setActivities(actRes.data);
        
//         if (profRes.success && profRes.data) {
//           setProfile(profRes.data);
//         } else {
//           setProfile({ error: true }); 
//         }
//       } catch (err) {
//         console.error("Failed to load dashboard data", err);
//       }
//     };
//     loadData();
//   }, [navigate]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: ${theme.colors.bg}; color: ${theme.colors.text}; font-family: 'DM Sans', sans-serif; }
//         @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>

//       <div style={{ display: "flex", minHeight: "100vh", background: theme.colors.bg }}>
        
//         <aside style={{ width: collapsed ? 64 : 240, minHeight: "100vh", background: theme.colors.surface, borderRight: `1px solid ${theme.colors.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s ease", overflow: "hidden", position: "relative", zIndex: 10 }}>
//           <div style={{ padding: collapsed ? "20px 0" : "20px 16px", borderBottom: `1px solid ${theme.colors.border}`, display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start" }}>
//             <div style={{ width: 32, height: 32, borderRadius: 8, background: STUDENT_CONFIG.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{STUDENT_CONFIG.icon}</div>
//             {!collapsed && (
//               <div>
//                 <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: theme.colors.text, letterSpacing: "0.02em" }}>ABHYAAS</div>
//                 <div style={{ fontSize: 10, color: STUDENT_CONFIG.color, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Student Portal</div>
//               </div>
//             )}
//           </div>
//           <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
//             {STUDENT_CONFIG.nav.map((item) => {
//               const isActive = activeModule === item.id;
//               return (
//                 <div key={item.id} onClick={() => setActiveModule(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px 0" : "9px 16px", margin: "1px 8px", borderRadius: 8, cursor: "pointer", background: isActive ? `${STUDENT_CONFIG.color}18` : "transparent", borderLeft: isActive ? `2px solid ${STUDENT_CONFIG.color}` : "2px solid transparent", transition: "all 0.15s ease", justifyContent: collapsed ? "center" : "flex-start" }}>
//                   <span style={{ fontSize: 16, color: isActive ? STUDENT_CONFIG.color : theme.colors.textMuted, width: 20, textAlign: "center" }}>{item.icon}</span>
//                   {!collapsed && <span style={{ fontSize: 13, color: isActive ? STUDENT_CONFIG.color : theme.colors.textMuted, fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap" }}>{item.label}</span>}
//                 </div>
//               );
//             })}
//           </nav>
//           <div onClick={() => setCollapsed(!collapsed)} style={{ padding: "16px", borderTop: `1px solid ${theme.colors.border}`, cursor: "pointer", display: "flex", justifyContent: collapsed ? "center" : "flex-end", color: theme.colors.textMuted, fontSize: 18 }}>
//             {collapsed ? "→" : "←"}
//           </div>
//         </aside>

//         <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
//           <header style={{ height: 60, background: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 16, position: "sticky", top: 0, zIndex: 9 }}>
//             <div style={{ flex: 1 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                 <span style={{ fontSize: 11, color: theme.colors.textMuted }}>Student</span>
//                 <span style={{ color: theme.colors.textFaint, fontSize: 11 }}>›</span>
//                 <span style={{ fontSize: 13, color: theme.colors.text, fontWeight: 600 }}>{STUDENT_CONFIG.nav.find((n) => n.id === activeModule)?.label || "Dashboard"}</span>
//               </div>
//             </div>
//             <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login"); }} style={{ background: theme.colors.surfaceHover, border: `1px solid ${theme.colors.border}`, borderRadius: 8, padding: "6px 12px", color: theme.colors.danger, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
//               Logout
//             </button>
//           </header>

//           <main style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
//             <DashboardContent activeModule={activeModule} userName={userName} stats={stats} activities={activities} profile={profile} />
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // ─── SAFE API FETCHERS ───
// const API_BASE = 'http://localhost:5000/api'; // Global API Base
// const STUDENT_BASE = `${API_BASE}/student`;   // Student Specific Base

// const getHeaders = () => ({
//   'Content-Type': 'application/json',
//   'Authorization': `Bearer ${localStorage.getItem('token')}`
// });

// // Profile & Dashboard
// const fetchStudentProfile = async () => (await fetch(`${STUDENT_BASE}/profile`, { headers: getHeaders() })).json();
// const fetchStudentStats = async () => (await fetch(`${STUDENT_BASE}/dashboard/stats`, { headers: getHeaders() })).json();
// const fetchStudentActivity = async () => (await fetch(`${STUDENT_BASE}/dashboard/activity`, { headers: getHeaders() })).json();

// // Fees, Exams & Results
// const fetchStudentFees = async () => (await fetch(`${STUDENT_BASE}/my-fees`, { headers: getHeaders() })).json();
// const fetchStudentResults = async () => (await fetch(`${STUDENT_BASE}/my-results`, { headers: getHeaders() })).json();
// const fetchUpcomingExams = async (standard) => (await fetch(`${API_BASE}/exams?standard=${standard}`, { headers: getHeaders() })).json();

// // Library
// const fetchLibraryBooks = async () => (await fetch(`${API_BASE}/library/books`, { headers: getHeaders() })).json();
// const fetchMyLibraryIssues = async (studentId) => (await fetch(`${API_BASE}/library/issues?studentId=${studentId}`, { headers: getHeaders() })).json();


// // ─── DESIGN SYSTEM (Admin Light Theme) ───
// const theme = {
//   colors: {
//     bg: "#f8fafc", surface: "#ffffff", surfaceHover: "#f1f5f9", border: "#e2e8f0",
//     text: "#1e293b", textMuted: "#64748b", textFaint: "#94a3b8",
//     studentColor: "#3b82f6", success: "#10b981", warning: "#f59e0b", danger: "#ef4444",
//     accent: "#0ea5e9", purple: "#8b5cf6"
//   },
// };

// const STUDENT_CONFIG = {
//   label: "Student Portal", icon: "👨‍🎓", color: theme.colors.studentColor,
//   gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
//   nav: [
//     { id: "dashboard", icon: "📊", label: "Dashboard overview" },
//     { id: "profile", icon: "👤", label: "My Profile" },
//     { id: "attendance", icon: "📅", label: "My Attendance" },
//     { id: "fees", icon: "💳", label: "Fee Status" },
//     { id: "announcements", icon: "📢", label: "Announcements" },
//     { id: "exams", icon: "📝", label: "Upcoming Exams" },
//     { id: "results", icon: "🏆", label: "Academic Records" },
//     { id: "library", icon: "📖", label: "E-Library" },
//   ]
// };

// // ─── UI COMPONENTS ───
// function DonutChart({ pct, color, size = 80 }) {
//   const r = (size - 10) / 2;
//   const circ = 2 * Math.PI * r;
//   const dash = (pct / 100) * circ;
//   return (
//     <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
//       <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={theme.colors.border} strokeWidth={8} />
//       <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
//     </svg>
//   );
// }

// function StatCard({ label, value, delta, color, icon, index }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
//       style={{
//         background: theme.colors.surface, border: `1px solid ${hovered ? color + "60" : theme.colors.border}`,
//         borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "all 0.2s ease",
//         transform: hovered ? "translateY(-2px)" : "none", boxShadow: hovered ? `0 8px 24px ${color}15` : "0 1px 3px rgba(0,0,0,0.05)",
//         animation: `fadeInUp 0.4s ease ${index * 0.06}s both`,
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
//         <div>
//           <div style={{ fontSize: 12, color: theme.colors.textMuted, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
//           <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.text, marginTop: 6, fontFamily: "'Inter', sans-serif" }}>{value}</div>
//           <div style={{ fontSize: 12, color: color, marginTop: 4, fontWeight: 600 }}>{delta}</div>
//         </div>
//         <div style={{ width: 44, height: 44, borderRadius: 12, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: color }}>{icon}</div>
//       </div>
//     </div>
//   );
// }

// // ─── INDIVIDUAL MODULES ───

// function FeeModule() {
//   const [fees, setFees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudentFees().then(res => {
//       if(res.success) setFees(res.data || []);
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//         <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>My Fee Ledger</h2>
//         {loading ? <p style={{color: theme.colors.textMuted}}>Loading your fees...</p> : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {fees.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 14 }}>No fee records found.</div> :
//               fees.map((f, i) => {
//                 const amount = Number(f.amount) || 0;
//                 const paid = Number(f.paidAmount) || 0;
//                 const balance = amount - paid;
                
//                 return (
//                   <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}` }}>
//                     <div>
//                       <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text }}>{f.feeType || 'School Fee'}</div>
//                       <div style={{ fontSize: 13, color: theme.colors.textMuted, marginTop: 4 }}>Due: {f.dueDate ? new Date(f.dueDate).toLocaleDateString('en-IN') : 'N/A'}</div>
//                     </div>
//                     <div style={{ textAlign: 'right' }}>
//                       <div style={{ fontSize: 16, fontWeight: 800, color: theme.colors.text }}>Total: ₹{amount.toLocaleString()}</div>
//                       {paid > 0 && <div style={{ fontSize: 13, color: theme.colors.success, marginTop: 2, fontWeight: 600 }}>Paid: ₹{paid.toLocaleString()}</div>}
//                       {balance > 0 && <div style={{ fontSize: 13, color: theme.colors.danger, marginTop: 2, fontWeight: 600 }}>Balance: ₹{balance.toLocaleString()}</div>}
//                       <div style={{
//                         marginTop: 8, display: 'inline-block', padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
//                         background: f.status === 'Paid' ? theme.colors.success + '15' : theme.colors.warning + '15',
//                         color: f.status === 'Paid' ? theme.colors.success : theme.colors.warning
//                       }}>
//                         {f.status}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             }
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function AnnouncementsModule() {
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${API_BASE}/announcements`, { headers: getHeaders() })
//       .then(res => res.json())
//       .then(res => {
//         if(res.success) setAnnouncements(res.data || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const priorityColors = { Normal: theme.colors.textMuted, Important: theme.colors.warning, Urgent: theme.colors.danger };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//         <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>School Announcements</h2>
//         {loading ? <p style={{color: theme.colors.textMuted}}>Loading announcements...</p> : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             {announcements.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 14 }}>No recent announcements.</div> :
//               announcements.map((a, i) => {
//                 const pColor = priorityColors[a.priority] || theme.colors.accent;
//                 return (
//                   <div key={i} style={{ padding: "20px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, borderLeft: `4px solid ${pColor}` }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
//                       <div>
//                         <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: pColor + '15', color: pColor, display: 'inline-block', marginBottom: 8, border: `1px solid ${pColor}44` }}>
//                           {a.priority === 'Urgent' ? '🔴' : a.priority === 'Important' ? '🟡' : '⚪'} {a.priority}
//                         </span>
//                         <div style={{ fontSize: 17, fontWeight: 800, color: theme.colors.text }}>{a.title}</div>
//                       </div>
//                       <div style={{ fontSize: 12, color: theme.colors.textMuted, fontWeight: 600 }}>{new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
//                     </div>
//                     <div style={{ fontSize: 14, color: theme.colors.textMuted, lineHeight: 1.6 }}>{a.content}</div>
//                     <div style={{ fontSize: 12, color: theme.colors.textFaint, marginTop: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
//                       <span style={{ fontSize: 14 }}>✍️</span> Posted by Management
//                     </div>
//                   </div>
//                 );
//               })
//             }
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // 🟢 NEW: Upcoming Examinations Module
// function ExaminationsModule({ profile }) {
//   const [exams, setExams] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!profile?.standard) return;
//     fetchUpcomingExams(profile.standard).then(res => {
//       if(res.success) {
//         // Filter to only show exams that haven't happened yet
//         const upcoming = (res.data || []).filter(e => new Date(e.date) >= new Date());
//         setExams(upcoming);
//       }
//       setLoading(false);
//     });
//   }, [profile]);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//         <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>Upcoming Examinations</h2>
//         {loading ? <p style={{color: theme.colors.textMuted}}>Loading exam schedule...</p> : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {exams.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 14, padding: 20, textAlign: 'center', background: theme.colors.bg, borderRadius: 8 }}>No upcoming exams scheduled for Class {profile.standard}. Relax! 🎉</div> :
//               exams.map((e, i) => (
//                 <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, borderLeft: `4px solid ${theme.colors.accent}` }}>
//                   <div>
//                     <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text }}>{e.name}</div>
//                     <div style={{ fontSize: 13, color: theme.colors.accent, marginTop: 4, fontWeight: 600 }}>{e.subject}</div>
//                   </div>
//                   <div style={{ textAlign: 'right' }}>
//                     <div style={{ fontSize: 14, fontWeight: 800, color: theme.colors.text }}>📅 {new Date(e.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
//                     <div style={{ fontSize: 12, color: theme.colors.textMuted, marginTop: 4 }}>Duration: {e.duration} mins | Max Marks: {e.totalMarks}</div>
//                   </div>
//                 </div>
//               ))
//             }
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // 🟢 RENAMED & REFINED: Academic Records (Marks Entry reflection)
// function ResultsModule() {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudentResults().then(res => {
//       if(res.success) setResults(res.data || []);
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//         <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>Academic Records & Marks</h2>
//         {loading ? <p style={{color: theme.colors.textMuted}}>Loading your academic records...</p> : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {results.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 14, padding: 20, textAlign: 'center', background: theme.colors.bg, borderRadius: 8 }}>No marks have been published yet.</div> :
//               results.map((r, i) => (
//                 <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}` }}>
//                   <div>
//                     <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text }}>{r.exam?.name || "Assessment"}</div>
//                     <div style={{ fontSize: 13, color: theme.colors.purple, marginTop: 4, fontWeight: 600 }}>{r.exam?.subject || "Subject"}</div>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//                     <div style={{ textAlign: 'right' }}>
//                       <div style={{ fontSize: 12, color: theme.colors.textMuted }}>Marks Obtained</div>
//                       <div style={{ fontSize: 18, fontWeight: 800, color: theme.colors.text }}>{r.marksObtained} <span style={{fontSize: 14, color: theme.colors.textMuted}}>/ {r.totalMarks || r.exam?.totalMarks || 100}</span></div>
//                     </div>
//                     <div style={{ width: 44, height: 44, borderRadius: '12px', background: theme.colors.success+'15', color: theme.colors.success, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, border: `1px solid ${theme.colors.success}44` }}>
//                       {r.grade || 'P'}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             }
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // 🟢 NEW: E-Library Catalog & Borrowed Books
// // 🟢 NEW: E-Library with Direct Online Links!
// function LibraryModule() {
//   // You can change these links to whatever you want!
//   const eLibraryResources = [
//     { title: "Mathematics (NCERT Textbooks)", category: "Textbook", source: "NCERT Official", link: "https://ncert.nic.in/textbook.php", color: theme.colors.accent },
//     { title: "Physics Concepts & Videos", category: "Reference", source: "Khan Academy", link: "https://www.khanacademy.org/science/physics", color: theme.colors.purple },
//     { title: "English Grammar Rules", category: "Language", source: "GrammarBook", link: "https://www.grammarbook.com/", color: theme.colors.warning },
//     { title: "World History Archive", category: "History", source: "History.com", link: "https://www.history.com/", color: theme.colors.danger },
//     { title: "Computer Science Basics", category: "Technology", source: "Code.org", link: "https://code.org/", color: theme.colors.success },
//     { title: "Chemistry Periodic Table", category: "Science", source: "Ptable", link: "https://ptable.com/", color: theme.colors.studentColor }
//   ];

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//         <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 6 }}>Digital E-Library</h2>
//         <p style={{ color: theme.colors.textMuted, fontSize: 14, marginBottom: 24 }}>Access free online educational resources, textbooks, and reference materials.</p>
        
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
//           {eLibraryResources.map((book, i) => (
//             <div key={i} style={{ padding: "20px", background: theme.colors.bg, borderRadius: 12, border: `1px solid ${theme.colors.border}`, borderTop: `4px solid ${book.color}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//               <div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
//                   <span style={{ fontSize: 11, padding: '4px 10px', background: book.color + '15', color: book.color, borderRadius: 6, fontWeight: 700, border: `1px solid ${book.color}33` }}>
//                     {book.category}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: 16, fontWeight: 800, color: theme.colors.text, marginBottom: 6, lineHeight: 1.4 }}>{book.title}</div>
//                 <div style={{ fontSize: 13, color: theme.colors.textMuted, marginBottom: 20 }}>Source: <span style={{fontWeight: 600}}>{book.source}</span></div>
//               </div>
              
//               {/* Clickable Link Button */}
//               <a href={book.link} target="_blank" rel="noopener noreferrer" 
//                 style={{ display: 'block', textAlign: 'center', padding: '10px', background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 8, color: theme.colors.text, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s', fontSize: 13 }} 
//                 onMouseOver={e => { e.currentTarget.style.background = book.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = book.color; }} 
//                 onMouseOut={e => { e.currentTarget.style.background = theme.colors.surface; e.currentTarget.style.color = theme.colors.text; e.currentTarget.style.borderColor = theme.colors.border; }}>
//                 Read Online ↗
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// // ─── MAIN DASHBOARD CONTENT ROUTER ───
// function DashboardContent({ activeModule, userName, stats, activities, profile }) {
  
//   // 1. MY PROFILE
//   if (activeModule === "profile") {
//     if (!profile) return <div style={{ color: theme.colors.textMuted, padding: 40, textAlign: 'center' }}>Loading Profile...</div>;
//     if (profile.error) return <div style={{ color: theme.colors.danger, padding: 40, textAlign: 'center' }}>Could not load profile. Please contact Admin.</div>;
    
//     const InfoRow = ({ label, value }) => (
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
//         <span style={{ fontSize: 11, color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{label}</span>
//         <span style={{ fontSize: 15, color: theme.colors.text, fontWeight: 600 }}>{value || '—'}</span>
//       </div>
//     );
//     return (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 }}>
//         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//           <div style={{ height: 120, background: STUDENT_CONFIG.gradient, position: 'relative' }}>
//             <div style={{ position: 'absolute', bottom: -40, left: 30, width: 90, height: 90, borderRadius: '50%', background: theme.colors.surface, border: `4px solid ${theme.colors.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//               {profile.profilePhotoUrl ? <img src={profile.profilePhotoUrl} alt="DP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 32 }}>👨‍🎓</span>}
//             </div>
//           </div>
//           <div style={{ padding: '50px 30px 30px 30px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
//               <div>
//                 <h2 style={{ fontSize: 24, fontWeight: 800, color: theme.colors.text }}>{profile.name}</h2>
//                 <div style={{ fontSize: 14, color: theme.colors.textMuted, fontWeight: 600, marginTop: 4 }}>Roll No: <span style={{color: theme.colors.studentColor}}>{profile.rollNo}</span></div>
//               </div>
//               <div style={{ display: 'flex', gap: 8 }}>
//                 <span style={{ padding: '6px 14px', borderRadius: 20, background: theme.colors.studentColor+'15', color: theme.colors.studentColor, fontSize: 13, fontWeight: 700 }}>Class {profile.classId?.name || profile.standard} {profile.section}</span>
//               </div>
//             </div>
//             <div style={{ borderTop: `1px solid ${theme.colors.border}`, marginTop: 24, paddingTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px' }}>
//               <div style={{ gridColumn: '1 / -1', fontSize: 15, fontWeight: 700, color: theme.colors.text, marginBottom: 8, borderBottom: `2px solid ${theme.colors.border}`, paddingBottom: 8 }}>Personal Details</div>
//               <InfoRow label="Email Address" value={profile.email} />
//               <InfoRow label="Phone Number" value={profile.phone} />
//               <InfoRow label="Date of Birth" value={profile.dob ? new Date(profile.dob).toLocaleDateString() : null} />
//               <InfoRow label="Blood Group" value={profile.bloodGroup} />
//               <div style={{ gridColumn: '1 / -1', fontSize: 15, fontWeight: 700, color: theme.colors.text, marginBottom: 8, marginTop: 16, borderBottom: `2px solid ${theme.colors.border}`, paddingBottom: 8 }}>Guardian Details</div>
//               <InfoRow label="Parent/Guardian Name" value={profile.fatherName || profile.parentName} />
//               <InfoRow label="Parent Contact" value={profile.parentPhone} />
//               <div style={{ gridColumn: '1 / -1' }}><InfoRow label="Residential Address" value={profile.address} /></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 2. ATTENDANCE
//   if (activeModule === "attendance") {
//     return (
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//           <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>Attendance Dashboard</h2>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
//             <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
//               <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Total Days</div>
//               <div style={{ fontSize: 28, color: theme.colors.text, fontWeight: 700, marginTop: 4 }}>{stats?.totalDays || 0}</div>
//             </div>
//             <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
//               <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Present</div>
//               <div style={{ fontSize: 28, color: theme.colors.success, fontWeight: 700, marginTop: 4 }}>{stats?.presentDays || 0}</div>
//             </div>
//             <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
//               <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Absent</div>
//               <div style={{ fontSize: 28, color: theme.colors.danger, fontWeight: 700, marginTop: 4 }}>{(stats?.totalDays || 0) - (stats?.presentDays || 0)}</div>
//             </div>
//           </div>

//           <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text, marginBottom: 16, borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: 10 }}>Attendance History</h3>
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {(!stats?.attendanceHistory || stats.attendanceHistory.length === 0) ? (
//               <div style={{ color: theme.colors.textMuted, fontSize: 14, textAlign: "center", padding: 20 }}>No attendance records found.</div>
//             ) : (
//               stats.attendanceHistory.map((record, i) => (
//                 <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: theme.colors.surface, borderRadius: 8, border: `1px solid ${theme.colors.border}` }}>
//                   <div style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>
//                     {new Date(record.date).toLocaleDateString("en-IN", { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
//                   </div>
//                   <div style={{
//                     padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
//                     background: record.status === 'Present' ? theme.colors.success + '15' : theme.colors.danger + '15',
//                     color: record.status === 'Present' ? theme.colors.success : theme.colors.danger
//                   }}>
//                     {record.status}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 3. ROUTER SWITCHES FOR NEW MODULES
//   if (activeModule === "fees") return <FeeModule />;
//   if (activeModule === "announcements") return <AnnouncementsModule />;
//   if (activeModule === "exams") return <ExaminationsModule profile={profile} />;
//   if (activeModule === "results") return <ResultsModule />;
//   if (activeModule === "library") return <LibraryModule profile={profile} />;


//   // 4. MAIN DASHBOARD OVERVIEW (Default Landing Page)
//   const dynamicCards = [
//     { label: "Attendance", value: `${stats?.attendancePct || 0}%`, delta: "Overall Year", color: "#3b82f6", icon: "📅" },
//     { label: "Upcoming Exams", value: stats?.upcomingExams || "0", delta: "Scheduled Tests", color: "#f59e0b", icon: "📝" },
//     { label: "Total Fee Due", value: stats?.feeDue > 0 ? `₹${stats.feeDue.toLocaleString()}` : "None", delta: stats?.feeDue > 0 ? "Overdue Balance" : "All Paid", color: stats?.feeDue > 0 ? "#ef4444" : "#10b981", icon: "💳" },
//   ];

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//       <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//         <div>
//           <div style={{ fontSize: 22, fontWeight: 800, color: theme.colors.text }}>Welcome back, {userName}! 👋</div>
//           <div style={{ fontSize: 14, color: theme.colors.textMuted, marginTop: 6, fontWeight: 500 }}>
//             {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
//           </div>
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
//         {dynamicCards.map((card, i) => <StatCard key={i} {...card} index={i} />)}
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//             <div>
//               <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text }}>My Attendance</div>
//               <div style={{ fontSize: 13, color: theme.colors.textMuted, marginTop: 2 }}>Current Academic Year</div>
//             </div>
//             <DonutChart pct={stats?.attendancePct || 0} color={STUDENT_CONFIG.color} size={70} />
//           </div>
//         </div>

//         <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//           <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>Recent Updates</div>
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {activities.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 13 }}>No recent updates.</div> :
//               activities.map((a, i) => (
//                 <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
//                   <div style={{ width: 10, height: 10, borderRadius: "50%", background: theme.colors.accent, marginTop: 4, flexShrink: 0 }} />
//                   <div style={{ flex: 1 }}>
//                     <div style={{ fontSize: 14, color: theme.colors.text, fontWeight: 500 }}>{a.text}</div>
//                     <div style={{ fontSize: 12, color: theme.colors.textMuted, marginTop: 2 }}>{a.time}</div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── MAIN WRAPPER COMPONENT ───
// export default function StudentDashboard() {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("");
//   const [activeModule, setActiveModule] = useState("dashboard");
//   const [collapsed, setCollapsed] = useState(false);
  
//   const [stats, setStats] = useState(null);
//   const [activities, setActivities] = useState([]);
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const userStr = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (!userStr || !token) {
//       navigate("/login");
//       return;
//     }

//     const user = JSON.parse(userStr);
//     if (user.role !== 'Student' && user.role !== 'Admin') {
//       navigate("/");
//       return;
//     }
//     setUserName(user.name);

//     const loadData = async () => {
//       try {
//         const [statsRes, actRes, profRes] = await Promise.all([
//           fetchStudentStats(), 
//           fetchStudentActivity(),
//           fetchStudentProfile()
//         ]);
//         if (statsRes.success) setStats(statsRes.data);
//         if (actRes.success) setActivities(actRes.data);
        
//         if (profRes.success && profRes.data) {
//           setProfile(profRes.data);
//         } else {
//           setProfile({ error: true }); 
//         }
//       } catch (err) {
//         console.error("Failed to load dashboard data", err);
//       }
//     };
//     loadData();
//   }, [navigate]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: ${theme.colors.bg}; color: ${theme.colors.text}; font-family: 'Inter', sans-serif; }
//         @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>

//       <div style={{ display: "flex", minHeight: "100vh", background: theme.colors.bg }}>
        
//         {/* SIDEBAR */}
//         <aside style={{ width: collapsed ? 70 : 260, minHeight: "100vh", background: theme.colors.surface, borderRight: `1px solid ${theme.colors.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s ease", overflow: "hidden", position: "relative", zIndex: 10, boxShadow: "1px 0 10px rgba(0,0,0,0.02)" }}>
//           <div style={{ padding: collapsed ? "20px 0" : "24px 20px", borderBottom: `1px solid ${theme.colors.border}`, display: "flex", alignItems: "center", gap: 12, justifyContent: collapsed ? "center" : "flex-start" }}>
//             <div style={{ width: 36, height: 36, borderRadius: 8, background: STUDENT_CONFIG.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff", flexShrink: 0 }}>{STUDENT_CONFIG.icon}</div>
//             {!collapsed && (
//               <div>
//                 <div style={{ fontWeight: 800, fontSize: 16, color: theme.colors.text, letterSpacing: "-0.02em" }}>ABHYAAS</div>
//                 <div style={{ fontSize: 11, color: theme.colors.studentColor, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 2 }}>{STUDENT_CONFIG.label}</div>
//               </div>
//             )}
//           </div>
//           <nav style={{ flex: 1, padding: "16px 0", overflowY: "auto" }}>
//             {STUDENT_CONFIG.nav.map((item) => {
//               const isActive = activeModule === item.id;
//               return (
//                 <div key={item.id} onClick={() => setActiveModule(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: collapsed ? "12px 0" : "12px 20px", margin: "4px 12px", borderRadius: 8, cursor: "pointer", background: isActive ? theme.colors.studentColor + '10' : "transparent", color: isActive ? theme.colors.studentColor : theme.colors.textMuted, transition: "all 0.2s ease", justifyContent: collapsed ? "center" : "flex-start" }}>
//                   <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>{item.icon}</span>
//                   {!collapsed && <span style={{ fontSize: 14, fontWeight: isActive ? 700 : 500, whiteSpace: "nowrap" }}>{item.label}</span>}
//                 </div>
//               );
//             })}
//           </nav>
//           <div onClick={() => setCollapsed(!collapsed)} style={{ padding: "16px", borderTop: `1px solid ${theme.colors.border}`, cursor: "pointer", display: "flex", justifyContent: collapsed ? "center" : "flex-end", color: theme.colors.textFaint, fontSize: 18, background: theme.colors.surfaceHover }}>
//             {collapsed ? "▶" : "◀"}
//           </div>
//         </aside>

//         {/* MAIN CONTENT */}
//         <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
//           <header style={{ height: 68, background: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}`, display: "flex", alignItems: "center", padding: "0 32px", gap: 16, position: "sticky", top: 0, zIndex: 9, boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
//             <div style={{ flex: 1 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <span style={{ fontSize: 12, color: theme.colors.textMuted, fontWeight: 600, textTransform: "uppercase" }}>Student Portal</span>
//                 <span style={{ color: theme.colors.textFaint, fontSize: 12 }}>/</span>
//                 <span style={{ fontSize: 14, color: theme.colors.text, fontWeight: 700 }}>{STUDENT_CONFIG.nav.find((n) => n.id === activeModule)?.label || "Dashboard"}</span>
//               </div>
//             </div>
//             <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login"); }} style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 8, padding: "8px 16px", color: theme.colors.danger, cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.background = '#fef2f2'} onMouseOut={e => e.currentTarget.style.background = theme.colors.surface}>
//               Log out
//             </button>
//           </header>

//           <main style={{ flex: 1, padding: "32px", overflowY: "auto", background: theme.colors.bg }}>
//             <DashboardContent activeModule={activeModule} userName={userName} stats={stats} activities={activities} profile={profile} />
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }






import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── SAFE API FETCHERS ───
const API_BASE = 'http://localhost:5000/api'; 
const STUDENT_BASE = `${API_BASE}/student`;   

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

// API Calls
const fetchStudentProfile = async () => (await fetch(`${STUDENT_BASE}/profile`, { headers: getHeaders() })).json();
const fetchStudentStats = async () => (await fetch(`${STUDENT_BASE}/dashboard/stats`, { headers: getHeaders() })).json();
const fetchStudentActivity = async () => (await fetch(`${STUDENT_BASE}/dashboard/activity`, { headers: getHeaders() })).json();
const fetchStudentFees = async () => (await fetch(`${STUDENT_BASE}/my-fees`, { headers: getHeaders() })).json();
const fetchUpcomingExams = async (standard) => (await fetch(`${API_BASE}/exams?standard=${standard}`, { headers: getHeaders() })).json();

// ─── DESIGN SYSTEM (Admin Light Theme) ───
const theme = {
  colors: {
    bg: "#f8fafc", surface: "#ffffff", surfaceHover: "#f1f5f9", border: "#e2e8f0",
    text: "#1e293b", textMuted: "#64748b", textFaint: "#94a3b8",
    studentColor: "#3b82f6", success: "#10b981", warning: "#f59e0b", danger: "#ef4444",
    accent: "#0ea5e9", purple: "#8b5cf6"
  },
};

const STUDENT_CONFIG = {
  label: "Student Portal", icon: "👨‍🎓", color: theme.colors.studentColor,
  gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  nav: [
    { id: "dashboard", icon: "📊", label: "Dashboard overview" },
    { id: "profile", icon: "👤", label: "My Profile" },
    { id: "attendance", icon: "📅", label: "My Attendance" },
    { id: "fees", icon: "💳", label: "Fee Status" },
    { id: "announcements", icon: "📢", label: "Announcements" },
    { id: "exams", icon: "📝", label: "Upcoming Exams" },
    { id: "library", icon: "📖", label: "Digital E-Library" },
  ]
};

// ─── UI COMPONENTS ───
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
        transform: hovered ? "translateY(-2px)" : "none", boxShadow: hovered ? `0 8px 24px ${color}15` : "0 1px 3px rgba(0,0,0,0.05)",
        animation: `fadeInUp 0.4s ease ${index * 0.06}s both`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: theme.colors.textMuted, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.text, marginTop: 6, fontFamily: "'Inter', sans-serif" }}>{value}</div>
          <div style={{ fontSize: 12, color: color, marginTop: 4, fontWeight: 600 }}>{delta}</div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: color }}>{icon}</div>
      </div>
    </div>
  );
}

// ─── INDIVIDUAL MODULES ───

function FeeModule() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentFees().then(res => {
      if(res.success) setFees(res.data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>My Fee Ledger</h2>
        {loading ? <p style={{color: theme.colors.textMuted}}>Loading your fees...</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {fees.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 14 }}>No fee records found.</div> :
              fees.map((f, i) => {
                const amount = Number(f.amount) || 0;
                const paid = Number(f.paidAmount) || 0;
                const balance = amount - paid;
                
                return (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}` }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text }}>{f.feeType || 'School Fee'}</div>
                      <div style={{ fontSize: 13, color: theme.colors.textMuted, marginTop: 4 }}>Due: {f.dueDate ? new Date(f.dueDate).toLocaleDateString('en-IN') : 'N/A'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: theme.colors.text }}>Total: ₹{amount.toLocaleString()}</div>
                      {paid > 0 && <div style={{ fontSize: 13, color: theme.colors.success, marginTop: 2, fontWeight: 600 }}>Paid: ₹{paid.toLocaleString()}</div>}
                      {balance > 0 && <div style={{ fontSize: 13, color: theme.colors.danger, marginTop: 2, fontWeight: 600 }}>Balance: ₹{balance.toLocaleString()}</div>}
                      <div style={{
                        marginTop: 8, display: 'inline-block', padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                        background: f.status === 'Paid' ? theme.colors.success + '15' : theme.colors.warning + '15',
                        color: f.status === 'Paid' ? theme.colors.success : theme.colors.warning
                      }}>
                        {f.status}
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        )}
      </div>
    </div>
  );
}

function AnnouncementsModule() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/announcements`, { headers: getHeaders() })
      .then(res => res.json())
      .then(res => {
        if(res.success) setAnnouncements(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const priorityColors = { Normal: theme.colors.textMuted, Important: theme.colors.warning, Urgent: theme.colors.danger };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>School Announcements</h2>
        {loading ? <p style={{color: theme.colors.textMuted}}>Loading announcements...</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {announcements.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 14 }}>No recent announcements.</div> :
              announcements.map((a, i) => {
                const pColor = priorityColors[a.priority] || theme.colors.accent;
                return (
                  <div key={i} style={{ padding: "20px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, borderLeft: `4px solid ${pColor}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div>
                        <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: pColor + '15', color: pColor, display: 'inline-block', marginBottom: 8, border: `1px solid ${pColor}44` }}>
                          {a.priority === 'Urgent' ? '🔴' : a.priority === 'Important' ? '🟡' : '⚪'} {a.priority}
                        </span>
                        <div style={{ fontSize: 17, fontWeight: 800, color: theme.colors.text }}>{a.title}</div>
                      </div>
                      <div style={{ fontSize: 12, color: theme.colors.textMuted, fontWeight: 600 }}>{new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                    <div style={{ fontSize: 14, color: theme.colors.textMuted, lineHeight: 1.6 }}>{a.content}</div>
                    <div style={{ fontSize: 12, color: theme.colors.textFaint, marginTop: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14 }}>✍️</span> Posted by Management
                    </div>
                  </div>
                );
              })
            }
          </div>
        )}
      </div>
    </div>
  );
}

function ExaminationsModule({ profile }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const std = profile?.classId?.standard || profile?.standard;
    if (!std) return;

    fetchUpcomingExams(std).then(res => {
      if(res.success) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const upcoming = (res.data || []).filter(e => new Date(e.date) >= yesterday);
        setExams(upcoming);
      }
      setLoading(false);
    });
  }, [profile]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>Upcoming Examinations</h2>
        {loading ? <p style={{color: theme.colors.textMuted}}>Loading exam schedule...</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {exams.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 14, padding: 20, textAlign: 'center', background: theme.colors.bg, borderRadius: 8 }}>No upcoming exams scheduled for Class {profile?.classId?.standard || profile?.standard}. Relax! 🎉</div> :
              exams.map((e, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, borderLeft: `4px solid ${theme.colors.accent}` }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text }}>{e.name}</div>
                    <div style={{ fontSize: 13, color: theme.colors.accent, marginTop: 4, fontWeight: 600 }}>{e.subject}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: theme.colors.text }}>📅 {new Date(e.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
                    <div style={{ fontSize: 12, color: theme.colors.textMuted, marginTop: 4 }}>Duration: {e.duration} mins | Max Marks: {e.totalMarks}</div>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}

function LibraryModule() {
  const eLibraryResources = [
    { title: "Mathematics (NCERT Textbooks)", category: "Textbook", source: "NCERT Official", link: "https://ncert.nic.in/textbook.php", color: theme.colors.accent },
    { title: "Physics Concepts & Videos", category: "Reference", source: "Khan Academy", link: "https://www.khanacademy.org/science/physics", color: theme.colors.purple },
    { title: "English Grammar Rules", category: "Language", source: "GrammarBook", link: "https://www.grammarbook.com/", color: theme.colors.warning },
    { title: "World History Archive", category: "History", source: "History.com", link: "https://www.history.com/", color: theme.colors.danger },
    { title: "Computer Science Basics", category: "Technology", source: "Code.org", link: "https://code.org/", color: theme.colors.success },
    { title: "Chemistry Periodic Table", category: "Science", source: "Ptable", link: "https://ptable.com/", color: theme.colors.studentColor }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 6 }}>Digital E-Library</h2>
        <p style={{ color: theme.colors.textMuted, fontSize: 14, marginBottom: 24 }}>Access free online educational resources, textbooks, and reference materials.</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {eLibraryResources.map((book, i) => (
            <div key={i} style={{ padding: "20px", background: theme.colors.bg, borderRadius: 12, border: `1px solid ${theme.colors.border}`, borderTop: `4px solid ${book.color}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontSize: 11, padding: '4px 10px', background: book.color + '15', color: book.color, borderRadius: 6, fontWeight: 700, border: `1px solid ${book.color}33` }}>
                    {book.category}
                  </span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: theme.colors.text, marginBottom: 6, lineHeight: 1.4 }}>{book.title}</div>
                <div style={{ fontSize: 13, color: theme.colors.textMuted, marginBottom: 20 }}>Source: <span style={{fontWeight: 600}}>{book.source}</span></div>
              </div>
              <a href={book.link} target="_blank" rel="noopener noreferrer" 
                style={{ display: 'block', textAlign: 'center', padding: '10px', background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 8, color: theme.colors.text, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s', fontSize: 13 }} 
                onMouseOver={e => { e.currentTarget.style.background = book.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = book.color; }} 
                onMouseOut={e => { e.currentTarget.style.background = theme.colors.surface; e.currentTarget.style.color = theme.colors.text; e.currentTarget.style.borderColor = theme.colors.border; }}>
                Read Online ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD CONTENT ROUTER ───
function DashboardContent({ activeModule, userName, stats, activities, profile }) {
  
  if (activeModule === "profile") {
    if (!profile) return <div style={{ color: theme.colors.textMuted, padding: 40, textAlign: 'center' }}>Loading Profile...</div>;
    if (profile.error) return <div style={{ color: theme.colors.danger, padding: 40, textAlign: 'center' }}>Could not load profile. Please contact Admin.</div>;
    
    const InfoRow = ({ label, value }) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
        <span style={{ fontSize: 11, color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 15, color: theme.colors.text, fontWeight: 600 }}>{value || '—'}</span>
      </div>
    );
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 }}>
        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ height: 120, background: STUDENT_CONFIG.gradient, position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: -40, left: 30, width: 90, height: 90, borderRadius: '50%', background: theme.colors.surface, border: `4px solid ${theme.colors.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              {profile.profilePhotoUrl ? <img src={profile.profilePhotoUrl} alt="DP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 32 }}>👨‍🎓</span>}
            </div>
          </div>
          <div style={{ padding: '50px 30px 30px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: theme.colors.text }}>{profile.name}</h2>
                <div style={{ fontSize: 14, color: theme.colors.textMuted, fontWeight: 600, marginTop: 4 }}>Roll No: <span style={{color: theme.colors.studentColor}}>{profile.rollNo}</span></div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ padding: '6px 14px', borderRadius: 20, background: theme.colors.studentColor+'15', color: theme.colors.studentColor, fontSize: 13, fontWeight: 700 }}>Class {profile.classId?.name || profile.standard} {profile.section}</span>
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${theme.colors.border}`, marginTop: 24, paddingTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px' }}>
              <div style={{ gridColumn: '1 / -1', fontSize: 15, fontWeight: 700, color: theme.colors.text, marginBottom: 8, borderBottom: `2px solid ${theme.colors.border}`, paddingBottom: 8 }}>Personal Details</div>
              <InfoRow label="Email Address" value={profile.email} />
              <InfoRow label="Phone Number" value={profile.phone} />
              <InfoRow label="Date of Birth" value={profile.dob ? new Date(profile.dob).toLocaleDateString() : null} />
              <InfoRow label="Blood Group" value={profile.bloodGroup} />
              <div style={{ gridColumn: '1 / -1', fontSize: 15, fontWeight: 700, color: theme.colors.text, marginBottom: 8, marginTop: 16, borderBottom: `2px solid ${theme.colors.border}`, paddingBottom: 8 }}>Guardian Details</div>
              <InfoRow label="Parent/Guardian Name" value={profile.fatherName || profile.parentName} />
              <InfoRow label="Parent Contact" value={profile.parentPhone} />
              <div style={{ gridColumn: '1 / -1' }}><InfoRow label="Residential Address" value={profile.address} /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === "attendance") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>Attendance Dashboard</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Total Days</div>
              <div style={{ fontSize: 28, color: theme.colors.text, fontWeight: 700, marginTop: 4 }}>{stats?.totalDays || 0}</div>
            </div>
            <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Present</div>
              <div style={{ fontSize: 28, color: theme.colors.success, fontWeight: 700, marginTop: 4 }}>{stats?.presentDays || 0}</div>
            </div>
            <div style={{ padding: 16, background: theme.colors.bg, borderRadius: 8, border: `1px solid ${theme.colors.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: theme.colors.textMuted, textTransform: "uppercase", fontWeight: 700 }}>Absent</div>
              <div style={{ fontSize: 28, color: theme.colors.danger, fontWeight: 700, marginTop: 4 }}>{(stats?.totalDays || 0) - (stats?.presentDays || 0)}</div>
            </div>
          </div>

          <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text, marginBottom: 16, borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: 10 }}>Attendance History</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(!stats?.attendanceHistory || stats.attendanceHistory.length === 0) ? (
              <div style={{ color: theme.colors.textMuted, fontSize: 14, textAlign: "center", padding: 20 }}>No attendance records found.</div>
            ) : (
              stats.attendanceHistory.map((record, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: theme.colors.surface, borderRadius: 8, border: `1px solid ${theme.colors.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>
                    {new Date(record.date).toLocaleDateString("en-IN", { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div style={{
                    padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: record.status === 'Present' ? theme.colors.success + '15' : theme.colors.danger + '15',
                    color: record.status === 'Present' ? theme.colors.success : theme.colors.danger
                  }}>
                    {record.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === "fees") return <FeeModule />;
  if (activeModule === "announcements") return <AnnouncementsModule />;
  if (activeModule === "exams") return <ExaminationsModule profile={profile} />;
  if (activeModule === "library") return <LibraryModule />;

  const dynamicCards = [
    { label: "Attendance", value: `${stats?.attendancePct || 0}%`, delta: "Overall Year", color: "#3b82f6", icon: "📅" },
    { label: "Upcoming Exams", value: stats?.upcomingExams || "0", delta: "Scheduled Tests", color: "#f59e0b", icon: "📝" },
    { label: "Total Fee Due", value: stats?.feeDue > 0 ? `₹${stats.feeDue.toLocaleString()}` : "None", delta: stats?.feeDue > 0 ? "Overdue Balance" : "All Paid", color: stats?.feeDue > 0 ? "#ef4444" : "#10b981", icon: "💳" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.colors.text }}>Welcome back, {userName}! 👋</div>
          <div style={{ fontSize: 14, color: theme.colors.textMuted, marginTop: 6, fontWeight: 500 }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {dynamicCards.map((card, i) => <StatCard key={i} {...card} index={i} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text }}>My Attendance</div>
              <div style={{ fontSize: 13, color: theme.colors.textMuted, marginTop: 2 }}>Current Academic Year</div>
            </div>
            <DonutChart pct={stats?.attendancePct || 0} color={STUDENT_CONFIG.color} size={70} />
          </div>
        </div>

        <div style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: theme.colors.text, marginBottom: 16 }}>Recent Updates</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {activities.length === 0 ? <div style={{ color: theme.colors.textMuted, fontSize: 13 }}>No recent updates.</div> :
              activities.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: theme.colors.accent, marginTop: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: theme.colors.text, fontWeight: 500 }}>{a.text}</div>
                    <div style={{ fontSize: 12, color: theme.colors.textMuted, marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN WRAPPER COMPONENT ───
export default function StudentDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [activeModule, setActiveModule] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userStr || !token) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== 'Student' && user.role !== 'Admin') {
      navigate("/");
      return;
    }
    setUserName(user.name);

    const loadData = async () => {
      try {
        const [statsRes, actRes, profRes] = await Promise.all([
          fetchStudentStats(), 
          fetchStudentActivity(),
          fetchStudentProfile()
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (actRes.success) setActivities(actRes.data);
        
        if (profRes.success && profRes.data) {
          setProfile(profRes.data);
        } else {
          setProfile({ error: true }); 
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };
    loadData();
  }, [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${theme.colors.bg}; color: ${theme.colors.text}; font-family: 'Inter', sans-serif; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: theme.colors.bg }}>
        
        {/* SIDEBAR */}
        <aside style={{ width: collapsed ? 70 : 260, minHeight: "100vh", background: theme.colors.surface, borderRight: `1px solid ${theme.colors.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s ease", overflow: "hidden", position: "relative", zIndex: 10, boxShadow: "1px 0 10px rgba(0,0,0,0.02)" }}>
          <div style={{ padding: collapsed ? "20px 0" : "24px 20px", borderBottom: `1px solid ${theme.colors.border}`, display: "flex", alignItems: "center", gap: 12, justifyContent: collapsed ? "center" : "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: STUDENT_CONFIG.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff", flexShrink: 0 }}>{STUDENT_CONFIG.icon}</div>
            {!collapsed && (
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: theme.colors.text, letterSpacing: "-0.02em" }}>ABHYAAS</div>
                <div style={{ fontSize: 11, color: theme.colors.studentColor, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 2 }}>{STUDENT_CONFIG.label}</div>
              </div>
            )}
          </div>
          <nav style={{ flex: 1, padding: "16px 0", overflowY: "auto" }}>
            {STUDENT_CONFIG.nav.map((item) => {
              const isActive = activeModule === item.id;
              return (
                <div key={item.id} onClick={() => setActiveModule(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: collapsed ? "12px 0" : "12px 20px", margin: "4px 12px", borderRadius: 8, cursor: "pointer", background: isActive ? theme.colors.studentColor + '10' : "transparent", color: isActive ? theme.colors.studentColor : theme.colors.textMuted, transition: "all 0.2s ease", justifyContent: collapsed ? "center" : "flex-start" }}>
                  <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>{item.icon}</span>
                  {!collapsed && <span style={{ fontSize: 14, fontWeight: isActive ? 700 : 500, whiteSpace: "nowrap" }}>{item.label}</span>}
                </div>
              );
            })}
          </nav>
          <div onClick={() => setCollapsed(!collapsed)} style={{ padding: "16px", borderTop: `1px solid ${theme.colors.border}`, cursor: "pointer", display: "flex", justifyContent: collapsed ? "center" : "flex-end", color: theme.colors.textFaint, fontSize: 18, background: theme.colors.surfaceHover }}>
            {collapsed ? "▶" : "◀"}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <header style={{ height: 68, background: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}`, display: "flex", alignItems: "center", padding: "0 32px", gap: 16, position: "sticky", top: 0, zIndex: 9, boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: theme.colors.textMuted, fontWeight: 600, textTransform: "uppercase" }}>Student Portal</span>
                <span style={{ color: theme.colors.textFaint, fontSize: 12 }}>/</span>
                <span style={{ fontSize: 14, color: theme.colors.text, fontWeight: 700 }}>{STUDENT_CONFIG.nav.find((n) => n.id === activeModule)?.label || "Dashboard"}</span>
              </div>
            </div>
            <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login"); }} style={{ background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: 8, padding: "8px 16px", color: theme.colors.danger, cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.background = '#fef2f2'} onMouseOut={e => e.currentTarget.style.background = theme.colors.surface}>
              Log out
            </button>
          </header>

          <main style={{ flex: 1, padding: "32px", overflowY: "auto", background: theme.colors.bg }}>
            <DashboardContent activeModule={activeModule} userName={userName} stats={stats} activities={activities} profile={profile} />
          </main>
        </div>
      </div>
    </>
  );
}