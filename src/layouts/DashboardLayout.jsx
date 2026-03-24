

import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectCurrentUser } from '../store/authSlice';
// Make sure this points to your actual modules file where useNotifications is exported
import { useNotifications } from '../pages/modules';


// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
    bg: '#f8fafc', // slate-50 overall app background
    surface: '#ffffff', // pure white for cards
    surfaceAlt: '#eef2ff', // indigo-50 soft purple highlight for active/hover links
    border: '#e2e8f0', // slate-200 border
    accent: '#3730a3', // indigo-800 deep indigo for active states, brand colors
    accentDim: '#eef2ff', // indigo-50
    success: '#0d9488', // teal-600 vibrant teal-green for success/action
    danger: '#ef4444', // red-500
    dangerDim: '#fee2e2', // red-100
    purple: '#6d28d9', // purple-700
    purpleDim: '#f3e8ff', // purple-50
    orange: '#ea580c', // orange-600
    warning: '#f59e0b', // amber-500 warm amber/orange for alerts
    text: '#1e293b', // slate-800 deep slate (no pure black) for headings
    textMuted: '#475569', // slate-600 softer dark slate-gray for standard text
    textFaint: '#94a3b8', // slate-400
};

const ROLE_META = {
    admin: {
        color: C.accent,
        gradient: `linear-gradient(135deg, ${C.accent} 0%, #4f46e5 100%)`, // indigo gradient
        // icon: '<img src="/abhyaas-logo.png" alt="Abhyaas" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />,',
        icon: <img src="/logo.png" alt="Abhyaas" style={{ width: '200%', height: '180%', objectFit: 'cover', borderRadius: '8px' }} />,
        label: 'Admin Portal',
        links: [
            { name: 'Dashboard', path: '/dashboard/admin', icon: '◈' },
            // { name: 'Registrations', path: '/dashboard/admin/registrations', icon: '◉', badge: true },
            {
                name: 'User Creation',
                icon: '👤',
                children: [
                    { name: 'Create User', path: '/dashboard/admin/user-creation', icon: '➕' },
                    { name: 'Students', path: '/dashboard/admin/students', icon: '◎' },
                    { name: 'Teachers', path: '/dashboard/admin/teachers', icon: '◍' }
                ]
            },
            {
                name: 'Classes',
                path: '/dashboard/admin/classes',
                icon: '⬡',
                children: [
                    { name: 'View Classes', path: '/dashboard/admin/classes/view', icon: '◎' },
                    { name: 'Create Class', path: '/dashboard/admin/classes/create', icon: '◍' },
                    { name: 'Create Houses', path: '/dashboard/admin/classes/houses', icon: '◫' }
                ]
            },


            { name: 'Attendance', path: '/dashboard/admin/attendance', icon: '◷' },
            // { name: 'Examinations', path: '/dashboard/admin/exams', icon: '◈' },
            // { name: 'Timetable', path: '/dashboard/admin/timetable', icon: '▦' },
            { name: 'Fee Management', path: '/dashboard/admin/fees', icon: '◆' },
            { name: 'Subjects', path: '/dashboard/admin/subjects', icon: '📖' },
            { name: 'Enter Marks', path: '/dashboard/admin/marks', icon: '📝' },
            { name: 'Inventory', path: '/dashboard/admin/inventory', icon: '📦' },

            {
                name: 'Announcements',
                
                icon: '⬡',
                children: [
                    { name: 'Examinations', path: '/dashboard/admin/exams', icon: '◈' },
                    {name:'Circulars',path:'/dashboard/admin/communication', icon: '◎' }
                  
                ]
            },
            // { name: 'Announcements', path: '/dashboard/admin/communication', icon: '◎' },
            { name: 'Reports', path: '/dashboard/admin/reports', icon: '◫' },
            // { name: 'Talent Tests', path: '/dashboard/admin/talent', icon: '★' },
            // { name: 'Leave Mgmt', path: '/dashboard/admin/leave', icon: '◷' },
            { name: 'Payroll', path: '/dashboard/admin/payroll', icon: '◆' },
            // { name: 'Activity Logs', path: '/dashboard/admin/logs', icon: '◎' },
        ],
    },
    principal: {
        color: C.purple,
        gradient: `linear-gradient(135deg, ${C.purple} 0%, #a78bfa 100%)`,
        icon: '🎓',
        label: 'Principal Portal',
        links: [
            { name: 'Dashboard', path: '/dashboard/principal', icon: '◈' },
            { name: 'View Students', path: '/dashboard/principal/students', icon: '◎' },
            { name: 'View Teachers', path: '/dashboard/principal/teachers', icon: '◍' },
            { name: 'Attendance', path: '/dashboard/principal/attendance', icon: '◷' },
            { name: 'Performance', path: '/dashboard/principal/performance', icon: '◫' },
            { name: 'Exam Results', path: '/dashboard/principal/exams', icon: '◈' },
            
            { name: 'Fee Reports', path: '/dashboard/principal/fees', icon: '◆' },
            { name: 'Timetable', path: '/dashboard/principal/timetable', icon: '▦' },
            { name: 'Announcements', path: '/dashboard/principal/communication', icon: '◎' },
            { name: 'Talent Tests', path: '/dashboard/principal/talent', icon: '★' },
            { name: 'Analytics', path: '/dashboard/principal/reports', icon: '◫' },
        ],
    },
    teacher: {
        color: C.success,
        gradient: `linear-gradient(135deg, ${C.success} 0%, #238636 100%)`,
        icon: '📚',
        label: 'Teacher Portal',
        links: [
            { name: 'Dashboard', path: '/dashboard/teacher', icon: '◈' },
            { name: 'My Profile', path: '/dashboard/teacher/profile', icon: '◉' },
            { name: 'My Classes', path: '/dashboard/teacher/classes', icon: '⬡' },
            { name: 'Mark Attendance', path: '/dashboard/teacher/attendance', icon: '◷' },
            { name: 'Enter Marks', path: '/dashboard/teacher/marks', icon: '◈' },
            { name: 'Upload Homework', path: '/dashboard/teacher/homework', icon: '◉' },
            { name: 'Evaluate Assignments', path: '/dashboard/teacher/assignments', icon: '◫' },
            { name: 'Timetable', path: '/dashboard/teacher/timetable', icon: '▦' },
            { name: 'Leave Request', path: '/dashboard/teacher/leave', icon: '◷' },
            { name: 'Student Perf.', path: '/dashboard/teacher/performance', icon: '◎' },
            { name: 'Parent Comm.', path: '/dashboard/teacher/communication', icon: '◎' },
        ],
    },
    student: {
        color: C.orange,
        gradient: `linear-gradient(135deg, ${C.orange} 0%, #e0713b 100%)`,
        icon: '🎒',
        label: 'Student Portal',
        links: [
            { name: 'Dashboard', path: '/dashboard/student', icon: '◈' },
            { name: 'My Profile', path: '/dashboard/student/profile', icon: '◉' },
            { name: 'Attendance', path: '/dashboard/student/attendance', icon: '◷' },
            { name: 'Exam Results', path: '/dashboard/student/results', icon: '◈' },
            { name: 'Timetable', path: '/dashboard/student/timetable', icon: '▦' },
            { name: 'Homework', path: '/dashboard/student/homework', icon: '◉' },
            { name: 'Fee Status', path: '/dashboard/student/fees', icon: '◆' },
            { name: 'Library', path: '/dashboard/student/library', icon: '▣' },
            { name: 'Notices', path: '/dashboard/student/notices', icon: '◎' },
            { name: 'Talent Tests', path: '/dashboard/student/talent', icon: '★' },
        ],
    },
    parent: {
        color: C.success,
        gradient: `linear-gradient(135deg, #39d353 0%, #26a641 100%)`,
        icon: '👨‍👩‍👧',
        label: 'Parent Portal',
        links: [
            { name: 'Dashboard', path: '/dashboard/parent', icon: '◈' },
            { name: 'Child Profile', path: '/dashboard/parent/profile', icon: '◉' },
            { name: 'Attendance', path: '/dashboard/parent/attendance', icon: '◷' },
            { name: 'Exam Results', path: '/dashboard/parent/results', icon: '◈' },
            { name: 'Timetable', path: '/dashboard/parent/timetable', icon: '▦' },
            { name: 'Homework', path: '/dashboard/parent/homework', icon: '◉' },
            { name: 'Fee Status', path: '/dashboard/parent/fees', icon: '◆' },
            { name: 'Notices', path: '/dashboard/parent/notices', icon: '◎' },
            { name: 'Talent Tests', path: '/dashboard/parent/talent', icon: '★' },
        ],
    },
};

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ meta, collapsed, setCollapsed, navLinks, pendingCount }) {
    const location = useLocation();
    const [hov, setHov] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <aside style={{
            width: collapsed ? 64 : 248,
            minHeight: '100vh',
            background: C.surface,
            borderRight: `1px solid ${C.border}`,
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
            overflow: 'hidden',
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            height: '100vh',
            zIndex: 20,
        }}>
            {/* Logo */}
            <div style={{
                padding: collapsed ? '18px 0' : '18px 16px',
                borderBottom: `1px solid ${C.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                justifyContent: collapsed ? 'center' : 'flex-start',
                flexShrink: 0,
            }}>
                <div style={{
                    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                    background: meta.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 17, boxShadow: `0 0 14px ${meta.color}50`,
                }}>
                    {meta.icon}
                </div>
                {!collapsed && (
                    <div>
                        <div style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800, fontSize: 14,
                            color: C.text, letterSpacing: '0.02em',
                        }}>
                            ABHYAAS
                        </div>
                        <div style={{
                            fontSize: 10, color: meta.color,
                            fontWeight: 700, letterSpacing: '0.09em',
                            textTransform: 'uppercase',
                        }}>
                            {meta.label}
                        </div>
                    </div>
                )}
            </div>

            {/* Nav Links */}
            <nav style={{
                flex: 1,
                padding: '8px 0',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                {navLinks.map((link, index) => {
                    const isDropdown = !!link.children;

                    // Logic to determine active states
                    const isActiveParent = link.path && location.pathname === link.path;
                    const isChildActive = isDropdown && link.children.some(c => location.pathname === c.path);

                    const isActive = isDropdown ? isActiveParent : location.pathname === link.path;
                    const isDropdownOpen = openMenu === index || isChildActive || isActiveParent;

                    const isHov = hov === link.name;
                    const badge = link.badge ? pendingCount : 0;

                    // Reusable Link Item Styles
                    const linkStyle = {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: collapsed ? '9px 0' : '8px 14px',
                        margin: '1px 8px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        // Use soft purple-indigo background for hover/active state
                        background: isActive ? C.surfaceAlt : isHov ? C.surfaceAlt : 'transparent',
                        borderLeft: isActive ? `3px solid ${meta.color}` : '3px solid transparent',
                        transition: 'all 0.2s ease',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        textDecoration: 'none',
                        position: 'relative',
                    };

                    const textStyle = {
                        fontSize: 13,
                        color: isActive ? meta.color : C.textMuted,
                        fontWeight: isActive ? 700 : 500, // Make links slightly bolder by default
                        whiteSpace: 'nowrap',
                        fontFamily: "'Inter', sans-serif",
                        flex: 1,
                    };

                    const iconStyle = {
                        fontSize: 15,
                        color: isActive ? meta.color : C.textMuted,
                        flexShrink: 0,
                        width: 20,
                        textAlign: 'center',
                    };

                    if (isDropdown) {
                        return (
                            <div key={link.name}>
                                {/* Dropdown Parent Menu - acts as a toggle */}
                                <div
                                    title={collapsed ? link.name : ''}
                                    onMouseEnter={() => setHov(link.name)}
                                    onMouseLeave={() => setHov(null)}
                                    onClick={() => {
                                        if (collapsed) setCollapsed(false);
                                        setOpenMenu(isDropdownOpen ? null : index);
                                    }}
                                    style={{ ...linkStyle, userSelect: 'none' }}
                                >
                                    <span style={iconStyle}>{link.icon}</span>
                                    {!collapsed && (
                                        <>
                                            <span style={textStyle}>{link.name}</span>
                                            <span style={{ fontSize: 10, color: C.textMuted }}>
                                                {isDropdownOpen ? '▲' : '▼'}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Dropdown Children */}
                                {isDropdownOpen && !collapsed && (
                                    <div style={{ paddingLeft: 12, marginTop: 2, marginBottom: 4 }}>
                                        {link.children.map((child) => {
                                            const isChildCurrent = location.pathname === child.path;
                                            const isChildHov = hov === child.name;

                                            return (
                                                <Link
                                                    key={child.name}
                                                    to={child.path}
                                                    onMouseEnter={() => setHov(child.name)}
                                                    onMouseLeave={() => setHov(null)}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', gap: 10,
                                                        padding: '7px 14px', margin: '1px 8px', borderRadius: 8,
                                                        cursor: 'pointer', textDecoration: 'none',
                                                        background: isChildCurrent ? C.surfaceAlt : isChildHov ? C.surfaceAlt : 'transparent',
                                                        borderLeft: isChildCurrent ? `3px solid ${meta.color}` : '3px solid transparent',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <span style={{ ...iconStyle, fontSize: 13, color: isChildCurrent ? meta.color : C.textMuted }}>{child.icon}</span>
                                                    <span style={{ ...textStyle, color: isChildCurrent ? meta.color : C.textMuted, fontWeight: isChildCurrent ? 700 : 400 }}>{child.name}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    // Standard Links
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            title={collapsed ? link.name : ''}
                            onMouseEnter={() => setHov(link.name)}
                            onMouseLeave={() => setHov(null)}
                            style={linkStyle}
                        >
                            <span style={iconStyle}>{link.icon}</span>

                            {!collapsed && (
                                <span style={textStyle}>{link.name}</span>
                            )}

                            {/* Badge when expanded */}
                            {!collapsed && badge > 0 && (
                                <span style={{
                                    fontSize: 10, fontWeight: 800,
                                    padding: '1px 6px', borderRadius: 20,
                                    background: C.danger, color: '#fff',
                                    flexShrink: 0,
                                }}>
                                    {badge}
                                </span>
                            )}

                            {/* Dot badge when collapsed */}
                            {collapsed && badge > 0 && (
                                <span style={{
                                    position: 'absolute', top: 5, right: 10,
                                    width: 7, height: 7, borderRadius: '50%',
                                    background: C.danger,
                                    border: `2px solid ${C.surface}`,
                                }} />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse toggle */}
            <div
                onClick={() => setCollapsed(c => !c)}
                style={{
                    padding: '14px',
                    borderTop: `1px solid ${C.border}`,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: collapsed ? 'center' : 'flex-end',
                    color: C.textMuted,
                    fontSize: 16,
                    flexShrink: 0,
                    transition: 'color 0.2s',
                    userSelect: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.color = C.text}
                onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
            >
                {collapsed ? '→' : '←'}
            </div>
        </aside>
    );
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
function Topbar({ user, meta, onToggle, pendingCount, onLogout }) {
    const [showNotif, setShowNotif] = useState(false);
    // Replace with your actual hook if you have it available:
    // const { notifs, unread, markRead }  = useNotifications();
    const notifs = []; const unread = 0; const markRead = () => { };
    const [showProfile, setShowProfile] = useState(false);
    const location = useLocation();

    // derive page name from last path segment
    const pageName = (() => {
        const seg = location.pathname.split('/').filter(Boolean).pop();
        if (!seg || seg === 'admin' || seg === 'student' || seg === 'teacher' || seg === 'principal' || seg === 'parent')
            return 'Dashboard';
        return seg.charAt(0).toUpperCase() + seg.slice(1);
    })();

    return (
        <header style={{
            height: 60,
            background: C.surface,
            borderBottom: `1px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 14,
            position: 'sticky',
            top: 0,
            zIndex: 19,
            flexShrink: 0,
        }}>
            {/* Hamburger */}
            <button
                onClick={onToggle}
                style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: C.textMuted, fontSize: 20, padding: 4,
                    display: 'flex', alignItems: 'center',
                    borderRadius: 6,
                }}
            >
                ☰
            </button>

            {/* Breadcrumb */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                    fontSize: 11, color: C.textMuted,
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: 'capitalize',
                }}>
                    {user?.role}
                </span>
                <span style={{ color: C.textFaint, fontSize: 11 }}>›</span>
                <span style={{
                    fontSize: 13, fontWeight: 700,
                    color: C.text, fontFamily: "'DM Sans', sans-serif",
                }}>
                    {pageName}
                </span>
            </div>

            {/* Search
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: C.bg, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: '6px 12px', width: 210,
            }}>
                <span style={{ color: C.textMuted, fontSize: 14 }}>⌕</span>
                <input
                    placeholder="Search anything…"
                    style={{
                        background: 'none', border: 'none', outline: 'none',
                        color: C.text, fontSize: 13, width: '100%',
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                />
                <span style={{ color: C.textFaint, fontSize: 11 }}>⌘K</span>
            </div> */}

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => { setShowNotif(s => !s); setShowProfile(false); }}
                    style={{
                        background: showNotif ? C.surfaceAlt : 'none',
                        border: `1px solid ${showNotif ? C.border : 'transparent'}`,
                        borderRadius: 8, cursor: 'pointer',
                        color: C.textMuted, fontSize: 17,
                        padding: '5px 10px', position: 'relative',
                    }}
                >
                    🔔
                    {(unread > 0 || pendingCount > 0) && (
                        <span style={{
                            position: 'absolute', top: 4, right: 5,
                            width: 8, height: 8, borderRadius: '50%',
                            background: C.danger,
                            border: `2px solid ${C.surface}`,
                        }} />
                    )}
                    {unread > 0 && (
                        <span style={{
                            position: 'absolute', top: 2, right: 2,
                            minWidth: 16, height: 16, borderRadius: 8,
                            background: C.danger, color: '#fff',
                            fontSize: 9, fontWeight: 800,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '0 4px',
                            border: `2px solid ${C.surface}`,
                        }}>{unread > 9 ? '9+' : unread}</span>
                    )}
                </button>

                {showNotif && (
                    <div style={{
                        position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                        width: 300, background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderRadius: 12, padding: 12,
                        zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '0.08em' }}>
                                NOTIFICATIONS {unread > 0 && <span style={{ background: C.danger, color: '#fff', borderRadius: 20, padding: '1px 6px', fontSize: 10, marginLeft: 4 }}>{unread}</span>}
                            </div>
                            {unread > 0 && <button onClick={markRead} style={{ fontSize: 10, color: C.accent, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Mark all read</button>}
                        </div>
                        {notifs.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '20px 0', color: C.textMuted, fontSize: 12 }}>
                                No notifications yet
                            </div>
                        ) : notifs.map((n, i) => (
                            <div key={n.id || i} style={{
                                padding: '8px 0',
                                borderBottom: i < notifs.length - 1 ? `1px solid ${C.border}` : 'none',
                                opacity: n.read ? 0.6 : 1,
                            }}>
                                <div style={{ fontSize: 12, color: C.text, fontWeight: n.read ? 400 : 600 }}>{n.msg}</div>
                                <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>
                                    {n.time ? new Date(n.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : ''}
                                    {n.type === 'announcement' && <span style={{ color: C.accent, marginLeft: 6 }}>📢 Announcement</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Profile */}
            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => { setShowProfile(s => !s); setShowNotif(false); }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: showProfile ? C.surfaceAlt : 'none',
                        border: `1px solid ${showProfile ? C.border : 'transparent'}`,
                        borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
                    }}
                >
                    <div style={{
                        width: 30, height: 30, borderRadius: '50%',
                        background: meta.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden', flexShrink: 0,
                        boxShadow: `0 0 10px ${meta.color}40`,
                    }}>
                        {user?.profilePhotoUrl
                            ? <img src={user.profilePhotoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <span style={{ fontSize: 13, color: '#fff', fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </span>
                        }
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
                            {user?.name}
                        </div>
                        <div style={{ fontSize: 10, color: meta.color, textTransform: 'capitalize' }}>
                            {user?.role}
                        </div>
                    </div>
                </button>

                {showProfile && (
                    <div style={{
                        position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                        width: 176, background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderRadius: 12, overflow: 'hidden',
                        zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    }}>
                        {[
                            { label: 'My Profile', to: '/profile', danger: false },
                            { label: 'Settings', to: '#', danger: false },
                            { label: 'Logout', to: null, danger: true },
                        ].map((item, i, arr) => (
                            item.to === null
                                ? <div
                                    key={i}
                                    onClick={onLogout}
                                    style={{
                                        padding: '10px 16px', fontSize: 13,
                                        color: C.danger, cursor: 'pointer',
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = C.dangerDim}
                                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                >
                                    {item.label}
                                </div>
                                : <Link
                                    key={i}
                                    to={item.to}
                                    onClick={() => setShowProfile(false)}
                                    style={{
                                        display: 'block',
                                        padding: '10px 16px', fontSize: 13,
                                        color: C.text, textDecoration: 'none',
                                        fontFamily: "'DM Sans', sans-serif",
                                        borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = C.surfaceAlt}
                                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                >
                                    {item.label}
                                </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD LAYOUT
// ═══════════════════════════════════════════════════════════════════════════════
export function DashboardLayout() {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [pendingCount, setPendingCount] = useState(); // TODO: fetch real count from API

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (!user) return (
        <div style={{
            minHeight: '100vh', background: C.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
        }}>
            Loading…
        </div>
    );

    const role = user?.role?.toLowerCase();
    const meta = ROLE_META[role] || ROLE_META.admin;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                *, *::before, *::after { box-sizing: border-box; }
                body {
                    margin: 0; padding: 0;
                    background: ${C.bg};
                    color: ${C.text};
                    font-family: 'Inter', sans-serif;
                }
                ::-webkit-scrollbar { width: 5px; height: 5px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
                input::placeholder { color: ${C.textFaint}; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div style={{
                display: 'flex',
                minHeight: '100vh',
                background: C.bg,
            }}>
                {/* ── Sidebar ── */}
                <Sidebar
                    meta={meta}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    navLinks={meta.links}
                    pendingCount={pendingCount}
                />

                {/* ── Right panel ── */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    minHeight: '100vh',
                }}>
                    <Topbar
                        user={user}
                        meta={meta}
                        onToggle={() => setCollapsed(c => !c)}
                        pendingCount={pendingCount}
                        onLogout={handleLogout}
                    />

                    {/* Page content via React Router <Outlet /> */}
                    <main style={{
                        flex: 1,
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        padding: 24,
                        background: C.bg,
                        animation: 'fadeUp 0.3s ease',
                    }}>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}

export default DashboardLayout;