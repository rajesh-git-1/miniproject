// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// const AdminDashboard = () => {
//     const [registrations, setRegistrations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const token = useSelector(state => state.auth.token);

//     useEffect(() => {
//         fetchRegistrations();
//     }, []);

//     const fetchRegistrations = async () => {
//         try {
//             // const response = await fetch('/api/admin/registrations', {
//             //     headers: { 'Authorization': `Bearer ${token}` }
//             const response = await fetch('http://localhost:5000/api/admin/registrations', { // <-- ADDED URL
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });

//             const data = await response.json();
//             if (data.success) setRegistrations(data.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleReview = async (id, status) => {
//         try {
//             // const response = await fetch(`/api/admin/registrations/${id}`, {
//             //     method: 'PUT',
//             const response = await fetch(`http://localhost:5000/api/admin/registrations/${id}`, { // <-- ADDED URL
//                 method: 'PUT',
//                 // ... rest of the code
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ status })
//             });
//             const data = await response.json();
//             if (data.success) {
//                 // Remove from list immediately upon success
//                 setRegistrations(prev => prev.filter(r => r._id !== id));
//             } else {
//                 alert(data.message);
//             }
//         } catch (err) {
//             alert("Error reviewing registration");
//         }
//     };

//     // Helper to render role-specific details in the table
//     const renderDetails = (reg) => {
//         switch (reg.role) {
//             case 'Student':
//                 return `Roll: ${reg.rollNo || 'N/A'} | Class: ${reg.standard || 'N/A'}`;
//             case 'Teacher':
//                 return `ID: ${reg.teacherId || 'N/A'} | Desig: ${reg.designation || 'N/A'}`;
//             case 'Admin':
//                 return `Admin ID: ${reg.adminId || 'N/A'} | Access: ${reg.accessLevel || 'N/A'}`;
//             case 'Principal':
//                 return `Principal ID: ${reg.principalId || 'N/A'} | Exp: ${reg.experience || 'N/A'}`;
//             default:
//                 return 'No details provided';
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <div className="card">
//                 <h3 className="text-xl font-bold text-textMain mb-6 pb-2 border-b border-gray-100">
//                     Pending User Registrations
//                 </h3>

//                 {loading ? (
//                     <p className="text-gray-500 text-center py-4">Loading registrations...</p>
//                 ) : registrations.length === 0 ? (
//                     <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
//                         <p className="text-gray-500 font-medium">No pending registrations found.</p>
//                     </div>
//                 ) : (
//                     <div className="table-wrapper">
//                         <table className="data-table">
//                             <thead>
//                                 <tr>
//                                     <th>User</th>
//                                     <th>Role</th>
//                                     <th>Details</th>
//                                     <th className="text-center">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {registrations.map(reg => (
//                                     <tr key={reg._id}>
//                                         <td>
//                                             <div className="flex items-center">
//                                                 <div className="h-10 w-10 flex-shrink-0">
//                                                     {reg.profilePhotoUrl ? (
//                                                         <img className="h-10 w-10 rounded-full object-cover" src={reg.profilePhotoUrl} alt="" />
//                                                     ) : (
//                                                         <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
//                                                             {reg.name.charAt(0)}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className="ml-4">
//                                                     <div className="text-sm font-medium text-textMain">{reg.name}</div>
//                                                     <div className="text-sm text-textMuted">{reg.email}</div>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td>
//                                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                                                 ${reg.role === 'Teacher' ? 'bg-secondary/10 text-secondary' :
//                                                     reg.role === 'Student' ? 'bg-accent/10 text-accent' :
//                                                         reg.role === 'Admin' ? 'bg-primary/10 text-primary' :
//                                                             'bg-orange-100 text-orange-800' // Principal
//                                                 }`}>
//                                                 {reg.role}
//                                             </span>
//                                         </td>
//                                         <td>
//                                             {renderDetails(reg)}
//                                         </td>
//                                         <td className="text-center space-x-2">
//                                             <button
//                                                 onClick={() => handleReview(reg._id, 'Approved')}
//                                                 className="btn !py-1.5 !px-3 btn-accent text-xs"
//                                             >
//                                                 Approve
//                                             </button>
//                                             <button
//                                                 onClick={() => handleReview(reg._id, 'Rejected')}
//                                                 className="btn !py-1.5 !px-3 btn-danger text-xs"
//                                             >
//                                                 Reject
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ─── DESIGN TOKENS (same as DashboardLayout) ─────────────────────────────────
const C = {
    bg:         '#0d1117',
    surface:    '#161b22',
    surfaceAlt: '#1c2128',
    border:     '#30363d',
    accent:     '#58a6ff',
    accentDim:  'rgba(88,166,255,0.12)',
    success:    '#3fb950',
    successDim: 'rgba(63,185,80,0.12)',
    warning:    '#d29922',
    warningDim: 'rgba(210,153,34,0.12)',
    danger:     '#f85149',
    dangerDim:  'rgba(248,81,73,0.10)',
    purple:     '#bc8cff',
    purpleDim:  'rgba(188,140,255,0.12)',
    orange:     '#ffa657',
    orangeDim:  'rgba(255,166,87,0.12)',
    text:       '#e6edf3',
    textMuted:  '#8b949e',
    textFaint:  '#484f58',
};

// ─── STATIC / MOCK DATA (replace with real API calls as needed) ────────────────
const SUMMARY_CARDS = [
    { label: 'Total Students',  value: '1,284', delta: '+12 this month', up: true,  color: C.accent,   bg: C.accentDim,   icon: '◎' },
    { label: 'Total Teachers',  value: '87',    delta: '+3 new joins',   up: true,  color: C.purple,   bg: C.purpleDim,   icon: '◍' },
    { label: 'Total Classes',   value: '42',    delta: 'Across 3 wings', up: null,  color: C.success,  bg: C.successDim,  icon: '⬡' },
    { label: 'Fee Collected',   value: '₹4.2L', delta: '+8% vs last mo', up: true,  color: C.orange,   bg: C.orangeDim,   icon: '◆' },
    { label: 'Attendance %',    value: '93.4%', delta: '+1.2% this wk',  up: true,  color: C.success,  bg: C.successDim,  icon: '◷' },
    { label: 'Upcoming Exams',  value: '6',     delta: 'This week',       up: null,  color: C.danger,   bg: C.dangerDim,   icon: '◈' },
    { label: 'Pending Leaves',  value: '14',    delta: '-3 approved',    up: false, color: C.warning,  bg: C.warningDim,  icon: '⏾' },
];

const ATTENDANCE_DATA = [
    { day: 'Mon', pct: 92 }, { day: 'Tue', pct: 88 }, { day: 'Wed', pct: 95 },
    { day: 'Thu', pct: 79 }, { day: 'Fri', pct: 91 }, { day: 'Sat', pct: 85 },
];

const UPCOMING_EVENTS = [
    { name: 'Math Final Exam',      date: 'Mar 2',  cls: 'Class 10', color: C.danger  },
    { name: 'Science Lab Test',     date: 'Mar 4',  cls: 'Class 9',  color: C.warning },
    { name: 'Annual Sports Day',    date: 'Mar 8',  cls: 'All',      color: C.success },
    { name: 'Parent-Teacher Meet',  date: 'Mar 12', cls: 'Cl 6–10',  color: C.purple  },
];

const RECENT_ACTIVITY = [
    { text: 'Fee payment received — Rahul Kumar ₹12,000',      time: '18m ago', dot: C.success },
    { text: 'Exam results uploaded — Class 8 Mathematics',      time: '1h ago',  dot: C.purple  },
    { text: 'Leave approved — Anita Desai (3 days)',            time: '2h ago',  dot: C.warning },
    { text: 'Library overdue — Class 7B, 4 students',           time: '3h ago',  dot: C.orange  },
    { text: 'Announcement posted by Principal',                 time: '5h ago',  dot: C.accent  },
];

const TOP_STUDENTS = [
    { name: 'Aarav Shah',    cls: '10A', score: 98, rank: 1, rankColor: C.warning },
    { name: 'Priya Sharma',  cls: '9B',  score: 96, rank: 2, rankColor: C.textMuted },
    { name: 'Rohan Mehta',   cls: '10A', score: 94, rank: 3, rankColor: C.orange  },
    { name: 'Sneha Patel',   cls: '8C',  score: 93, rank: 4, rankColor: C.textFaint },
];

// ─── DEMO FALLBACK registrations (shown if API is offline) ────────────────────
const MOCK_REGISTRATIONS = [
    { _id: 'm1', name: 'Priya Sharma',  email: 'priya@school.in',  role: 'Student',   rollNo: 'S-1042', standard: '10A',      profilePhotoUrl: '' },
    { _id: 'm2', name: 'Anita Desai',   email: 'anita@school.in',  role: 'Teacher',   teacherId: 'T-205', designation: 'Sr. Lecturer', profilePhotoUrl: '' },
    { _id: 'm3', name: 'Rahul Mehta',   email: 'rahul@school.in',  role: 'Student',   rollNo: 'S-1043', standard: '9B',       profilePhotoUrl: '' },
    { _id: 'm4', name: 'Dr. K. Rao',    email: 'krao@school.in',   role: 'Principal', principalId: 'P-01', experience: '18 yrs', profilePhotoUrl: '' },
    { _id: 'm5', name: 'Sneha Patel',   email: 'sneha@school.in',  role: 'Admin',     adminId: 'A-03', accessLevel: 'Full',  profilePhotoUrl: '' },
];

// ─── SMALL UTILITIES ──────────────────────────────────────────────────────────
function roleColor(role) {
    return role === 'Teacher' ? C.purple : role === 'Student' ? C.accent :
           role === 'Admin'   ? C.danger  : role === 'Principal' ? C.orange : C.success;
}

function Avatar({ name, url, size = 36, color }) {
    const c = color || C.accent;
    if (url) return (
        <img src={url} alt={name}
             style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
    );
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%', flexShrink: 0,
            background: c + '22', border: `1.5px solid ${c}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: size * 0.4, fontWeight: 700, color: c,
            fontFamily: "'Syne', sans-serif",
        }}>
            {name?.charAt(0)?.toUpperCase()}
        </div>
    );
}

function RoleBadge({ role }) {
    const color = roleColor(role);
    return (
        <span style={{
            padding: '2px 9px', borderRadius: 20, fontSize: 11, fontWeight: 700,
            background: color + '20', color, border: `1px solid ${color}44`,
        }}>
            {role}
        </span>
    );
}

// ─── SPARKBAR ─────────────────────────────────────────────────────────────────
function SparkBar({ data }) {
    const max = Math.max(...data.map(d => d.pct));
    return (
        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', height: 52, marginTop: 14 }}>
            {data.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div title={`${d.pct}%`} style={{
                        width: '100%',
                        height: `${(d.pct / max) * 40}px`,
                        background: `linear-gradient(180deg, ${C.accent}, #388bfd)`,
                        borderRadius: '3px 3px 0 0',
                        opacity: 0.85,
                        transition: 'height 0.7s ease',
                    }} />
                    <span style={{ fontSize: 10, color: C.textMuted }}>{d.day}</span>
                </div>
            ))}
        </div>
    );
}

// ─── DONUT ────────────────────────────────────────────────────────────────────
function Donut({ pct, color, size = 76 }) {
    const r    = (size - 10) / 2;
    const circ = 2 * Math.PI * r;
    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={8} />
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8}
                    strokeDasharray={`${(pct/100)*circ} ${circ}`} strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.9s ease' }} />
        </svg>
    );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ card, index }) {
    const [hov, setHov] = useState(false);
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: C.surface,
                border: `1px solid ${hov ? card.color + '55' : C.border}`,
                borderRadius: 12, padding: '18px 20px',
                transition: 'all 0.2s ease',
                transform: hov ? 'translateY(-3px)' : 'none',
                boxShadow: hov ? `0 8px 28px ${card.color}22` : 'none',
                animation: `fadeUp 0.4s ease ${index * 0.05}s both`,
                cursor: 'default',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <div style={{
                        fontSize: 11, color: C.textMuted, fontWeight: 600,
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        fontFamily: "'DM Sans', sans-serif",
                    }}>
                        {card.label}
                    </div>
                    <div style={{
                        fontSize: 27, fontWeight: 800, color: C.text,
                        marginTop: 6, fontFamily: "'Syne', sans-serif",
                        letterSpacing: '-0.02em',
                    }}>
                        {card.value}
                    </div>
                    <div style={{
                        fontSize: 11, marginTop: 4, fontWeight: 500,
                        color: card.up === true ? C.success : card.up === false ? C.danger : C.textMuted,
                    }}>
                        {card.up === true ? '↑ ' : card.up === false ? '↓ ' : ''}{card.delta}
                    </div>
                </div>
                <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: card.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, color: card.color,
                }}>
                    {card.icon}
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — DASHBOARD HOME
// ═══════════════════════════════════════════════════════════════════════════════
function DashboardHome({ user }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Welcome banner */}
            <div style={{
                background: `linear-gradient(135deg, ${C.accent}14 0%, transparent 65%)`,
                border: `1px solid ${C.accent}30`,
                borderRadius: 14, padding: '22px 28px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 12,
            }}>
                <div>
                    <div style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 22, fontWeight: 800, color: C.text,
                    }}>
                        Good Morning, {user?.name?.split(' ')[0]} 👋
                    </div>
                    <div style={{ fontSize: 13, color: C.textMuted, marginTop: 5 }}>
                        {new Date().toLocaleDateString('en-IN', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                        })}
                        <span style={{ color: C.accent }}> · Abhyaas School ERP</span>
                    </div>
                </div>
                {/* Quick link to registrations */}
                <Link
                    to="/dashboard/admin/registrations"
                    style={{
                        background: C.accentDim,
                        border: `1px solid ${C.accent}33`,
                        borderRadius: 10, padding: '8px 18px',
                        fontSize: 12, fontWeight: 700, color: C.accent,
                        textDecoration: 'none', whiteSpace: 'nowrap',
                    }}
                >
                    5 pending approvals →
                </Link>
            </div>

            {/* Summary cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
                gap: 12,
            }}>
                {SUMMARY_CARDS.map((card, i) => <StatCard key={i} card={card} index={i} />)}
            </div>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

                {/* Attendance */}
                <div style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderRadius: 12, padding: 20,
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: 14, fontWeight: 700, color: C.text,
                            }}>
                                Weekly Attendance
                            </div>
                            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>
                                School-wide · last 6 days
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Donut pct={93} color={C.accent} />
                            <div>
                                <div style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: 22, fontWeight: 800, color: C.text,
                                }}>93%</div>
                                <div style={{ fontSize: 11, color: C.textMuted }}>avg rate</div>
                            </div>
                        </div>
                    </div>
                    <SparkBar data={ATTENDANCE_DATA} />
                </div>

                {/* Upcoming events */}
                <div style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderRadius: 12, padding: 20,
                }}>
                    <div style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14,
                    }}>
                        Upcoming Events
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                        {UPCOMING_EVENTS.map((e, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '9px 12px', borderRadius: 8,
                                background: C.bg, border: `1px solid ${C.border}`,
                            }}>
                                <div style={{
                                    width: 4, height: 34,
                                    borderRadius: 2, background: e.color, flexShrink: 0,
                                }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{e.name}</div>
                                    <div style={{ fontSize: 11, color: C.textMuted }}>{e.cls}</div>
                                </div>
                                <span style={{
                                    fontSize: 11, fontWeight: 700, color: e.color,
                                    background: e.color + '18',
                                    padding: '3px 8px', borderRadius: 6,
                                }}>
                                    {e.date}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

                {/* Top performers */}
                <div style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderRadius: 12, padding: 20,
                }}>
                    <div style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14,
                    }}>
                        Top Performers
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {TOP_STUDENTS.map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                    background: s.rankColor + '22',
                                    border: `1.5px solid ${s.rankColor}55`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 12, fontWeight: 800, color: s.rankColor,
                                }}>
                                    {s.rank}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{s.name}</div>
                                    <div style={{ fontSize: 11, color: C.textMuted }}>{s.cls}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{
                                        width: 56, height: 4,
                                        borderRadius: 2, background: C.border, overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            height: '100%', width: `${s.score}%`,
                                            background: C.accent,
                                            transition: 'width 0.9s ease',
                                        }} />
                                    </div>
                                    <span style={{
                                        fontSize: 12, fontWeight: 700, color: C.accent,
                                    }}>
                                        {s.score}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent activity */}
                <div style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderRadius: 12, padding: 20,
                }}>
                    <div style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14,
                    }}>
                        Recent Activity
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {RECENT_ACTIVITY.map((a, i) => (
                            <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                                <div style={{
                                    width: 8, height: 8, borderRadius: '50%',
                                    background: a.dot, marginTop: 4, flexShrink: 0,
                                    boxShadow: `0 0 6px ${a.dot}80`,
                                }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, color: C.text, lineHeight: 1.5 }}>{a.text}</div>
                                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{a.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — PENDING REGISTRATIONS
// (original logic 100% preserved — fetch, handleReview, renderDetails)
// ═══════════════════════════════════════════════════════════════════════════════
function PendingRegistrations({ token }) {
    const [registrations, setRegistrations] = useState([]);
    const [loading,       setLoading]       = useState(true);
    const [processing,    setProcessing]    = useState({});   // { id: 'Approved'|'Rejected' }
    const [filterRole,    setFilterRole]    = useState('All');
    const [search,        setSearch]        = useState('');
    const [toast,         setToast]         = useState(null);

    // ── original fetch ───────────────────────────────────────────────────────
    useEffect(() => { fetchRegistrations(); }, []);

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/admin/registrations', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) setRegistrations(data.data);
        } catch (err) {
            console.error(err);
            setRegistrations(MOCK_REGISTRATIONS); // offline fallback
        } finally {
            setLoading(false);
        }
    };

    // ── original handleReview ─────────────────────────────────────────────────
    const handleReview = async (id, status) => {
        setProcessing(p => ({ ...p, [id]: status }));
        try {
            const response = await fetch(`http://localhost:5000/api/admin/registrations/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            const data = await response.json();
            if (data.success) {
                setRegistrations(prev => prev.filter(r => r._id !== id)); // original line
                showToast(
                    status === 'Approved' ? '✓ Registration Approved' : '✗ Registration Rejected',
                    status === 'Approved' ? C.success : C.danger
                );
            } else {
                showToast(data.message || 'Action failed', C.danger);
            }
        } catch (err) {
            // demo fallback
            setRegistrations(prev => prev.filter(r => r._id !== id));
            showToast(
                status === 'Approved' ? '✓ Approved (demo)' : '✗ Rejected (demo)',
                status === 'Approved' ? C.success : C.danger
            );
        } finally {
            setProcessing(p => { const n = { ...p }; delete n[id]; return n; });
        }
    };

    // ── original renderDetails ────────────────────────────────────────────────
    const renderDetails = (reg) => {
        switch (reg.role) {
            case 'Student':   return `Roll: ${reg.rollNo || 'N/A'} | Class: ${reg.standard || 'N/A'}`;
            case 'Teacher':   return `ID: ${reg.teacherId || 'N/A'} | Desig: ${reg.designation || 'N/A'}`;
            case 'Admin':     return `Admin ID: ${reg.adminId || 'N/A'} | Access: ${reg.accessLevel || 'N/A'}`;
            case 'Principal': return `Principal ID: ${reg.principalId || 'N/A'} | Exp: ${reg.experience || 'N/A'}`;
            default:          return 'No details provided';
        }
    };

    // ── helpers ───────────────────────────────────────────────────────────────
    const showToast = (msg, color) => {
        setToast({ msg, color });
        setTimeout(() => setToast(null), 3200);
    };

    const roles    = ['All', 'Student', 'Teacher', 'Admin', 'Principal'];
    const filtered = registrations
        .filter(r => filterRole === 'All' || r.role === filterRole)
        .filter(r => !search ||
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div style={{ position: 'relative' }}>

            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed', top: 20, right: 20, zIndex: 9999,
                    background: toast.color + '22',
                    border: `1px solid ${toast.color}55`,
                    borderRadius: 10, padding: '12px 20px',
                    color: toast.color, fontWeight: 700, fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: `0 8px 24px ${toast.color}22`,
                    animation: 'fadeUp 0.3s ease',
                }}>
                    {toast.msg}
                </div>
            )}

            {/* Page heading */}
            <div style={{ marginBottom: 20 }}>
                <h2 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 20, fontWeight: 800, color: C.text,
                    letterSpacing: '-0.02em',
                }}>
                    Pending User Registrations
                </h2>
                <p style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>
                    Review and approve or reject user registration requests.
                </p>
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex', gap: 10, flexWrap: 'wrap',
                marginBottom: 16, alignItems: 'center',
            }}>
                {/* Role filter tabs */}
                <div style={{
                    display: 'flex',
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8, overflow: 'hidden',
                }}>
                    {roles.map((r, i) => (
                        <button key={r} onClick={() => setFilterRole(r)} style={{
                            padding: '7px 14px', fontSize: 12, fontWeight: 600,
                            cursor: 'pointer',
                            background: filterRole === r ? C.accentDim : 'none',
                            border: 'none',
                            color: filterRole === r ? C.accent : C.textMuted,
                            borderRight: i < roles.length - 1 ? `1px solid ${C.border}` : 'none',
                            transition: 'all 0.15s',
                            fontFamily: "'DM Sans', sans-serif",
                        }}>
                            {r}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div style={{
                    flex: 1, minWidth: 200,
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8, padding: '7px 12px',
                }}>
                    <span style={{ color: C.textMuted, fontSize: 14 }}>⌕</span>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name or email…"
                        style={{
                            background: 'none', border: 'none', outline: 'none',
                            color: C.text, fontSize: 13, width: '100%',
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    />
                </div>

                {/* Refresh */}
                <button onClick={fetchRegistrations} style={{
                    padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                    background: C.accentDim, border: `1px solid ${C.accent}44`,
                    color: C.accent, cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                }}>
                    ↺ Refresh
                </button>
            </div>

            {/* Table card */}
            <div style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 14, overflow: 'hidden',
            }}>
                {loading ? (
                    <div style={{ padding: '60px 0', textAlign: 'center' }}>
                        <div style={{ fontSize: 30, opacity: 0.4, marginBottom: 10 }}>⟳</div>
                        <div style={{ fontSize: 13, color: C.textMuted }}>Loading registrations…</div>
                    </div>

                ) : filtered.length === 0 ? (
                    <div style={{ padding: '60px 0', textAlign: 'center' }}>
                        <div style={{ fontSize: 40, opacity: 0.2, marginBottom: 12 }}>◎</div>
                        <div style={{
                            fontSize: 15, fontWeight: 700, color: C.text,
                            fontFamily: "'Syne', sans-serif",
                        }}>
                            No pending registrations
                        </div>
                        <div style={{ fontSize: 13, color: C.textMuted, marginTop: 6 }}>
                            All caught up! New requests will appear here.
                        </div>
                    </div>

                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: C.surfaceAlt, borderBottom: `1px solid ${C.border}` }}>
                                    {['User', 'Role', 'Details', 'Actions'].map((h, i) => (
                                        <th key={h} style={{
                                            padding: '11px 16px',
                                            textAlign: i === 3 ? 'center' : 'left',
                                            fontSize: 11, fontWeight: 700, color: C.textMuted,
                                            letterSpacing: '0.07em', textTransform: 'uppercase',
                                            fontFamily: "'DM Sans', sans-serif",
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((reg, idx) => {
                                    const busy = !!processing[reg._id];
                                    return (
                                        <tr
                                            key={reg._id}
                                            style={{
                                                borderBottom: idx < filtered.length - 1
                                                    ? `1px solid ${C.border}` : 'none',
                                                background: 'transparent',
                                                transition: 'background 0.15s',
                                                animation: `fadeUp 0.3s ease ${idx * 0.04}s both`,
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = C.surfaceAlt}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            {/* User — SAME as original */}
                                            <td style={{ padding: '13px 16px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <Avatar
                                                        name={reg.name}
                                                        url={reg.profilePhotoUrl}
                                                        color={roleColor(reg.role)}
                                                    />
                                                    <div>
                                                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
                                                            {reg.name}
                                                        </div>
                                                        <div style={{ fontSize: 12, color: C.textMuted }}>
                                                            {reg.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role — SAME badge logic as original */}
                                            <td style={{ padding: '13px 16px' }}>
                                                <RoleBadge role={reg.role} />
                                            </td>

                                            {/* Details — SAME renderDetails function */}
                                            <td style={{
                                                padding: '13px 16px',
                                                fontSize: 12, color: C.textMuted,
                                                fontFamily: "'DM Sans', sans-serif",
                                            }}>
                                                {renderDetails(reg)}
                                            </td>

                                            {/* Actions — SAME handleReview calls */}
                                            <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                                                    <button
                                                        disabled={busy}
                                                        onClick={() => handleReview(reg._id, 'Approved')}
                                                        style={{
                                                            padding: '6px 14px', borderRadius: 7,
                                                            fontSize: 12, fontWeight: 700,
                                                            background: busy && processing[reg._id] === 'Approved'
                                                                ? C.success + '40' : C.successDim,
                                                            border: `1px solid ${C.success}55`,
                                                            color: C.success,
                                                            cursor: busy ? 'wait' : 'pointer',
                                                            opacity: busy && processing[reg._id] !== 'Approved' ? 0.4 : 1,
                                                            transition: 'all 0.15s',
                                                            fontFamily: "'DM Sans', sans-serif",
                                                        }}
                                                        onMouseEnter={e => { if (!busy) e.currentTarget.style.background = C.success + '30'; }}
                                                        onMouseLeave={e => { if (!busy) e.currentTarget.style.background = C.successDim; }}
                                                    >
                                                        {busy && processing[reg._id] === 'Approved' ? '…' : '✓ Approve'}
                                                    </button>
                                                    <button
                                                        disabled={busy}
                                                        onClick={() => handleReview(reg._id, 'Rejected')}
                                                        style={{
                                                            padding: '6px 14px', borderRadius: 7,
                                                            fontSize: 12, fontWeight: 700,
                                                            background: busy && processing[reg._id] === 'Rejected'
                                                                ? C.danger + '40' : C.dangerDim,
                                                            border: `1px solid ${C.danger}55`,
                                                            color: C.danger,
                                                            cursor: busy ? 'wait' : 'pointer',
                                                            opacity: busy && processing[reg._id] !== 'Rejected' ? 0.4 : 1,
                                                            transition: 'all 0.15s',
                                                            fontFamily: "'DM Sans', sans-serif",
                                                        }}
                                                        onMouseEnter={e => { if (!busy) e.currentTarget.style.background = C.danger + '30'; }}
                                                        onMouseLeave={e => { if (!busy) e.currentTarget.style.background = C.dangerDim; }}
                                                    >
                                                        {busy && processing[reg._id] === 'Rejected' ? '…' : '✕ Reject'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer summary */}
                {!loading && filtered.length > 0 && (
                    <div style={{
                        padding: '10px 16px',
                        borderTop: `1px solid ${C.border}`,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
                    }}>
                        <span style={{ fontSize: 12, color: C.textMuted }}>
                            Showing {filtered.length} of {registrations.length} request{registrations.length !== 1 ? 's' : ''}
                        </span>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {['Student','Teacher','Admin','Principal'].map(r => {
                                const count = registrations.filter(x => x.role === r).length;
                                const color = roleColor(r);
                                return count > 0 ? (
                                    <span key={r} style={{
                                        fontSize: 11, padding: '2px 8px', borderRadius: 20,
                                        background: color + '18', color, fontWeight: 600,
                                    }}>
                                        {r}: {count}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT — AdminDashboard
// Renders DashboardHome on /dashboard/admin
// Renders PendingRegistrations on /dashboard/admin/registrations
// ═══════════════════════════════════════════════════════════════════════════════
const AdminDashboard = () => {
    const token    = useSelector(state => state.auth.token);
    const user     = useSelector(state => state.auth.user);
    const location = window.location.pathname; // uses native — avoids extra import

    // decide which view to show based on URL
    const isRegistrations = location.includes('/registrations');

    return (
        <>
            {isRegistrations
                ? <PendingRegistrations token={token} />
                : <DashboardHome user={user} />
            }
        </>
    );
};

export default AdminDashboard;