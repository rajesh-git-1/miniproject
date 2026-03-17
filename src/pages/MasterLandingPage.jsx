

// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setCredentials, setSchoolId } from '../store/authSlice';

// // ─── Fallback schools (from seed.js) ──────────────────────────────────────
// const FALLBACK_SCHOOLS = [
//   { _id: 'abhyaas', name: 'Abhyas International School', address: 'Rajam', email: 'contact@abhyas.edu' },
//   { _id: 'dav',     name: 'DAV School',                  address: 'Rajam', email: 'info@davrajam.edu' },
//   { _id: 'sun',     name: 'Sun School',                  address: 'Rajam', email: 'admin@sunschool.edu' },
// ];

// const NOTICES = [
//   { type: 'Important', color: '#ef4444', bg: '#fef2f2', title: 'Mid-Term Exams',    body: 'Examinations begin January 10th. Please collect admit cards from the office.' },
//   { type: 'General',   color: '#3b82f6', bg: '#eff6ff', title: 'Winter Break',      body: 'School closed from Dec 24th to Jan 5th. Happy Holidays to all students and staff!' },
//   { type: 'Event',     color: '#22c55e', bg: '#f0fdf4', title: 'Annual Sports Day', body: 'Join us on February 15th for the Annual Sports Meet. Registration open for all students.' },
//   { type: 'Deadline',  color: '#f97316', bg: '#fff7ed', title: 'Fee Submission',    body: 'Last date for the 2nd Term Fee submission is Jan 30th. Please pay to avoid late fees.' },
// ];

// // ─── Up to 10th Class Data ────────────────────────────────────────────────
// const PROGRAMS = [
//   { id: 'pre-primary', name: 'Pre-Primary', desc: 'Nursery - UKG', icon: '🎨', color: '#f59e0b' },
//   { id: 'primary', name: 'Primary School', desc: 'Classes I - V', icon: '🎒', color: '#10b981' },
//   { id: 'middle', name: 'Middle School', desc: 'Classes VI - VIII', icon: '🔬', color: '#3b82f6' },
//   { id: 'high', name: 'High School', desc: 'Classes IX - X', icon: '🎓', color: '#8b5cf6' },
// ];

// const ACHIEVEMENTS = [
//   { id: 'gpa', name: '10/10 GPA (Board)', count: '150+', icon: '🌟', color: '#f59e0b' },
//   { id: 'olympiad', name: 'Olympiad Medals', count: '85', icon: '🏅', color: '#10b981' },
//   { id: 'sports', name: 'State Level Sports', count: '40+', icon: '🏆', color: '#3b82f6' },
//   { id: 'ntse', name: 'NTSE Scholars', count: '24', icon: '💡', color: '#8b5cf6' },
// ];

// const CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   body { font-family: 'Nunito', sans-serif; }

//   @keyframes fadeIn  { from { opacity: 0; }                                           to { opacity: 1; } }
//   @keyframes slideUp { from { opacity: 0; transform: translateY(22px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

//   .nav-link {
//     background: none; border: none; cursor: pointer; padding: 8px 14px;
//     border-radius: 8px; font-family: 'Nunito', sans-serif;
//     font-size: 0.9rem; font-weight: 700; color: #475569;
//     transition: background .18s, color .18s;
//   }
//   .nav-link:hover { background: #f0f9ff; color: #0ea5e9; }

//   .nav-primary {
//     padding: 9px 22px; background: linear-gradient(135deg,#0ea5e9,#2563eb);
//     color: white; border: none; border-radius: 10px;
//     font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.9rem;
//     cursor: pointer; transition: transform .18s, box-shadow .18s;
//   }
//   .nav-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(14,165,233,.35); }

//   .nav-outline {
//     padding: 7px 20px; background: white; color: #2563eb;
//     border: 2px solid #2563eb; border-radius: 10px;
//     font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.9rem;
//     cursor: pointer; transition: background .18s;
//   }
//   .nav-outline:hover { background: #eff6ff; }

//   .modal-overlay {
//     position: fixed; inset: 0; background: rgba(15,23,42,.38);
//     backdrop-filter: blur(7px); z-index: 300;
//     display: flex; align-items: center; justify-content: center;
//     padding: 1rem; animation: fadeIn .2s ease;
//   }
//   .modal-box {
//     background: white; border-radius: 22px;
//     box-shadow: 0 24px 60px rgba(0,0,0,.13);
//     width: 100%; max-width: 500px; max-height: 90vh;
//     overflow-y: auto; animation: slideUp .28s cubic-bezier(.34,1.56,.64,1);
//   }
//   .modal-box.wide { max-width: 650px; }
//   .modal-box.extra-wide { max-width: 850px; }

//   .form-input {
//     width: 100%; padding: 12px 15px;
//     border: 2px solid #e2e8f0; border-radius: 11px;
//     font-family: 'Nunito', sans-serif; font-size: 1rem;
//     color: #1e293b; background: #f8fafc; outline: none;
//     transition: border-color .18s;
//   }
//   .form-input:focus { border-color: #0ea5e9; background: white; }

//   .submit-btn {
//     width: 100%; padding: 13px;
//     background: linear-gradient(135deg,#0ea5e9,#2563eb);
//     color: white; border: none; border-radius: 11px;
//     font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 1rem;
//     cursor: pointer; transition: transform .18s, box-shadow .18s;
//   }
//   .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(14,165,233,.35); }
//   .submit-btn:disabled { opacity: .65; cursor: not-allowed; transform: none !important; }

//   .school-select {
//     width: 100%; padding: 13px 40px 13px 15px;
//     border: 2px solid #e2e8f0; border-radius: 11px;
//     font-family: 'Nunito', sans-serif; font-size: 1rem; font-weight: 600;
//     color: #1e293b; background: #f8fafc; cursor: pointer;
//     appearance: none; outline: none;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230ea5e9' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
//     background-repeat: no-repeat; background-position: right 14px center;
//     transition: border-color .18s;
//   }
//   .school-select:focus { border-color: #0ea5e9; }

//   .program-card {
//     background: white; border: 1px solid #e2e8f0; border-radius: 16px;
//     padding: 2rem 1rem; text-align: center; transition: all 0.2s ease;
//     cursor: pointer; display: flex; flex-direction: column; align-items: center;
//   }
//   .program-card:hover {
//     box-shadow: 0 12px 30px rgba(0,0,0,0.06); transform: translateY(-4px);
//     border-color: #cbd5e1;
//   }
//   .program-icon-wrapper {
//     width: 90px; height: 90px; border-radius: 50%;
//     margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center;
//     font-size: 2.5rem; background: #f8fafc; border: 2px solid #e2e8f0;
//   }
// `;

// function Modal({ title, subtitle, onClose, children, sizeClass = '' }) {
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className={`modal-box ${sizeClass}`} onClick={e => e.stopPropagation()}>
//         {title && (
//           <div style={{ padding: '1.8rem 2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//             <div>
//               <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>{title}</h2>
//               {subtitle && <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: 3 }}>{subtitle}</p>}
//             </div>
//             <button
//               onClick={onClose}
//               style={{ background: '#f1f5f9', border: 'none', width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', color: '#64748b', marginLeft: 12, flexShrink: 0 }}
//             >✕</button>
//           </div>
//         )}
//         <div style={{ padding: title ? '1.3rem 2rem 2rem' : '2rem' }}>
//           {!title && (
//              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-10px' }}>
//                 <button
//                   onClick={onClose}
//                   style={{ background: '#f1f5f9', border: 'none', width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', color: '#64748b' }}
//                 >✕</button>
//              </div>
//           )}
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function MasterLandingPage() {
//   const [schools,        setSchools]        = useState(FALLBACK_SCHOOLS);
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [activeModal,    setActiveModal]    = useState(null);
//   const [loginEmail,     setLoginEmail]     = useState('');
//   const [loginPassword,  setLoginPassword]  = useState('');
//   const [loginError,     setLoginError]     = useState('');
//   const [loginLoading,   setLoginLoading]   = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const isAbhyaas = selectedSchool?.name?.toLowerCase().includes('abhya');

//   useEffect(() => {
//     fetch('http://localhost:5000/api/schools')
//       .then(r => r.ok ? r.json() : null)
//       .then(data => {
//         if (!data) return;
//         const list = Array.isArray(data) ? data : data.data;
//         if (list && list.length > 0) {
//           setSchools(list);
//           const savedId = sessionStorage.getItem('selectedSchoolId');
//           if (savedId) {
//             const found = list.find(s => s._id === savedId);
//             if (found) { setSelectedSchool(found); dispatch(setSchoolId(found._id)); }
//           }
//         } else {
//           restoreFromSession(FALLBACK_SCHOOLS);
//         }
//       })
//       .catch(() => {
//         restoreFromSession(FALLBACK_SCHOOLS);
//       });
//   }, [dispatch]);

//   function restoreFromSession(schoolList) {
//     const savedId = sessionStorage.getItem('selectedSchoolId');
//     if (savedId) {
//       const found = schoolList.find(s => s._id === savedId);
//       if (found) { setSelectedSchool(found); dispatch(setSchoolId(found._id)); }
//     }
//   }

//   const handleSchoolChange = (e) => {
//     const school = schools.find(s => s._id === e.target.value) || null;
//     setSelectedSchool(school);
//     dispatch(setSchoolId(school?._id || null));
//     if (school) sessionStorage.setItem('selectedSchoolId', school._id);
//     else sessionStorage.removeItem('selectedSchoolId');
//     setActiveModal(null);
//   };

//   const closeModal = useCallback(() => setActiveModal(null), []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoginError('');
//     setLoginLoading(true);
//     try {
//       const res  = await fetch('http://localhost:5000/api/auth/login', {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify({ email: loginEmail, password: loginPassword, school_id: selectedSchool?._id }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Login failed');
//       dispatch(setCredentials({ user: data.user, token: data.token }));
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       sessionStorage.removeItem('selectedSchoolId'); 
//       navigate(`/dashboard/${data.user.role.toLowerCase()}`);
//     } catch (err) {
//       setLoginError(err.message);
//     } finally {
//       setLoginLoading(false);
//     }
//   };

//   const lbl = { display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 };

//   return (
//     <>
//       <style>{CSS}</style>

//       <div style={{ minHeight: '100vh', fontFamily: 'Nunito,sans-serif', position: 'relative' }}>

//         {/* ── CLEAN DECENT BACKGROUND ── */}
//         <div style={{
//           position: 'fixed', inset: 0, zIndex: 0,
//           background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f0fdf4 100%)'
//         }} />

//         {/* ── NAVBAR ── */}
//         <nav style={{
//           position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
//           background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(16px)',
//           borderBottom: '1px solid #e2e8f0',
//           boxShadow: '0 2px 14px rgba(37,99,235,.07)',
//           height: 66, display: 'flex', alignItems: 'center',
//           justifyContent: 'space-between', padding: '0 2rem',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             {/* Added Abhyaas Logo Back Here */}
//             {isAbhyaas ? (
//                <img src="/abhyaas-logo.jpeg" alt="Abhyaas" style={{ height: 42, width: 42, objectFit: 'contain', borderRadius: 8 }} onError={e => { e.target.style.display = 'none'; }} />
//             ) : (
//                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#0ea5e9,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1.05rem' }}>E</div>
//             )}
//             <div>
//               <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: '1.1rem', color: '#1e3a8a', lineHeight: 1.1 }}>
//                 {isAbhyaas ? 'Abhyaas' : 'EduManager'}
//               </div>
//               <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#0ea5e9', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
//                 {isAbhyaas ? 'International School' : 'School Management'}
//               </div>
//             </div>
//           </div>

//           <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//             <button className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
//             <button className="nav-link" onClick={() => setActiveModal('programs')}>Programs</button>
//             <button className="nav-link" onClick={() => setActiveModal('why')}>Why?</button>
//             <button className="nav-link" onClick={() => setActiveModal('selections')}>Selections</button>
//             <button className="nav-link" onClick={() => setActiveModal('contact')}>Contact us</button>
            
//             <button className="nav-outline" style={{ marginLeft: 16 }} onClick={() => navigate(selectedSchool ? `/school/${selectedSchool._id}/register` : '#')}>Register</button>
//             <button className="nav-primary" style={{ marginLeft: 4 }} onClick={() => setActiveModal('login')}>Login</button>
//           </div>
//         </nav>

//         {/* ── MAIN CONTENT ── */}
//         <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '86px 2rem 4rem' }}>
//           <div style={{ width: '100%', maxWidth: 700, textAlign: 'center' }}>

//             {!selectedSchool && (
//               <div style={{ marginBottom: '2.5rem' }}>
//                 <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, color: '#1e3a8a', lineHeight: 1.15, marginBottom: '1rem' }}>
//                   Welcome to{' '}
//                   <span style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
//                     EduManager
//                   </span>
//                 </h1>
//                 <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: 450, margin: '0 auto', lineHeight: 1.65 }}>
//                   A modern school management platform. Select your school below to continue.
//                 </p>
//               </div>
//             )}

//             {isAbhyaas && (
//               <div style={{ marginBottom: '1.5rem', animation: 'fadeIn .5s ease' }}>
//                 <p style={{ color: '#0ea5e9', fontWeight: 700, fontStyle: 'italic', fontSize: '1.25rem', fontFamily: 'Playfair Display, serif' }}>"The Future Begins Here"</p>
//               </div>
//             )}

//             {/* School selector */}
//             <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 10px 40px rgba(37,99,235,.09),0 2px 8px rgba(0,0,0,.05)', border: '1px solid rgba(37,99,235,.10)', padding: '2.2rem', maxWidth: 460, margin: '0 auto' }}>
//               <label style={lbl}>Select Your School</label>
//               <select className="school-select" onChange={handleSchoolChange} value={selectedSchool?._id || ''}>
//                 <option value="" disabled>Choose your institution…</option>
//                 {schools.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
//               </select>

//               {selectedSchool && (
//                 <div style={{ marginTop: '1.2rem', padding: '13px 15px', background: 'linear-gradient(135deg,#f0f9ff,#eff6ff)', borderRadius: 13, border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', gap: 12 }}>
//                   <div style={{ width: 42, height: 42, borderRadius: 10, background: 'linear-gradient(135deg,#0ea5e9,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1rem', flexShrink: 0 }}>
//                     {selectedSchool.name?.[0]}
//                   </div>
//                   <div style={{ textAlign: 'left' }}>
//                     <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '0.93rem' }}>{selectedSchool.name}</div>
//                     <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: 2 }}>Use the navbar above to navigate</div>
//                   </div>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* ═══════════ MODALS ═══════════ */}

//       {/* PROGRAMS (K-10 Classes) */}
//       {activeModal === 'programs' && (
//         <Modal sizeClass="extra-wide" onClose={closeModal}>
//           <div style={{ marginBottom: '2.5rem' }}>
//             <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>
//               Academic Stages at
//             </div>
//             <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111827', marginBottom: '1rem', fontFamily: 'Nunito, sans-serif', letterSpacing: '-0.02em' }}>
//               Our School
//             </h2>
//             <p style={{ color: '#6b7280', lineHeight: 1.6, fontSize: '1.05rem', maxWidth: '750px' }}>
//               We provide a structured, holistic learning environment from early childhood through high school. 
//               Our curriculum is designed to build strong fundamentals, encourage curiosity, and prepare students 
//               for future board examinations and beyond.
//             </p>
//           </div>

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
//             {PROGRAMS.map((program) => (
//               <div key={program.id} className="program-card">
//                 <div className="program-icon-wrapper" style={{ color: program.color }}>
//                   {program.icon}
//                 </div>
//                 <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
//                   {program.name}
//                 </h3>
//                 <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>
//                   {program.desc}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Modal>
//       )}

//       {/* WHY? (School focused) */}
//       {activeModal === 'why' && (
//         <Modal title="Why Choose Us?" subtitle="What sets our school apart" onClose={closeModal} sizeClass="wide">
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
//             {[
//               { icon: '👩‍🏫', title: 'Caring Educators', desc: 'Passionate teachers dedicated to nurturing your child’s emotional and academic growth.' },
//               { icon: '📚', title: 'Strong Foundations', desc: 'Focus on core concepts in Math, Science, and Languages to ensure long-term success.' },
//               { icon: '🎨', title: 'Holistic Development', desc: 'Equal emphasis on sports, arts, and extracurricular activities alongside academics.' },
//               { icon: '🛡️', title: 'Safe Environment', desc: 'A secure, modern campus equipped with smart classrooms and dedicated play areas.' },
//             ].map(({ icon, title, desc }) => (
//               <div key={title} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0', transition: 'all 0.2s ease', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#bae6fd'} onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
//                 <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>{icon}</div>
//                 <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem', marginBottom: 6 }}>{title}</div>
//                 <div style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
//               </div>
//             ))}
//           </div>
//         </Modal>
//       )}

//       {/* SELECTIONS / ACHIEVEMENTS (Up to 10th Class) */}
//       {activeModal === 'selections' && (
//         <Modal title="Our Achievements" subtitle="Milestones we are proud of" onClose={closeModal} sizeClass="wide">
//           <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
//             Our students consistently excel in state board examinations, national Olympiads, and athletic competitions. These numbers reflect our commitment to academic excellence and well-rounded student development up to the 10th grade.
//           </p>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', textAlign: 'center' }}>
//             {ACHIEVEMENTS.map(p => (
//               <div key={p.id} style={{ padding: '1.5rem 1rem', background: 'linear-gradient(135deg, #ffffff, #f8fafc)', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
//                 <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{p.icon}</div>
//                 <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0ea5e9', lineHeight: 1 }}>{p.count}</div>
//                 <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '0.05em' }}>{p.name}</div>
//               </div>
//             ))}
//           </div>
//         </Modal>
//       )}

//       {/* CONTACT */}
//       {activeModal === 'contact' && (
//         <Modal title="Get in Touch" subtitle="We are here to assist you with any inquiries" onClose={closeModal}>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//             {[
//               { icon: '📍', bg: '#fef3c7', label: 'Visit Us',  value: '123 Education Lane, Knowledge City' },
//               { icon: '📞', bg: '#dcfce7', label: 'Call Us',   value: '+91 98765 43210' },
//               { icon: '✉️', bg: '#eff6ff', label: 'Email Us',  value: 'admissions@edu.in' },
//             ].map(({ icon, bg, label, value }) => (
//               <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 15, background: '#f8fafc', borderRadius: 13, border: '1px solid #e2e8f0' }}>
//                 <div style={{ width: 44, height: 44, borderRadius: 11, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{icon}</div>
//                 <div>
//                   <div style={{ fontSize: '0.71rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
//                   <div style={{ fontWeight: 700, color: '#1e293b', marginTop: 2 }}>{value}</div>
//                 </div>
//               </div>
//             ))}
//             <div style={{ padding: '13px 15px', background: '#f0fdf4', borderRadius: 13, border: '1px solid #bbf7d0', textAlign: 'center' }}>
//               <span style={{ fontSize: '0.86rem', color: '#166534', fontWeight: 700 }}>Office Hours: Monday – Saturday, 8:00 AM – 4:00 PM</span>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* LOGIN */}
//       {activeModal === 'login' && (
//         <Modal title="Sign In" subtitle={selectedSchool ? selectedSchool.name : "EduManager"} onClose={closeModal}>
//           {!selectedSchool ? (
//             <div style={{ textAlign: 'center', color: '#64748b', padding: '1rem 0' }}>
//               Please select a school from the main page first.
//             </div>
//           ) : (
//             <>
//               {loginError && (
//                 <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: 10, fontSize: '0.87rem', marginBottom: '1rem' }}>
//                   {loginError}
//                 </div>
//               )}
//               <form onSubmit={handleLogin}>
//                 <div style={{ marginBottom: '1.1rem' }}>
//                   <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="you@school.edu"
//                     required
//                     className="form-input"
//                     value={loginEmail}
//                     onChange={e => setLoginEmail(e.target.value)}
//                     autoComplete="email"
//                   />
//                 </div>
//                 <div style={{ marginBottom: '1.1rem' }}>
//                   <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     placeholder="••••••••"
//                     required
//                     className="form-input"
//                     value={loginPassword}
//                     onChange={e => setLoginPassword(e.target.value)}
//                     autoComplete="current-password"
//                   />
//                 </div>
//                 <button type="submit" className="submit-btn" disabled={loginLoading}>
//                   {loginLoading ? 'Signing in…' : 'Sign In'}
//                 </button>
//               </form>
//               <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.84rem', color: '#94a3b8' }}>
//                 Don't have an account?{' '}
//                 <button
//                   onClick={() => { closeModal(); navigate(`/school/${selectedSchool._id}/register`); }}
//                   style={{ background: 'none', border: 'none', color: '#0ea5e9', fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito,sans-serif', fontSize: '0.84rem' }}
//                 >
//                   Register here
//                 </button>
//               </p>
//             </>
//           )}
//         </Modal>
//       )}
//     </>
//   );
// }








import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials, setSchoolId } from '../store/authSlice';

// ─── Fallback schools (from seed.js) ──────────────────────────────────────
const FALLBACK_SCHOOLS = [
  { _id: 'abhyaas', name: 'Abhyas International School', address: 'Rajam', email: 'contact@abhyas.edu' },
  { _id: 'dav',     name: 'DAV School',                  address: 'Rajam', email: 'info@davrajam.edu' },
  { _id: 'sun',     name: 'Sun School',                  address: 'Rajam', email: 'admin@sunschool.edu' },
];

const NOTICES = [
  { type: 'Important', color: '#f85149', bg: 'rgba(248,81,73,0.1)', title: 'Mid-Term Exams',    body: 'Examinations begin January 10th. Please collect admit cards from the office.' },
  { type: 'General',   color: '#58a6ff', bg: 'rgba(88,166,255,0.1)', title: 'Winter Break',      body: 'School closed from Dec 24th to Jan 5th. Happy Holidays to all students and staff!' },
  { type: 'Event',     color: '#3fb950', bg: 'rgba(63,185,80,0.1)', title: 'Annual Sports Day', body: 'Join us on February 15th for the Annual Sports Meet. Registration open for all students.' },
  { type: 'Deadline',  color: '#d29922', bg: 'rgba(210,153,34,0.1)', title: 'Fee Submission',    body: 'Last date for the 2nd Term Fee submission is Jan 30th. Please pay to avoid late fees.' },
];

// ─── Up to 10th Class Data ────────────────────────────────────────────────
const PROGRAMS = [
  { id: 'pre-primary', name: 'Pre-Primary', desc: 'Nursery - UKG', icon: '🎨', color: '#d29922' },
  { id: 'primary', name: 'Primary School', desc: 'Classes I - V', icon: '🎒', color: '#3fb950' },
  { id: 'middle', name: 'Middle School', desc: 'Classes VI - VIII', icon: '🔬', color: '#58a6ff' },
  { id: 'high', name: 'High School', desc: 'Classes IX - X', icon: '🎓', color: '#bc8cff' },
];

const ACHIEVEMENTS = [
  { id: 'gpa', name: '10/10 GPA (Board)', count: '150+', icon: '🌟', color: '#d29922' },
  { id: 'olympiad', name: 'Olympiad Medals', count: '85', icon: '🏅', color: '#3fb950' },
  { id: 'sports', name: 'State Level Sports', count: '40+', icon: '🏆', color: '#58a6ff' },
  { id: 'ntse', name: 'NTSE Scholars', count: '24', icon: '💡', color: '#bc8cff' },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@400;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #0d1117; color: #e6edf3; }

  @keyframes fadeIn  { from { opacity: 0; }                                          to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(22px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

  .nav-link {
    background: none; border: none; cursor: pointer; padding: 8px 14px;
    border-radius: 8px; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; font-weight: 600; color: #8b949e;
    transition: background .18s, color .18s;
  }
  .nav-link:hover { background: #1c2128; color: rgb(94, 209, 215); }

  .nav-primary {
    padding: 9px 22px; background: linear-gradient(135deg, rgb(94, 209, 215) 0%, rgb(59, 184, 192) 100%);
    color: #0d1117; border: none; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.9rem;
    cursor: pointer; transition: transform .18s, box-shadow .18s;
  }
  .nav-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(94, 209, 215, 0.35); }

  .nav-outline {
    padding: 7px 20px; background: transparent; color: rgb(94, 209, 215);
    border: 2px solid rgb(94, 209, 215); border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.9rem;
    cursor: pointer; transition: background .18s;
  }
  .nav-outline:hover { background: rgba(94, 209, 215, 0.1); }

  .modal-overlay {
    position: fixed; inset: 0; background: rgba(13,17,23,.75);
    backdrop-filter: blur(7px); z-index: 300;
    display: flex; align-items: center; justify-content: center;
    padding: 1rem; animation: fadeIn .2s ease;
  }
  .modal-box {
    background: #161b22; border: 1px solid #30363d; border-radius: 22px;
    box-shadow: 0 24px 60px rgba(0,0,0,.5);
    width: 100%; max-width: 500px; max-height: 90vh;
    overflow-y: auto; animation: slideUp .28s cubic-bezier(.34,1.56,.64,1);
  }
  .modal-box.wide { max-width: 650px; }
  .modal-box.extra-wide { max-width: 850px; }

  .close-btn {
    background: #1c2128; border: 1px solid #30363d; width: 34px; height: 34px; 
    border-radius: 50%; cursor: pointer; font-size: 1rem; color: #8b949e; 
    transition: all 0.2s ease; display: flex; align-items: center; justify-content: center;
  }
  .close-btn:hover { background: #30363d; color: #e6edf3; }

  .form-input {
    width: 100%; padding: 12px 15px;
    border: 1px solid #30363d !important; border-radius: 11px;
    font-family: 'DM Sans', sans-serif; font-size: 1rem;
    color: #e6edf3 !important; 
    background-color: #0d1117 !important; 
    outline: none;
    transition: border-color .18s, box-shadow .18s;
  }
  .form-input:focus { 
    border-color: rgb(94, 209, 215) !important; 
    background-color: #0d1117 !important; 
    box-shadow: 0 0 0 3px rgba(94, 209, 215, 0.15) !important; 
  }
  .form-input::placeholder { color: #484f58; }

  /* 👇 THIS IS THE FIX FOR INVISIBLE AUTOFILL TEXT 👇 */
  .form-input:-webkit-autofill,
  .form-input:-webkit-autofill:hover, 
  .form-input:-webkit-autofill:focus, 
  .form-input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px #0d1117 inset !important;
      -webkit-text-fill-color: #ffffff !important;
      transition: background-color 5000s ease-in-out 0s;
  }

  .submit-btn {
    width: 100%; padding: 13px;
    background: linear-gradient(135deg, rgb(94, 209, 215) 0%, rgb(59, 184, 192) 100%);
    color: #0d1117; border: none; border-radius: 11px;
    font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 1rem;
    cursor: pointer; transition: transform .18s, box-shadow .18s;
  }
  .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(94, 209, 215, 0.35); }
  .submit-btn:disabled { opacity: .65; cursor: not-allowed; transform: none !important; }

  .school-select {
    width: 100%; padding: 13px 40px 13px 15px;
    border: 1px solid #30363d; border-radius: 11px;
    font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600;
    color: #e6edf3; background: #0d1117; cursor: pointer;
    appearance: none; outline: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgb(94, 209, 215)' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center;
    transition: border-color .18s, box-shadow .18s;
  }
  .school-select:focus { border-color: rgb(94, 209, 215); box-shadow: 0 0 0 3px rgba(94, 209, 215, 0.15); }
  .school-select option { background: #161b22; color: #e6edf3; }

  .program-card {
    background: #161b22; border: 1px solid #30363d; border-radius: 16px;
    padding: 2rem 1rem; text-align: center; transition: all 0.2s ease;
    cursor: pointer; display: flex; flex-direction: column; align-items: center;
  }
  .program-card:hover {
    box-shadow: 0 12px 30px rgba(0,0,0,0.4); transform: translateY(-4px);
    border-color: #8b949e;
  }
  .program-icon-wrapper {
    width: 90px; height: 90px; border-radius: 50%;
    margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center;
    font-size: 2.5rem; background: #0d1117; border: 1px solid #30363d;
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #484f58; }
`;

function Modal({ title, subtitle, onClose, children, sizeClass = '' }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-box ${sizeClass}`} onClick={e => e.stopPropagation()}>
        {title && (
          <div style={{ padding: '1.8rem 2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#e6edf3' }}>{title}</h2>
              {subtitle && <p style={{ fontSize: '0.84rem', color: '#8b949e', marginTop: 3 }}>{subtitle}</p>}
            </div>
            <button className="close-btn" onClick={onClose} style={{ marginLeft: 12, flexShrink: 0 }}>✕</button>
          </div>
        )}
        <div style={{ padding: title ? '1.3rem 2rem 2rem' : '2rem' }}>
          {!title && (
             <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-10px' }}>
                <button className="close-btn" onClick={onClose}>✕</button>
             </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default function MasterLandingPage() {
  const [schools,        setSchools]        = useState(FALLBACK_SCHOOLS);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [activeModal,    setActiveModal]    = useState(null);
  const [loginId,        setLoginId]        = useState('');
  const [loginPassword,  setLoginPassword]  = useState('');
  const [loginError,     setLoginError]     = useState('');
  const [loginLoading,   setLoginLoading]   = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAbhyaas = selectedSchool?.name?.toLowerCase().includes('abhya');

  useEffect(() => {
    fetch('http://localhost:5000/api/schools')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        const list = Array.isArray(data) ? data : data.data;
        if (list && list.length > 0) {
          setSchools(list);
          const savedId = sessionStorage.getItem('selectedSchoolId');
          if (savedId) {
            const found = list.find(s => s._id === savedId);
            if (found) { setSelectedSchool(found); dispatch(setSchoolId(found._id)); }
          }
        } else {
          restoreFromSession(FALLBACK_SCHOOLS);
        }
      })
      .catch(() => {
        restoreFromSession(FALLBACK_SCHOOLS);
      });
  }, [dispatch]);

  function restoreFromSession(schoolList) {
    const savedId = sessionStorage.getItem('selectedSchoolId');
    if (savedId) {
      const found = schoolList.find(s => s._id === savedId);
      if (found) { setSelectedSchool(found); dispatch(setSchoolId(found._id)); }
    }
  }

  const handleSchoolChange = (e) => {
    const school = schools.find(s => s._id === e.target.value) || null;
    setSelectedSchool(school);
    dispatch(setSchoolId(school?._id || null));
    if (school) sessionStorage.setItem('selectedSchoolId', school._id);
    else sessionStorage.removeItem('selectedSchoolId');
    setActiveModal(null);
  };

  const closeModal = useCallback(() => setActiveModal(null), []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res  = await fetch('http://localhost:5000/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ loginId: loginId, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      
      // Store credentials
      dispatch(setCredentials({ user: data.user, token: data.token }));
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect based on role
      const role = data.user.role.toLowerCase();
      navigate(`/dashboard/${role}`);
      
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const lbl = { display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 };

  return (
    <>
      <style>{CSS}</style>

      <div style={{ minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', position: 'relative', background: '#0d1117' }}>

        {/* ── CLEAN DECENT BACKGROUND ── */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0,
          background: '#0d1117' // Base dark background
        }} />

        {/* Subtle Ambient Glow */}
        <div style={{
          position: 'fixed', top: '-20%', left: '-10%', width: '50%', height: '50%',
          background: 'radial-gradient(circle, rgba(94, 209, 215, 0.05) 0%, transparent 70%)',
          zIndex: 0, pointerEvents: 'none'
        }} />

        {/* ── NAVBAR ── */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: 'rgba(22, 27, 34, 0.85)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #30363d',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          height: 66, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Added Abhyaas Logo Back Here */}
            {isAbhyaas ? (
               <img src="/abhyaas-logo.jpeg" alt="Abhyaas" style={{ height: 42, width: 42, objectFit: 'contain', borderRadius: 8, border: '1px solid #30363d' }} onError={e => { e.target.style.display = 'none'; }} />
            ) : (
               <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, rgb(94, 209, 215) 0%, rgb(59, 184, 192) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d1117', fontWeight: 900, fontSize: '1.05rem' }}>E</div>
            )}
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#ffffff', lineHeight: 1.1 }}>
                {isAbhyaas ? 'Abhyaas' : 'EduManager'}
              </div>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgb(94, 209, 215)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {isAbhyaas ? 'International School' : 'School Management'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
            <button className="nav-link" onClick={() => setActiveModal('programs')}>Programs</button>
            <button className="nav-link" onClick={() => setActiveModal('why')}>Why?</button>
            <button className="nav-link" onClick={() => setActiveModal('selections')}>Selections</button>
            <button className="nav-link" onClick={() => setActiveModal('contact')}>Contact us</button>
            
            <button className="nav-outline" style={{ marginLeft: 16 }} onClick={() => navigate(selectedSchool ? `/school/${selectedSchool._id}/register` : '#')}>Register</button>
            <button className="nav-primary" style={{ marginLeft: 4 }} onClick={() => setActiveModal('login')}>Login</button>
          </div>
        </nav>

        {/* ── MAIN CONTENT ── */}
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '86px 2rem 4rem' }}>
          <div style={{ width: '100%', maxWidth: 700, textAlign: 'center' }}>

            {!selectedSchool && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                  Welcome to{' '}
                  <span style={{ background: 'linear-gradient(135deg, rgb(94, 209, 215) 0%, rgb(59, 184, 192) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    EduManager
                  </span>
                </h1>
                <p style={{ fontSize: '1.05rem', color: '#8b949e', maxWidth: 450, margin: '0 auto', lineHeight: 1.65 }}>
                  A modern school management platform. Sign in to your institution to continue.
                </p>
              </div>
            )}

            {isAbhyaas && (
              <div style={{ marginBottom: '1.5rem', animation: 'fadeIn .5s ease' }}>
                <p style={{ color: 'rgb(94, 209, 215)', fontWeight: 700, fontStyle: 'italic', fontSize: '1.25rem', fontFamily: 'Syne, sans-serif' }}>"The Future Begins Here"</p>
              </div>
            )}

            {/* Removed School Selector for Multi-Tenant Login ID Architecture */}

          </div>
        </div>
      </div>

      {/* ═══════════ MODALS ═══════════ */}

      {/* PROGRAMS (K-10 Classes) */}
      {activeModal === 'programs' && (
        <Modal sizeClass="extra-wide" onClose={closeModal}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ color: 'rgb(94, 209, 215)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Stages at
            </div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#e6edf3', marginBottom: '1rem', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
              Our School
            </h2>
            <p style={{ color: '#8b949e', lineHeight: 1.6, fontSize: '1.05rem', maxWidth: '750px' }}>
              We provide a structured, holistic learning environment from early childhood through high school. 
              Our curriculum is designed to build strong fundamentals, encourage curiosity, and prepare students 
              for future board examinations and beyond.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {PROGRAMS.map((program) => (
              <div key={program.id} className="program-card">
                <div className="program-icon-wrapper" style={{ color: program.color, borderColor: `${program.color}40`, background: `${program.color}10` }}>
                  {program.icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e6edf3', marginBottom: '0.5rem' }}>
                  {program.name}
                </h3>
                <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#8b949e', lineHeight: 1 }}>
                  {program.desc}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* WHY? (School focused) */}
      {activeModal === 'why' && (
        <Modal title="Why Choose Us?" subtitle="What sets our school apart" onClose={closeModal} sizeClass="wide">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {[
              { icon: '👩‍🏫', title: 'Caring Educators', desc: 'Passionate teachers dedicated to nurturing your child’s emotional and academic growth.' },
              { icon: '📚', title: 'Strong Foundations', desc: 'Focus on core concepts in Math, Science, and Languages to ensure long-term success.' },
              { icon: '🎨', title: 'Holistic Development', desc: 'Equal emphasis on sports, arts, and extracurricular activities alongside academics.' },
              { icon: '🛡️', title: 'Safe Environment', desc: 'A secure, modern campus equipped with smart classrooms and dedicated play areas.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ padding: 20, background: '#0d1117', borderRadius: 16, border: '1px solid #30363d', transition: 'all 0.2s ease', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgb(94, 209, 215)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#30363d'}>
                <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: '#e6edf3', fontSize: '1.05rem', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: '0.88rem', color: '#8b949e', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* SELECTIONS / ACHIEVEMENTS (Up to 10th Class) */}
      {activeModal === 'selections' && (
        <Modal title="Our Achievements" subtitle="Milestones we are proud of" onClose={closeModal} sizeClass="wide">
          <p style={{ color: '#8b949e', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Our students consistently excel in state board examinations, national Olympiads, and athletic competitions. These numbers reflect our commitment to academic excellence and well-rounded student development up to the 10th grade.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', textAlign: 'center' }}>
            {ACHIEVEMENTS.map(p => (
              <div key={p.id} style={{ padding: '1.5rem 1rem', background: '#0d1117', borderRadius: '16px', border: '1px solid #30363d', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{p.icon}</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 700, color: p.color, lineHeight: 1, fontFamily: 'Syne, sans-serif' }}>{p.count}</div>
                <div style={{ fontSize: '0.75rem', color: '#8b949e', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '0.05em' }}>{p.name}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* CONTACT */}
      {activeModal === 'contact' && (
        <Modal title="Get in Touch" subtitle="We are here to assist you with any inquiries" onClose={closeModal}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '📍', bg: 'rgba(210,153,34,0.1)', color: '#d29922', label: 'Visit Us',  value: '123 Education Lane, Knowledge City' },
              { icon: '📞', bg: 'rgba(63,185,80,0.1)', color: '#3fb950', label: 'Call Us',   value: '+91 98765 43210' },
              { icon: '✉️', bg: 'rgba(88,166,255,0.1)', color: '#58a6ff', label: 'Email Us',  value: 'admissions@edu.in' },
            ].map(({ icon, bg, color, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 15, background: '#0d1117', borderRadius: 13, border: '1px solid #30363d' }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: '0.71rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
                  <div style={{ fontWeight: 500, color: '#e6edf3', marginTop: 2 }}>{value}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: '13px 15px', background: 'rgba(94, 209, 215, 0.1)', borderRadius: 13, border: '1px solid rgba(94, 209, 215, 0.3)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.86rem', color: 'rgb(94, 209, 215)', fontWeight: 600 }}>Office Hours: Monday – Saturday, 8:00 AM – 4:00 PM</span>
            </div>
          </div>
        </Modal>
      )}

      {/* LOGIN */}
      {activeModal === 'login' && (
        <Modal title="Sign In" subtitle={selectedSchool ? selectedSchool.name : "EduManager"} onClose={closeModal}>
          <>
              {loginError && (
                <div style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)', color: '#f85149', padding: '10px 14px', borderRadius: 10, fontSize: '0.87rem', marginBottom: '1rem' }}>
                  {loginError}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1.1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Login ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AB-STD-101"
                    required
                    className="form-input"
                    value={loginId}
                    onChange={e => setLoginId(e.target.value)}
                    autoComplete="username"
                  />
                </div>
                <div style={{ marginBottom: '1.1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    className="form-input"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>
                <button type="submit" className="submit-btn" disabled={loginLoading}>
                  {loginLoading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>
              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.84rem', color: '#8b949e' }}>
                Don't have an account?{' '}
                <button
                  onClick={() => { closeModal(); navigate(`/school/${selectedSchool._id}/register`); }}
                  style={{ background: 'none', border: 'none', color: 'rgb(94, 209, 215)', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem' }}
                >
                  Register here
                </button>
              </p>
            </>
        </Modal>
      )}
    </>
  );
}