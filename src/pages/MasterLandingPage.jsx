

// // import { useState, useEffect, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useDispatch } from 'react-redux';
// // import { setCredentials, setSchoolId } from '../store/authSlice';

// // // ─── Fallback schools (from seed.js) ──────────────────────────────────────
// // const FALLBACK_SCHOOLS = [
// //   { _id: 'abhyaas', name: 'Abhyas International School', address: 'Rajam', email: 'contact@abhyas.edu' },
// //   { _id: 'dav',     name: 'DAV School',                  address: 'Rajam', email: 'info@davrajam.edu' },
// //   { _id: 'sun',     name: 'Sun School',                  address: 'Rajam', email: 'admin@sunschool.edu' },
// // ];

// // const NOTICES = [
// //   { type: 'Important', color: '#ef4444', bg: '#fef2f2', title: 'Mid-Term Exams',    body: 'Examinations begin January 10th. Please collect admit cards from the office.' },
// //   { type: 'General',   color: '#3b82f6', bg: '#eff6ff', title: 'Winter Break',      body: 'School closed from Dec 24th to Jan 5th. Happy Holidays to all students and staff!' },
// //   { type: 'Event',     color: '#22c55e', bg: '#f0fdf4', title: 'Annual Sports Day', body: 'Join us on February 15th for the Annual Sports Meet. Registration open for all students.' },
// //   { type: 'Deadline',  color: '#f97316', bg: '#fff7ed', title: 'Fee Submission',    body: 'Last date for the 2nd Term Fee submission is Jan 30th. Please pay to avoid late fees.' },
// // ];

// // // ─── Up to 10th Class Data ────────────────────────────────────────────────
// // const PROGRAMS = [
// //   { id: 'pre-primary', name: 'Pre-Primary', desc: 'Nursery - UKG', icon: '🎨', color: '#f59e0b' },
// //   { id: 'primary', name: 'Primary School', desc: 'Classes I - V', icon: '🎒', color: '#10b981' },
// //   { id: 'middle', name: 'Middle School', desc: 'Classes VI - VIII', icon: '🔬', color: '#3b82f6' },
// //   { id: 'high', name: 'High School', desc: 'Classes IX - X', icon: '🎓', color: '#8b5cf6' },
// // ];

// // const ACHIEVEMENTS = [
// //   { id: 'gpa', name: '10/10 GPA (Board)', count: '150+', icon: '🌟', color: '#f59e0b' },
// //   { id: 'olympiad', name: 'Olympiad Medals', count: '85', icon: '🏅', color: '#10b981' },
// //   { id: 'sports', name: 'State Level Sports', count: '40+', icon: '🏆', color: '#3b82f6' },
// //   { id: 'ntse', name: 'NTSE Scholars', count: '24', icon: '💡', color: '#8b5cf6' },
// // ];

// // const CSS = `
// //   @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
// //   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
// //   body { font-family: 'Nunito', sans-serif; }

// //   @keyframes fadeIn  { from { opacity: 0; }                                           to { opacity: 1; } }
// //   @keyframes slideUp { from { opacity: 0; transform: translateY(22px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

// //   .nav-link {
// //     background: none; border: none; cursor: pointer; padding: 8px 14px;
// //     border-radius: 8px; font-family: 'Nunito', sans-serif;
// //     font-size: 0.9rem; font-weight: 700; color: #475569;
// //     transition: background .18s, color .18s;
// //   }
// //   .nav-link:hover { background: #f0f9ff; color: #0ea5e9; }

// //   .nav-primary {
// //     padding: 9px 22px; background: linear-gradient(135deg,#0ea5e9,#2563eb);
// //     color: white; border: none; border-radius: 10px;
// //     font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.9rem;
// //     cursor: pointer; transition: transform .18s, box-shadow .18s;
// //   }
// //   .nav-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(14,165,233,.35); }

// //   .nav-outline {
// //     padding: 7px 20px; background: white; color: #2563eb;
// //     border: 2px solid #2563eb; border-radius: 10px;
// //     font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.9rem;
// //     cursor: pointer; transition: background .18s;
// //   }
// //   .nav-outline:hover { background: #eff6ff; }

// //   .modal-overlay {
// //     position: fixed; inset: 0; background: rgba(15,23,42,.38);
// //     backdrop-filter: blur(7px); z-index: 300;
// //     display: flex; align-items: center; justify-content: center;
// //     padding: 1rem; animation: fadeIn .2s ease;
// //   }
// //   .modal-box {
// //     background: white; border-radius: 22px;
// //     box-shadow: 0 24px 60px rgba(0,0,0,.13);
// //     width: 100%; max-width: 500px; max-height: 90vh;
// //     overflow-y: auto; animation: slideUp .28s cubic-bezier(.34,1.56,.64,1);
// //   }
// //   .modal-box.wide { max-width: 650px; }
// //   .modal-box.extra-wide { max-width: 850px; }

// //   .form-input {
// //     width: 100%; padding: 12px 15px;
// //     border: 2px solid #e2e8f0; border-radius: 11px;
// //     font-family: 'Nunito', sans-serif; font-size: 1rem;
// //     color: #1e293b; background: #f8fafc; outline: none;
// //     transition: border-color .18s;
// //   }
// //   .form-input:focus { border-color: #0ea5e9; background: white; }

// //   .submit-btn {
// //     width: 100%; padding: 13px;
// //     background: linear-gradient(135deg,#0ea5e9,#2563eb);
// //     color: white; border: none; border-radius: 11px;
// //     font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 1rem;
// //     cursor: pointer; transition: transform .18s, box-shadow .18s;
// //   }
// //   .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(14,165,233,.35); }
// //   .submit-btn:disabled { opacity: .65; cursor: not-allowed; transform: none !important; }

// //   .school-select {
// //     width: 100%; padding: 13px 40px 13px 15px;
// //     border: 2px solid #e2e8f0; border-radius: 11px;
// //     font-family: 'Nunito', sans-serif; font-size: 1rem; font-weight: 600;
// //     color: #1e293b; background: #f8fafc; cursor: pointer;
// //     appearance: none; outline: none;
// //     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230ea5e9' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
// //     background-repeat: no-repeat; background-position: right 14px center;
// //     transition: border-color .18s;
// //   }
// //   .school-select:focus { border-color: #0ea5e9; }

// //   .program-card {
// //     background: white; border: 1px solid #e2e8f0; border-radius: 16px;
// //     padding: 2rem 1rem; text-align: center; transition: all 0.2s ease;
// //     cursor: pointer; display: flex; flex-direction: column; align-items: center;
// //   }
// //   .program-card:hover {
// //     box-shadow: 0 12px 30px rgba(0,0,0,0.06); transform: translateY(-4px);
// //     border-color: #cbd5e1;
// //   }
// //   .program-icon-wrapper {
// //     width: 90px; height: 90px; border-radius: 50%;
// //     margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center;
// //     font-size: 2.5rem; background: #f8fafc; border: 2px solid #e2e8f0;
// //   }
// // `;

// // function Modal({ title, subtitle, onClose, children, sizeClass = '' }) {
// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className={`modal-box ${sizeClass}`} onClick={e => e.stopPropagation()}>
// //         {title && (
// //           <div style={{ padding: '1.8rem 2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// //             <div>
// //               <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>{title}</h2>
// //               {subtitle && <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: 3 }}>{subtitle}</p>}
// //             </div>
// //             <button
// //               onClick={onClose}
// //               style={{ background: '#f1f5f9', border: 'none', width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', color: '#64748b', marginLeft: 12, flexShrink: 0 }}
// //             >✕</button>
// //           </div>
// //         )}
// //         <div style={{ padding: title ? '1.3rem 2rem 2rem' : '2rem' }}>
// //           {!title && (
// //              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-10px' }}>
// //                 <button
// //                   onClick={onClose}
// //                   style={{ background: '#f1f5f9', border: 'none', width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', color: '#64748b' }}
// //                 >✕</button>
// //              </div>
// //           )}
// //           {children}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function MasterLandingPage() {
// //   const [schools,        setSchools]        = useState(FALLBACK_SCHOOLS);
// //   const [selectedSchool, setSelectedSchool] = useState(null);
// //   const [activeModal,    setActiveModal]    = useState(null);
// //   const [loginEmail,     setLoginEmail]     = useState('');
// //   const [loginPassword,  setLoginPassword]  = useState('');
// //   const [loginError,     setLoginError]     = useState('');
// //   const [loginLoading,   setLoginLoading]   = useState(false);

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const isAbhyaas = selectedSchool?.name?.toLowerCase().includes('abhya');

// //   useEffect(() => {
// //     fetch('http://localhost:5000/api/schools')
// //       .then(r => r.ok ? r.json() : null)
// //       .then(data => {
// //         if (!data) return;
// //         const list = Array.isArray(data) ? data : data.data;
// //         if (list && list.length > 0) {
// //           setSchools(list);
// //           const savedId = sessionStorage.getItem('selectedSchoolId');
// //           if (savedId) {
// //             const found = list.find(s => s._id === savedId);
// //             if (found) { setSelectedSchool(found); dispatch(setSchoolId(found._id)); }
// //           }
// //         } else {
// //           restoreFromSession(FALLBACK_SCHOOLS);
// //         }
// //       })
// //       .catch(() => {
// //         restoreFromSession(FALLBACK_SCHOOLS);
// //       });
// //   }, [dispatch]);

// //   function restoreFromSession(schoolList) {
// //     const savedId = sessionStorage.getItem('selectedSchoolId');
// //     if (savedId) {
// //       const found = schoolList.find(s => s._id === savedId);
// //       if (found) { setSelectedSchool(found); dispatch(setSchoolId(found._id)); }
// //     }
// //   }

// //   const handleSchoolChange = (e) => {
// //     const school = schools.find(s => s._id === e.target.value) || null;
// //     setSelectedSchool(school);
// //     dispatch(setSchoolId(school?._id || null));
// //     if (school) sessionStorage.setItem('selectedSchoolId', school._id);
// //     else sessionStorage.removeItem('selectedSchoolId');
// //     setActiveModal(null);
// //   };

// //   const closeModal = useCallback(() => setActiveModal(null), []);

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setLoginError('');
// //     setLoginLoading(true);
// //     try {
// //       const res  = await fetch('http://localhost:5000/api/auth/login', {
// //         method:  'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body:    JSON.stringify({ email: loginEmail, password: loginPassword, school_id: selectedSchool?._id }),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || 'Login failed');
// //       dispatch(setCredentials({ user: data.user, token: data.token }));
// //       localStorage.setItem('token', data.token);
// //       localStorage.setItem('user', JSON.stringify(data.user));
// //       sessionStorage.removeItem('selectedSchoolId'); 
// //       navigate(`/dashboard/${data.user.role.toLowerCase()}`);
// //     } catch (err) {
// //       setLoginError(err.message);
// //     } finally {
// //       setLoginLoading(false);
// //     }
// //   };

// //   const lbl = { display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 };

// //   return (
// //     <>
// //       <style>{CSS}</style>

// //       <div style={{ minHeight: '100vh', fontFamily: 'Nunito,sans-serif', position: 'relative' }}>

// //         {/* ── CLEAN DECENT BACKGROUND ── */}
// //         <div style={{
// //           position: 'fixed', inset: 0, zIndex: 0,
// //           background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f0fdf4 100%)'
// //         }} />

// //         {/* ── NAVBAR ── */}
// //         <nav style={{
// //           position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
// //           background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(16px)',
// //           borderBottom: '1px solid #e2e8f0',
// //           boxShadow: '0 2px 14px rgba(37,99,235,.07)',
// //           height: 66, display: 'flex', alignItems: 'center',
// //           justifyContent: 'space-between', padding: '0 2rem',
// //         }}>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
// //             {/* Added Abhyaas Logo Back Here */}
// //             {isAbhyaas ? (
// //                <img src="/abhyaas-logo.jpeg" alt="Abhyaas" style={{ height: 42, width: 42, objectFit: 'contain', borderRadius: 8 }} onError={e => { e.target.style.display = 'none'; }} />
// //             ) : (
// //                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#0ea5e9,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1.05rem' }}>E</div>
// //             )}
// //             <div>
// //               <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 800, fontSize: '1.1rem', color: '#1e3a8a', lineHeight: 1.1 }}>
// //                 {isAbhyaas ? 'Abhyaas' : 'EduManager'}
// //               </div>
// //               <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#0ea5e9', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
// //                 {isAbhyaas ? 'International School' : 'School Management'}
// //               </div>
// //             </div>
// //           </div>

// //           <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
// //             <button className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
// //             <button className="nav-link" onClick={() => setActiveModal('programs')}>Programs</button>
// //             <button className="nav-link" onClick={() => setActiveModal('why')}>Why?</button>
// //             <button className="nav-link" onClick={() => setActiveModal('selections')}>Selections</button>
// //             <button className="nav-link" onClick={() => setActiveModal('contact')}>Contact us</button>
            
// //             <button className="nav-outline" style={{ marginLeft: 16 }} onClick={() => navigate(selectedSchool ? `/school/${selectedSchool._id}/register` : '#')}>Register</button>
// //             <button className="nav-primary" style={{ marginLeft: 4 }} onClick={() => setActiveModal('login')}>Login</button>
// //           </div>
// //         </nav>

// //         {/* ── MAIN CONTENT ── */}
// //         <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '86px 2rem 4rem' }}>
// //           <div style={{ width: '100%', maxWidth: 700, textAlign: 'center' }}>

// //             {!selectedSchool && (
// //               <div style={{ marginBottom: '2.5rem' }}>
// //                 <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, color: '#1e3a8a', lineHeight: 1.15, marginBottom: '1rem' }}>
// //                   Welcome to{' '}
// //                   <span style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
// //                     EduManager
// //                   </span>
// //                 </h1>
// //                 <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: 450, margin: '0 auto', lineHeight: 1.65 }}>
// //                   A modern school management platform. Select your school below to continue.
// //                 </p>
// //               </div>
// //             )}

// //             {isAbhyaas && (
// //               <div style={{ marginBottom: '1.5rem', animation: 'fadeIn .5s ease' }}>
// //                 <p style={{ color: '#0ea5e9', fontWeight: 700, fontStyle: 'italic', fontSize: '1.25rem', fontFamily: 'Playfair Display, serif' }}>"The Future Begins Here"</p>
// //               </div>
// //             )}

// //             {/* School selector */}
// //             <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 10px 40px rgba(37,99,235,.09),0 2px 8px rgba(0,0,0,.05)', border: '1px solid rgba(37,99,235,.10)', padding: '2.2rem', maxWidth: 460, margin: '0 auto' }}>
// //               <label style={lbl}>Select Your School</label>
// //               <select className="school-select" onChange={handleSchoolChange} value={selectedSchool?._id || ''}>
// //                 <option value="" disabled>Choose your institution…</option>
// //                 {schools.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
// //               </select>

// //               {selectedSchool && (
// //                 <div style={{ marginTop: '1.2rem', padding: '13px 15px', background: 'linear-gradient(135deg,#f0f9ff,#eff6ff)', borderRadius: 13, border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', gap: 12 }}>
// //                   <div style={{ width: 42, height: 42, borderRadius: 10, background: 'linear-gradient(135deg,#0ea5e9,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1rem', flexShrink: 0 }}>
// //                     {selectedSchool.name?.[0]}
// //                   </div>
// //                   <div style={{ textAlign: 'left' }}>
// //                     <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '0.93rem' }}>{selectedSchool.name}</div>
// //                     <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: 2 }}>Use the navbar above to navigate</div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //           </div>
// //         </div>
// //       </div>

// //       {/* ═══════════ MODALS ═══════════ */}

// //       {/* PROGRAMS (K-10 Classes) */}
// //       {activeModal === 'programs' && (
// //         <Modal sizeClass="extra-wide" onClose={closeModal}>
// //           <div style={{ marginBottom: '2.5rem' }}>
// //             <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>
// //               Academic Stages at
// //             </div>
// //             <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111827', marginBottom: '1rem', fontFamily: 'Nunito, sans-serif', letterSpacing: '-0.02em' }}>
// //               Our School
// //             </h2>
// //             <p style={{ color: '#6b7280', lineHeight: 1.6, fontSize: '1.05rem', maxWidth: '750px' }}>
// //               We provide a structured, holistic learning environment from early childhood through high school. 
// //               Our curriculum is designed to build strong fundamentals, encourage curiosity, and prepare students 
// //               for future board examinations and beyond.
// //             </p>
// //           </div>

// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
// //             {PROGRAMS.map((program) => (
// //               <div key={program.id} className="program-card">
// //                 <div className="program-icon-wrapper" style={{ color: program.color }}>
// //                   {program.icon}
// //                 </div>
// //                 <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
// //                   {program.name}
// //                 </h3>
// //                 <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>
// //                   {program.desc}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </Modal>
// //       )}

// //       {/* WHY? (School focused) */}
// //       {activeModal === 'why' && (
// //         <Modal title="Why Choose Us?" subtitle="What sets our school apart" onClose={closeModal} sizeClass="wide">
// //           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
// //             {[
// //               { icon: '👩‍🏫', title: 'Caring Educators', desc: 'Passionate teachers dedicated to nurturing your child’s emotional and academic growth.' },
// //               { icon: '📚', title: 'Strong Foundations', desc: 'Focus on core concepts in Math, Science, and Languages to ensure long-term success.' },
// //               { icon: '🎨', title: 'Holistic Development', desc: 'Equal emphasis on sports, arts, and extracurricular activities alongside academics.' },
// //               { icon: '🛡️', title: 'Safe Environment', desc: 'A secure, modern campus equipped with smart classrooms and dedicated play areas.' },
// //             ].map(({ icon, title, desc }) => (
// //               <div key={title} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0', transition: 'all 0.2s ease', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#bae6fd'} onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
// //                 <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>{icon}</div>
// //                 <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem', marginBottom: 6 }}>{title}</div>
// //                 <div style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
// //               </div>
// //             ))}
// //           </div>
// //         </Modal>
// //       )}

// //       {/* SELECTIONS / ACHIEVEMENTS (Up to 10th Class) */}
// //       {activeModal === 'selections' && (
// //         <Modal title="Our Achievements" subtitle="Milestones we are proud of" onClose={closeModal} sizeClass="wide">
// //           <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
// //             Our students consistently excel in state board examinations, national Olympiads, and athletic competitions. These numbers reflect our commitment to academic excellence and well-rounded student development up to the 10th grade.
// //           </p>
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', textAlign: 'center' }}>
// //             {ACHIEVEMENTS.map(p => (
// //               <div key={p.id} style={{ padding: '1.5rem 1rem', background: 'linear-gradient(135deg, #ffffff, #f8fafc)', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
// //                 <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{p.icon}</div>
// //                 <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0ea5e9', lineHeight: 1 }}>{p.count}</div>
// //                 <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '0.05em' }}>{p.name}</div>
// //               </div>
// //             ))}
// //           </div>
// //         </Modal>
// //       )}

// //       {/* CONTACT */}
// //       {activeModal === 'contact' && (
// //         <Modal title="Get in Touch" subtitle="We are here to assist you with any inquiries" onClose={closeModal}>
// //           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
// //             {[
// //               { icon: '📍', bg: '#fef3c7', label: 'Visit Us',  value: '123 Education Lane, Knowledge City' },
// //               { icon: '📞', bg: '#dcfce7', label: 'Call Us',   value: '+91 98765 43210' },
// //               { icon: '✉️', bg: '#eff6ff', label: 'Email Us',  value: 'admissions@edu.in' },
// //             ].map(({ icon, bg, label, value }) => (
// //               <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 15, background: '#f8fafc', borderRadius: 13, border: '1px solid #e2e8f0' }}>
// //                 <div style={{ width: 44, height: 44, borderRadius: 11, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{icon}</div>
// //                 <div>
// //                   <div style={{ fontSize: '0.71rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
// //                   <div style={{ fontWeight: 700, color: '#1e293b', marginTop: 2 }}>{value}</div>
// //                 </div>
// //               </div>
// //             ))}
// //             <div style={{ padding: '13px 15px', background: '#f0fdf4', borderRadius: 13, border: '1px solid #bbf7d0', textAlign: 'center' }}>
// //               <span style={{ fontSize: '0.86rem', color: '#166534', fontWeight: 700 }}>Office Hours: Monday – Saturday, 8:00 AM – 4:00 PM</span>
// //             </div>
// //           </div>
// //         </Modal>
// //       )}

// //       {/* LOGIN */}
// //       {activeModal === 'login' && (
// //         <Modal title="Sign In" subtitle={selectedSchool ? selectedSchool.name : "EduManager"} onClose={closeModal}>
// //           {!selectedSchool ? (
// //             <div style={{ textAlign: 'center', color: '#64748b', padding: '1rem 0' }}>
// //               Please select a school from the main page first.
// //             </div>
// //           ) : (
// //             <>
// //               {loginError && (
// //                 <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: 10, fontSize: '0.87rem', marginBottom: '1rem' }}>
// //                   {loginError}
// //                 </div>
// //               )}
// //               <form onSubmit={handleLogin}>
// //                 <div style={{ marginBottom: '1.1rem' }}>
// //                   <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
// //                     Email Address
// //                   </label>
// //                   <input
// //                     type="email"
// //                     placeholder="you@school.edu"
// //                     required
// //                     className="form-input"
// //                     value={loginEmail}
// //                     onChange={e => setLoginEmail(e.target.value)}
// //                     autoComplete="email"
// //                   />
// //                 </div>
// //                 <div style={{ marginBottom: '1.1rem' }}>
// //                   <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
// //                     Password
// //                   </label>
// //                   <input
// //                     type="password"
// //                     placeholder="••••••••"
// //                     required
// //                     className="form-input"
// //                     value={loginPassword}
// //                     onChange={e => setLoginPassword(e.target.value)}
// //                     autoComplete="current-password"
// //                   />
// //                 </div>
// //                 <button type="submit" className="submit-btn" disabled={loginLoading}>
// //                   {loginLoading ? 'Signing in…' : 'Sign In'}
// //                 </button>
// //               </form>
// //               <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.84rem', color: '#94a3b8' }}>
// //                 Don't have an account?{' '}
// //                 <button
// //                   onClick={() => { closeModal(); navigate(`/school/${selectedSchool._id}/register`); }}
// //                   style={{ background: 'none', border: 'none', color: '#0ea5e9', fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito,sans-serif', fontSize: '0.84rem' }}
// //                 >
// //                   Register here
// //                 </button>
// //               </p>
// //             </>
// //           )}
// //         </Modal>
// //       )}
// //     </>
// //   );
// // }








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
//   { type: 'Important', color: '#f85149', bg: 'rgba(248,81,73,0.1)', title: 'Mid-Term Exams',    body: 'Examinations begin January 10th. Please collect admit cards from the office.' },
//   { type: 'General',   color: '#58a6ff', bg: 'rgba(88,166,255,0.1)', title: 'Winter Break',      body: 'School closed from Dec 24th to Jan 5th. Happy Holidays to all students and staff!' },
//   { type: 'Event',     color: '#3fb950', bg: 'rgba(63,185,80,0.1)', title: 'Annual Sports Day', body: 'Join us on February 15th for the Annual Sports Meet. Registration open for all students.' },
//   { type: 'Deadline',  color: '#d29922', bg: 'rgba(210,153,34,0.1)', title: 'Fee Submission',    body: 'Last date for the 2nd Term Fee submission is Jan 30th. Please pay to avoid late fees.' },
// ];

// // ─── Up to 10th Class Data ────────────────────────────────────────────────
// const PROGRAMS = [
//   { id: 'pre-primary', name: 'Pre-Primary', desc: 'Nursery - UKG', icon: '🎨', color: '#d29922' },
//   { id: 'primary', name: 'Primary School', desc: 'Classes I - V', icon: '🎒', color: '#3fb950' },
//   { id: 'middle', name: 'Middle School', desc: 'Classes VI - VIII', icon: '🔬', color: '#58a6ff' },
//   { id: 'high', name: 'High School', desc: 'Classes IX - X', icon: '🎓', color: '#bc8cff' },
// ];

// const ACHIEVEMENTS = [
//   { id: 'gpa', name: '10/10 GPA (Board)', count: '150+', icon: '🌟', color: '#d29922' },
//   { id: 'olympiad', name: 'Olympiad Medals', count: '85', icon: '🏅', color: '#3fb950' },
//   { id: 'sports', name: 'State Level Sports', count: '40+', icon: '🏆', color: '#58a6ff' },
//   { id: 'ntse', name: 'NTSE Scholars', count: '24', icon: '💡', color: '#bc8cff' },
// ];

// const CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@400;600;700;800&display=swap');
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   body { font-family: 'DM Sans', sans-serif; background: #0d1117; color: #e6edf3; }

//   @keyframes fadeIn  { from { opacity: 0; }                                          to { opacity: 1; } }
//   @keyframes slideUp { from { opacity: 0; transform: translateY(22px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

//   .nav-link {
//     background: none; border: none; cursor: pointer; padding: 8px 14px;
//     border-radius: 8px; font-family: 'DM Sans', sans-serif;
//     font-size: 0.9rem; font-weight: 600; color: #8b949e;
//     transition: background .18s, color .18s;
//   }
//   .nav-link:hover { background: #1c2128; color: rgb(94, 209, 215); }

//   .nav-primary {
//     padding: 9px 22px; background: linear-gradient(135deg, rgb(94, 209, 215) 0%, rgb(59, 184, 192) 100%);
//     color: #0d1117; border: none; border-radius: 10px;
//     font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.9rem;
//     cursor: pointer; transition: transform .18s, box-shadow .18s;
//   }
//   .nav-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(94, 209, 215, 0.35); }

//   .nav-outline {
//     padding: 7px 20px; background: transparent; color: rgb(94, 209, 215);
//     border: 2px solid rgb(94, 209, 215); border-radius: 10px;
//     font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.9rem;
//     cursor: pointer; transition: background .18s;
//   }
//   .nav-outline:hover { background: rgba(94, 209, 215, 0.1); }

//   .modal-overlay {
//     position: fixed; inset: 0; background: rgba(13,17,23,.75);
//     backdrop-filter: blur(7px); z-index: 300;
//     display: flex; align-items: center; justify-content: center;
//     padding: 1rem; animation: fadeIn .2s ease;
//   }
//   .modal-box {
//     background: #161b22; border: 1px solid #30363d; border-radius: 22px;
//     box-shadow: 0 24px 60px rgba(0,0,0,.5);
//     width: 100%; max-width: 500px; max-height: 90vh;
//     overflow-y: auto; animation: slideUp .28s cubic-bezier(.34,1.56,.64,1);
//   }
//   .modal-box.wide { max-width: 650px; }
//   .modal-box.extra-wide { max-width: 850px; }

//   .close-btn {
//     background: #1c2128; border: 1px solid #30363d; width: 34px; height: 34px; 
//     border-radius: 50%; cursor: pointer; font-size: 1rem; color: #8b949e; 
//     transition: all 0.2s ease; display: flex; align-items: center; justify-content: center;
//   }
//   .close-btn:hover { background: #30363d; color: #e6edf3; }

//   .form-input {
//     width: 100%; padding: 12px 15px;
//     border: 1px solid #30363d !important; border-radius: 11px;
//     font-family: 'DM Sans', sans-serif; font-size: 1rem;
//     color: #e6edf3 !important; 
//     background-color: #0d1117 !important; 
//     outline: none;
//     transition: border-color .18s, box-shadow .18s;
//   }
//   .form-input:focus { 
//     border-color: rgb(94, 209, 215) !important; 
//     background-color: #0d1117 !important; 
//     box-shadow: 0 0 0 3px rgba(94, 209, 215, 0.15) !important; 
//   }
//   .form-input::placeholder { color: #484f58; }

//   /* 👇 THIS IS THE FIX FOR INVISIBLE AUTOFILL TEXT 👇 */
//   .form-input:-webkit-autofill,
//   .form-input:-webkit-autofill:hover, 
//   .form-input:-webkit-autofill:focus, 
//   .form-input:-webkit-autofill:active{
//       -webkit-box-shadow: 0 0 0 30px #0d1117 inset !important;
//       -webkit-text-fill-color: #ffffff !important;
//       transition: background-color 5000s ease-in-out 0s;
//   }

//   .submit-btn {
//     width: 100%; padding: 13px;
//     background: linear-gradient(135deg, rgb(94, 209, 215) 0%, rgb(59, 184, 192) 100%);
//     color: #0d1117; border: none; border-radius: 11px;
//     font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 1rem;
//     cursor: pointer; transition: transform .18s, box-shadow .18s;
//   }
//   .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(94, 209, 215, 0.35); }
//   .submit-btn:disabled { opacity: .65; cursor: not-allowed; transform: none !important; }

//   .school-select {
//     width: 100%; padding: 13px 40px 13px 15px;
//     border: 1px solid #30363d; border-radius: 11px;
//     font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600;
//     color: #e6edf3; background: #0d1117; cursor: pointer;
//     appearance: none; outline: none;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgb(94, 209, 215)' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
//     background-repeat: no-repeat; background-position: right 14px center;
//     transition: border-color .18s, box-shadow .18s;
//   }
//   .school-select:focus { border-color: rgb(94, 209, 215); box-shadow: 0 0 0 3px rgba(94, 209, 215, 0.15); }
//   .school-select option { background: #161b22; color: #e6edf3; }

//   .program-card {
//     background: #161b22; border: 1px solid #30363d; border-radius: 16px;
//     padding: 2rem 1rem; text-align: center; transition: all 0.2s ease;
//     cursor: pointer; display: flex; flex-direction: column; align-items: center;
//   }
//   .program-card:hover {
//     box-shadow: 0 12px 30px rgba(0,0,0,0.4); transform: translateY(-4px);
//     border-color: #8b949e;
//   }
//   .program-icon-wrapper {
//     width: 90px; height: 90px; border-radius: 50%;
//     margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center;
//     font-size: 2.5rem; background: #0d1117; border: 1px solid #30363d;
//   }

//   ::-webkit-scrollbar { width: 6px; height: 6px; }
//   ::-webkit-scrollbar-track { background: transparent; }
//   ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
//   ::-webkit-scrollbar-thumb:hover { background: #484f58; }
// `;

// function Modal({ title, subtitle, onClose, children, sizeClass = '' }) {
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className={`modal-box ${sizeClass}`} onClick={e => e.stopPropagation()}>
//         {title && (
//           <div style={{ padding: '1.8rem 2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//             <div>
//               <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#e6edf3' }}>{title}</h2>
//               {subtitle && <p style={{ fontSize: '0.84rem', color: '#8b949e', marginTop: 3 }}>{subtitle}</p>}
//             </div>
//             <button className="close-btn" onClick={onClose} style={{ marginLeft: 12, flexShrink: 0 }}>✕</button>
//           </div>
//         )}
//         <div style={{ padding: title ? '1.3rem 2rem 2rem' : '2rem' }}>
//           {!title && (
//              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-10px' }}>
//                 <button className="close-btn" onClick={onClose}>✕</button>
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
//   const [loginId,        setLoginId]        = useState('');
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
//         body:    JSON.stringify({ loginId: loginId, password: loginPassword }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Login failed');
      
//       // Store credentials
//       dispatch(setCredentials({ user: data.user, token: data.token }));
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
      
//       // Redirect based on role
//       const role = data.user.role.toLowerCase();
//       navigate(`/dashboard/${role}`);
      
//     } catch (err) {
//       setLoginError(err.message);
//     } finally {
//       setLoginLoading(false);
//     }
//   };

//   const lbl = { display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 };

//   return (
//     <>
//       <style>{CSS}</style>

//       <div style={{ minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', position: 'relative', background: '#0d1117' }}>

//         {/* ── CLEAN DECENT BACKGROUND ── */}
//         <div style={{
//           position: 'fixed', inset: 0, zIndex: 0,
//           background: '#0d1117' // Base dark background
//         }} />

//         {/* Subtle Ambient Glow */}
//         <div style={{
//           position: 'fixed', top: '-20%', left: '-10%', width: '50%', height: '50%',
//           background: 'radial-gradient(circle, rgba(94, 209, 215, 0.05) 0%, transparent 70%)',
//           zIndex: 0, pointerEvents: 'none'
//         }} />

//         {/* ── NAVBAR ── */}
//         <nav style={{
//           position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
//           background: 'rgba(22, 27, 34, 0.85)', backdropFilter: 'blur(16px)',
//           borderBottom: '1px solid #30363d',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
//           height: 66, display: 'flex', alignItems: 'center',
//           justifyContent: 'space-between', padding: '0 2rem',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             {/* Added Abhyaas Logo Back Here */}
//             {isAbhyaas ? (
//                <img src="/abhyaas-logo.jpeg" alt="Abhyaas" style={{ height: 42, width: 42, objectFit: 'contain', borderRadius: 8, border: '1px solid #30363d' }} onError={e => { e.target.style.display = 'none'; }} />
//             ) : (
//                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, rgb(94, 209, 215) 0%, rgb(59, 184, 192) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d1117', fontWeight: 900, fontSize: '1.05rem' }}>E</div>
//             )}
//             <div>
//               <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#ffffff', lineHeight: 1.1 }}>
//                 {isAbhyaas ? 'Abhyaas' : 'EduManager'}
//               </div>
//               <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgb(94, 209, 215)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
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
//                 <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
//                   Welcome to{' '}
//                   <span style={{ background: 'linear-gradient(135deg, rgb(94, 209, 215) 0%, rgb(59, 184, 192) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
//                     EduManager
//                   </span>
//                 </h1>
//                 <p style={{ fontSize: '1.05rem', color: '#8b949e', maxWidth: 450, margin: '0 auto', lineHeight: 1.65 }}>
//                   A modern school management platform. Sign in to your institution to continue.
//                 </p>
//               </div>
//             )}

//             {isAbhyaas && (
//               <div style={{ marginBottom: '1.5rem', animation: 'fadeIn .5s ease' }}>
//                 <p style={{ color: 'rgb(94, 209, 215)', fontWeight: 700, fontStyle: 'italic', fontSize: '1.25rem', fontFamily: 'Syne, sans-serif' }}>"The Future Begins Here"</p>
//               </div>
//             )}

//             {/* Removed School Selector for Multi-Tenant Login ID Architecture */}

//           </div>
//         </div>
//       </div>

//       {/* ═══════════ MODALS ═══════════ */}

//       {/* PROGRAMS (K-10 Classes) */}
//       {activeModal === 'programs' && (
//         <Modal sizeClass="extra-wide" onClose={closeModal}>
//           <div style={{ marginBottom: '2.5rem' }}>
//             <div style={{ color: 'rgb(94, 209, 215)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
//               Academic Stages at
//             </div>
//             <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#e6edf3', marginBottom: '1rem', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
//               Our School
//             </h2>
//             <p style={{ color: '#8b949e', lineHeight: 1.6, fontSize: '1.05rem', maxWidth: '750px' }}>
//               We provide a structured, holistic learning environment from early childhood through high school. 
//               Our curriculum is designed to build strong fundamentals, encourage curiosity, and prepare students 
//               for future board examinations and beyond.
//             </p>
//           </div>

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
//             {PROGRAMS.map((program) => (
//               <div key={program.id} className="program-card">
//                 <div className="program-icon-wrapper" style={{ color: program.color, borderColor: `${program.color}40`, background: `${program.color}10` }}>
//                   {program.icon}
//                 </div>
//                 <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e6edf3', marginBottom: '0.5rem' }}>
//                   {program.name}
//                 </h3>
//                 <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#8b949e', lineHeight: 1 }}>
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
//               <div key={title} style={{ padding: 20, background: '#0d1117', borderRadius: 16, border: '1px solid #30363d', transition: 'all 0.2s ease', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgb(94, 209, 215)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#30363d'}>
//                 <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>{icon}</div>
//                 <div style={{ fontWeight: 700, color: '#e6edf3', fontSize: '1.05rem', marginBottom: 6 }}>{title}</div>
//                 <div style={{ fontSize: '0.88rem', color: '#8b949e', lineHeight: 1.5 }}>{desc}</div>
//               </div>
//             ))}
//           </div>
//         </Modal>
//       )}

//       {/* SELECTIONS / ACHIEVEMENTS (Up to 10th Class) */}
//       {activeModal === 'selections' && (
//         <Modal title="Our Achievements" subtitle="Milestones we are proud of" onClose={closeModal} sizeClass="wide">
//           <p style={{ color: '#8b949e', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
//             Our students consistently excel in state board examinations, national Olympiads, and athletic competitions. These numbers reflect our commitment to academic excellence and well-rounded student development up to the 10th grade.
//           </p>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', textAlign: 'center' }}>
//             {ACHIEVEMENTS.map(p => (
//               <div key={p.id} style={{ padding: '1.5rem 1rem', background: '#0d1117', borderRadius: '16px', border: '1px solid #30363d', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
//                 <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{p.icon}</div>
//                 <div style={{ fontSize: '2.2rem', fontWeight: 700, color: p.color, lineHeight: 1, fontFamily: 'Syne, sans-serif' }}>{p.count}</div>
//                 <div style={{ fontSize: '0.75rem', color: '#8b949e', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '0.05em' }}>{p.name}</div>
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
//               { icon: '📍', bg: 'rgba(210,153,34,0.1)', color: '#d29922', label: 'Visit Us',  value: '123 Education Lane, Knowledge City' },
//               { icon: '📞', bg: 'rgba(63,185,80,0.1)', color: '#3fb950', label: 'Call Us',   value: '+91 98765 43210' },
//               { icon: '✉️', bg: 'rgba(88,166,255,0.1)', color: '#58a6ff', label: 'Email Us',  value: 'admissions@edu.in' },
//             ].map(({ icon, bg, color, label, value }) => (
//               <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 15, background: '#0d1117', borderRadius: 13, border: '1px solid #30363d' }}>
//                 <div style={{ width: 44, height: 44, borderRadius: 11, background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{icon}</div>
//                 <div>
//                   <div style={{ fontSize: '0.71rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
//                   <div style={{ fontWeight: 500, color: '#e6edf3', marginTop: 2 }}>{value}</div>
//                 </div>
//               </div>
//             ))}
//             <div style={{ padding: '13px 15px', background: 'rgba(94, 209, 215, 0.1)', borderRadius: 13, border: '1px solid rgba(94, 209, 215, 0.3)', textAlign: 'center' }}>
//               <span style={{ fontSize: '0.86rem', color: 'rgb(94, 209, 215)', fontWeight: 600 }}>Office Hours: Monday – Saturday, 8:00 AM – 4:00 PM</span>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* LOGIN */}
//       {activeModal === 'login' && (
//         <Modal title="Sign In" subtitle={selectedSchool ? selectedSchool.name : "EduManager"} onClose={closeModal}>
//           <>
//               {loginError && (
//                 <div style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)', color: '#f85149', padding: '10px 14px', borderRadius: 10, fontSize: '0.87rem', marginBottom: '1rem' }}>
//                   {loginError}
//                 </div>
//               )}
//               <form onSubmit={handleLogin}>
//                 <div style={{ marginBottom: '1.1rem' }}>
//                   <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
//                     Login ID
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g. AB-STD-101"
//                     required
//                     className="form-input"
//                     value={loginId}
//                     onChange={e => setLoginId(e.target.value)}
//                     autoComplete="username"
//                   />
//                 </div>
//                 <div style={{ marginBottom: '1.1rem' }}>
//                   <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
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
//               <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.84rem', color: '#8b949e' }}>
//                 Don't have an account?{' '}
//                 <button
//                   onClick={() => { closeModal(); navigate(`/school/${selectedSchool._id}/register`); }}
//                   style={{ background: 'none', border: 'none', color: 'rgb(94, 209, 215)', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem' }}
//                 >
//                   Register here
//                 </button>
//               </p>
//             </>
//         </Modal>
//       )}
//     </>
//   );
// }
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';

// ─── Data Arrays ──────────────────────────────────────────────────────────────
const PROGRAMS = [
  { id: 'pre-primary', name: 'Pre-Primary', desc: 'Nursery – UKG',      icon: '🎨', bg: '#fff7ed', accent: '#f97316' },
  { id: 'primary',     name: 'Primary',     desc: 'Classes I – V',       icon: '🎒', bg: '#f0fdf4', accent: '#22c55e' },
  { id: 'middle',      name: 'Middle',      desc: 'Classes VI – VIII',   icon: '🔬', bg: '#eff6ff', accent: '#3b82f6' },
  { id: 'high',        name: 'High School', desc: 'Classes IX – X',      icon: '🎓', bg: '#fdf4ff', accent: '#a855f7' },
];

const STATS = [
  { icon: '🧑‍🎓', label: 'Students Enrolled', value: '1,500+', color: '#1e3a8a', bg: '#eff6ff' },
  { icon: '👩‍🏫', label: 'Qualified Faculty',  value: '80+',    color: '#0284c7', bg: '#e0f2fe' },
  { icon: '🏆',  label: 'Board Toppers',       value: '150+',   color: '#4f46e5', bg: '#eef2ff' },
  { icon: '📅',  label: 'Years of Excellence', value: '25+',    color: '#ea580c', bg: '#fff7ed' },
];

const WHY_ITEMS = [
  { icon: '👩‍🏫', title: 'Caring Educators',   desc: "Dedicated to nurturing every child's growth.",    color: '#1e3a8a' },
  { icon: '📚',  title: 'Strong Foundations', desc: 'Focus on Math, Science & Languages.',              color: '#0ea5e9' },
  { icon: '🎨',  title: 'Holistic Dev',        desc: 'Equal weight on sports & extracurriculars.',       color: '#8b5cf6' },
  { icon: '🛡️', title: 'Safe Campus',         desc: 'Modern, secure campus with smart classrooms.',     color: '#10b981' },
];

const NOTICES = [
  { type: 'Important', color: '#e11d48', bg: '#fff1f2', title: 'Mid-Term Exams',    body: 'Examinations begin Jan 10. Collect admit cards from the school office.' },
  { type: 'General',   color: '#1e3a8a', bg: '#eff6ff', title: 'Winter Break',      body: 'School closed Dec 24 – Jan 5. Happy Holidays to all!' },
  { type: 'Event',     color: '#7c3aed', bg: '#fdf4ff', title: 'Annual Sports Day', body: 'Feb 15 — Sports Meet. Registration open for all students.' },
  { type: 'Deadline',  color: '#ea580c', bg: '#fff7ed', title: 'Fee Submission',    body: 'Last date for 2nd Term fee is Jan 30. Avoid late charges.' },
];

const QUICK_LINKS = ['Home', 'About Us', 'Admissions', 'Programs', 'Facilities', 'Contact'];
const ACADEMIC_LINKS = ['Pre-Primary (Nursery–UKG)', 'Primary (I–V)', 'Middle School (VI–VIII)', 'High School (IX–X)', 'Exam Schedule', 'Results'];

// ─── Captcha ──────────────────────────────────────────────────────────────────
function genCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const ops = ['+', '-', 'x'];
  const op  = ops[Math.floor(Math.random() * ops.length)];
  let ans;
  if (op === '+') ans = a + b;
  else if (op === '-') ans = Math.abs(a - b);
  else ans = a * b;
  const big = Math.max(a, b), sml = Math.min(a, b);
  const q   = op === '-' ? `${big} − ${sml}` : `${a} ${op} ${b}`;
  return { q, ans };
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Nunito:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:   #0a192f;
    --navy2:  #172554;
    --blue:   #1e3a8a;
    --blue2:  #3b82f6;
    --orange: #f97316;
    --orange2:#ea580c;
    --bg:     #f8fafc;
    --white:  #ffffff;
    --text:   #0f172a;
    --muted:  #64748b;
    --bdr:    #e2e8f0;
    --r:      16px;
    --sh:     0 2px 16px rgba(14,30,74,0.09);
    --sh2:    0 10px 40px rgba(14,30,74,0.18);
  }

  body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

  @keyframes fadeUp  { from { opacity:0; transform:translateY(26px) } to { opacity:1; transform:none } }
  @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
  @keyframes popIn   { from { opacity:0; transform:scale(0.93) } to { opacity:1; transform:scale(1) } }
  @keyframes pulse   { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:0.7} }
  @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes shimmer { 0%{background-position:200%} 100%{background-position:-200%} }

  /* ════════ NAVBAR ════════ */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    height: 72px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem;
    background: transparent;
    transition: background 0.35s, box-shadow 0.35s;
  }
  .nav.solid {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 2px 24px rgba(14,30,74,0.10);
    border-bottom: 1px solid rgba(30,58,138,0.08);
  }

  .nav-brand { display:flex; align-items:center; gap:12px; cursor:pointer; }
  .nav-logo {
    height:46px; width:46px; object-fit:contain;
    border-radius:10px; border:1.5px solid rgba(255,255,255,0.30);
    box-shadow:0 2px 12px rgba(0,0,0,0.25);
    transition:border-color 0.3s;
  }
  .nav.solid .nav-logo { border-color:rgba(30,58,138,0.20); }
  .nav-logo-fb {
    display:none; width:46px; height:46px; border-radius:10px;
    background:linear-gradient(135deg,var(--blue),var(--blue2));
    align-items:center; justify-content:center;
    color:#fff; font-weight:900; font-size:1.2rem;
    box-shadow:0 3px 12px rgba(30,58,138,0.35);
  }
  .nav-brand-name { font-family:'Playfair Display',serif; font-weight:800; font-size:1.05rem; color:#fff; line-height:1.15; transition:color 0.3s; }
  .nav-brand-sub  { font-size:0.60rem; font-weight:700; color:rgba(255,255,255,0.70); letter-spacing:0.12em; text-transform:uppercase; transition:color 0.3s; }
  .nav.solid .nav-brand-name { color:var(--navy); }
  .nav.solid .nav-brand-sub  { color:var(--blue2); }

  .nav-links { display:flex; align-items:center; gap:2px; }
  .nav-lnk {
    background:none; border:none; cursor:pointer;
    padding:7px 14px; border-radius:9px;
    font-family:'Nunito',sans-serif; font-size:0.88rem; font-weight:700;
    color:rgba(255,255,255,0.85);
    transition:background 0.16s, color 0.16s;
  }
  .nav.solid .nav-lnk { color:var(--muted); }
  .nav-lnk:hover { background:rgba(255,255,255,0.12); color:#fff; }
  .nav.solid .nav-lnk:hover { background:rgba(30,58,138,0.07); color:var(--blue); }

  .nav-reg {
    margin-left:8px; padding:8px 20px;
    background:transparent;
    border:2px solid rgba(255,255,255,0.55); border-radius:10px;
    font-family:'Nunito',sans-serif; font-weight:800; font-size:0.88rem;
    color:#fff; cursor:pointer;
    transition:background 0.16s, border-color 0.16s, color 0.16s;
  }
  .nav.solid .nav-reg { border-color:var(--blue); color:var(--blue); }
  .nav-reg:hover { background:rgba(255,255,255,0.15); }
  .nav.solid .nav-reg:hover { background:rgba(30,58,138,0.07); }

  .nav-login-btn {
    margin-left:6px; padding:10px 24px; border:none; border-radius:10px;
    background:linear-gradient(135deg,var(--orange),var(--orange2));
    font-family:'Nunito',sans-serif; font-weight:800; font-size:0.88rem;
    color:#fff; cursor:pointer;
    box-shadow:0 4px 18px rgba(249,115,22,0.40);
    display:flex; align-items:center; gap:7px;
    transition:transform 0.18s, box-shadow 0.18s;
  }
  .nav-login-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(249,115,22,0.50); }

  /* ════════ HERO ════════ */
  .hero {
    position:relative; min-height:100vh;
    display:flex; align-items:center; justify-content:center;
    text-align:center; padding:110px 2rem 80px;
    overflow:hidden;
  }

  /* Video — visible, slightly dimmed */
  .hero-vid { position:absolute; inset:0; z-index:0; overflow:hidden; }
  .hero-vid video {
    width:100%; height:100%; object-fit:cover;
    filter:brightness(0.45) saturate(0.80);
  }

  /* Gradient overlay — dark at top/bottom, semi-transparent in middle */
  .hero-ov {
    position:absolute; inset:0; z-index:1;
    background:linear-gradient(
      180deg,
      rgba(10,25,47,0.78)  0%,
      rgba(10,25,47,0.30)  28%,
      rgba(10,25,47,0.22)  55%,
      rgba(10,25,47,0.72)  82%,
      rgba(10,25,47,0.95)  100%
    );
  }

  .hero-blob1 { position:absolute; width:500px; height:500px; top:-140px; left:-100px; border-radius:50%; background:rgba(30,58,138,0.22); filter:blur(90px); pointer-events:none; z-index:2; }
  .hero-blob2 { position:absolute; width:380px; height:380px; bottom:-60px; right:-80px; border-radius:50%; background:rgba(249,115,22,0.14); filter:blur(80px); pointer-events:none; z-index:2; animation:floatY 9s ease-in-out infinite; }

  .hero-content { position:relative; z-index:3; max-width:820px; animation:fadeUp 0.9s ease both; }

  .hero-badge {
    display:inline-flex; align-items:center; gap:8px;
    padding:7px 20px; border-radius:99px; margin-bottom:1.6rem;
    background:rgba(255,255,255,0.12);
    backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
    border:1px solid rgba(255,255,255,0.28);
    font-size:0.75rem; font-weight:800; color:#fff;
    letter-spacing:0.09em; text-transform:uppercase;
    box-shadow:0 4px 20px rgba(0,0,0,0.20);
  }
  .badge-dot { width:8px; height:8px; border-radius:50%; background:#fbbf24; animation:pulse 2s infinite; box-shadow:0 0 8px rgba(251,191,36,0.8); }

  .hero h1 {
    font-family:'Playfair Display',serif;
    font-size:clamp(2.8rem,6vw,5rem);
    font-weight:800; color:#fff;
    line-height:1.08; margin-bottom:1.3rem;
    letter-spacing:-0.01em;
    text-shadow:0 2px 6px rgba(0,0,0,0.55),0 4px 24px rgba(0,0,0,0.40);
  }
  .hero h1 .highlight {
    font-style:italic;
    background:linear-gradient(90deg,#fbbf24,#f97316,#fbbf24);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 4s linear infinite;
    filter:drop-shadow(0 0 18px rgba(249,115,22,0.55));
  }

  .hero p {
    font-size:1.1rem; font-weight:500; color:rgba(255,255,255,0.88);
    line-height:1.80; max-width:560px; margin:0 auto 2.6rem;
    text-shadow:0 1px 10px rgba(0,0,0,0.45);
  }

  .hero-btns { display:flex; align-items:center; justify-content:center; gap:14px; flex-wrap:wrap; }

  .btn-hero-p {
    padding:14px 34px; border:none; border-radius:12px;
    background:linear-gradient(135deg,var(--orange),var(--orange2));
    color:#fff; font-family:'Nunito',sans-serif; font-weight:800; font-size:1rem;
    cursor:pointer; box-shadow:0 8px 28px rgba(249,115,22,0.50);
    transition:transform 0.18s, box-shadow 0.18s;
  }
  .btn-hero-p:hover { transform:translateY(-3px); box-shadow:0 14px 36px rgba(249,115,22,0.55); }

  .btn-hero-g {
    padding:13px 30px; border-radius:12px; cursor:pointer;
    background:rgba(255,255,255,0.14);
    backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
    border:1.5px solid rgba(255,255,255,0.40);
    color:#fff; font-family:'Nunito',sans-serif; font-weight:800; font-size:1rem;
    transition:background 0.18s, border-color 0.18s, transform 0.18s;
  }
  .btn-hero-g:hover { background:rgba(255,255,255,0.24); border-color:rgba(255,255,255,0.70); transform:translateY(-2px); }

  .hero-scroll {
    position:absolute; bottom:2.2rem; left:50%; transform:translateX(-50%);
    z-index:3; display:flex; flex-direction:column; align-items:center; gap:5px;
    color:rgba(255,255,255,0.50); font-size:0.70rem; font-weight:700;
    letter-spacing:0.12em; text-transform:uppercase;
    animation:floatY 3s ease-in-out infinite;
  }

  /* ════════ STATS BAR ════════ */
  .stats-bar {
    background:linear-gradient(135deg,var(--navy) 0%,var(--blue) 100%);
    padding:2.2rem 3rem;
    display:flex; justify-content:center; flex-wrap:wrap;
    box-shadow:0 6px 32px rgba(10,25,47,0.30);
  }
  .sc {
    text-align:center; padding:0.5rem 3rem;
    border-right:1px solid rgba(255,255,255,0.14);
    animation:fadeUp 0.6s ease both;
  }
  .sc:last-child { border-right:none; }
  .sc-val { font-family:'Playfair Display',serif; font-size:2.4rem; font-weight:800; color:#fff; line-height:1; }
  .sc-lbl { font-size:0.70rem; font-weight:700; color:rgba(255,255,255,0.65); text-transform:uppercase; letter-spacing:0.10em; margin-top:4px; }

  /* ════════ SECTIONS ════════ */
  .sec { padding:5.5rem 3rem; }
  .sec-in { max-width:1140px; margin:0 auto; }

  .chip {
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 16px; border-radius:99px;
    background:rgba(30,58,138,0.08); border:1px solid rgba(30,58,138,0.18);
    font-size:0.71rem; font-weight:800; color:var(--blue);
    letter-spacing:0.10em; text-transform:uppercase; margin-bottom:0.85rem;
  }
  .sec-h {
    font-family:'Playfair Display',serif;
    font-size:clamp(2rem,3.5vw,2.8rem); font-weight:800;
    color:var(--text); line-height:1.12; margin-bottom:0.6rem;
  }
  .sec-p { font-size:0.97rem; color:var(--muted); line-height:1.78; max-width:560px; font-weight:500; }

  /* ════════ BENTO GRID ════════ */
  .bento { display:grid; gap:1.1rem; margin-top:2.4rem; }
  .b4 { grid-template-columns:repeat(4,1fr); }
  .b3 { grid-template-columns:repeat(3,1fr); }
  .b2 { grid-template-columns:1fr 1fr; }

  /* Base glass card */
  .gc {
    background:rgba(255,255,255,0.82);
    backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
    border:1.5px solid rgba(255,255,255,0.96);
    border-radius:var(--r);
    box-shadow:var(--sh);
    padding:1.7rem;
    transition:transform 0.24s cubic-bezier(.34,1.56,.64,1), box-shadow 0.24s, border-color 0.24s;
    cursor:default; position:relative; overflow:hidden;
  }
  /* Top inner highlight */
  .gc::after {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent);
    pointer-events:none;
  }
  .gc:hover { transform:translateY(-7px) scale(1.015); box-shadow:var(--sh2); border-color:rgba(30,58,138,0.22); }

  /* Featured navy card */
  .gc-navy {
    background:linear-gradient(135deg,var(--navy) 0%,var(--blue) 100%) !important;
    border:none !important;
    box-shadow:0 10px 38px rgba(10,25,47,0.40) !important;
  }
  .gc-navy::after { background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent); }
  .gc-navy .c-val,
  .gc-navy .c-name { color:#fff !important; }
  .gc-navy .c-desc,
  .gc-navy .c-lbl  { color:rgba(255,255,255,0.72) !important; }

  /* Featured orange card */
  .gc-orange {
    background:linear-gradient(135deg,var(--orange2) 0%,var(--orange) 100%) !important;
    border:none !important;
    box-shadow:0 10px 38px rgba(249,115,22,0.38) !important;
  }
  .gc-orange .c-val,
  .gc-orange .c-name { color:#fff !important; }
  .gc-orange .c-desc,
  .gc-orange .c-lbl  { color:rgba(255,255,255,0.75) !important; }

  .c-ico  { width:54px; height:54px; border-radius:15px; display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:14px; }
  .c-val  { font-family:'Playfair Display',serif; font-size:2.3rem; font-weight:800; line-height:1; margin-bottom:5px; }
  .c-name { font-weight:800; font-size:1rem; color:var(--text); margin-bottom:4px; }
  .c-desc { font-size:0.82rem; color:var(--muted); line-height:1.60; font-weight:500; }
  .c-lbl  { font-size:0.72rem; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:0.09em; }

  .why-dot { width:11px; height:11px; border-radius:50%; flex-shrink:0; margin-top:5px; }

  /* ════════ NOTICES ════════ */
  .notices-row { display:flex; gap:1.1rem; overflow-x:auto; padding-bottom:8px; margin-top:2.2rem; scrollbar-width:thin; scrollbar-color:rgba(30,58,138,0.2) transparent; }
  .nc {
    min-width:270px; flex-shrink:0;
    background:rgba(255,255,255,0.82); backdrop-filter:blur(14px);
    border:1.5px solid rgba(255,255,255,0.96);
    border-radius:var(--r); padding:1.4rem 1.6rem;
    border-left-width:4px !important;
    transition:transform 0.22s, box-shadow 0.22s;
  }
  .nc:hover { transform:translateY(-5px); box-shadow:var(--sh2); }
  .nc-type  { font-size:0.68rem; font-weight:800; letter-spacing:0.09em; text-transform:uppercase; margin-bottom:6px; }
  .nc-title { font-weight:800; font-size:0.96rem; color:var(--text); margin-bottom:5px; }
  .nc-body  { font-size:0.80rem; color:var(--muted); line-height:1.60; font-weight:500; }

  /* ════════ FOOTER ════════ */
  .footer { background:var(--navy); color:rgba(255,255,255,0.75); }

  .footer-top {
    max-width:1140px; margin:0 auto;
    padding:4rem 3rem 2.5rem;
    display:grid; grid-template-columns:1.4fr 1fr 1fr; gap:3rem;
  }

  .ft-logo-row { display:flex; align-items:center; gap:12px; margin-bottom:1.2rem; }
  .ft-logo { height:44px; width:44px; object-fit:contain; border-radius:10px; border:1.5px solid rgba(255,255,255,0.18); }
  .ft-logo-name { font-family:'Playfair Display',serif; font-weight:800; font-size:1rem; color:#fff; line-height:1.2; }
  .ft-logo-sub  { font-size:0.60rem; font-weight:700; color:rgba(255,255,255,0.50); letter-spacing:0.12em; text-transform:uppercase; }

  .ft-desc { font-size:0.84rem; line-height:1.75; color:rgba(255,255,255,0.55); font-weight:500; margin-bottom:1.5rem; }

  .ft-contact-item { display:flex; align-items:flex-start; gap:10px; margin-bottom:0.8rem; font-size:0.83rem; color:rgba(255,255,255,0.62); font-weight:500; }
  .ft-contact-ico  { font-size:1rem; flex-shrink:0; margin-top:1px; }

  .ft-col-title { font-weight:800; font-size:0.90rem; color:#fff; letter-spacing:0.05em; text-transform:uppercase; margin-bottom:1.2rem; padding-bottom:0.6rem; border-bottom:1px solid rgba(255,255,255,0.10); }
  .ft-link {
    display:block; font-size:0.83rem; color:rgba(255,255,255,0.58); font-weight:500;
    margin-bottom:0.6rem; cursor:pointer; background:none; border:none; text-align:left;
    text-decoration:none; transition:color 0.16s;
    font-family:'Nunito',sans-serif;
  }
  .ft-link:hover { color:var(--orange); }

  .footer-bottom {
    border-top:1px solid rgba(255,255,255,0.08);
    padding:1.2rem 3rem;
    display:flex; align-items:center; justify-content:space-between;
    max-width:1140px; margin:0 auto;
    font-size:0.79rem; color:rgba(255,255,255,0.40); font-weight:600;
  }
  .footer-bottom-links { display:flex; gap:1.5rem; }
  .footer-bottom-lnk { color:rgba(255,255,255,0.40); cursor:pointer; background:none; border:none; font-family:'Nunito',sans-serif; font-size:0.79rem; font-weight:600; transition:color 0.16s; }
  .footer-bottom-lnk:hover { color:var(--orange); }

  /* ════════ MODAL ════════ */
  .mo {
    position:fixed; inset:0; z-index:600;
    background:rgba(10,25,47,0.60);
    backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
    display:flex; align-items:center; justify-content:center;
    padding:1rem; animation:fadeIn 0.2s ease;
  }
  .mb {
    background:#fff;
    border:1.5px solid rgba(30,58,138,0.12);
    border-radius:22px;
    box-shadow:0 32px 90px rgba(10,25,47,0.28),0 8px 24px rgba(0,0,0,0.10);
    width:100%; max-width:480px; max-height:92vh; overflow-y:auto;
    animation:popIn 0.28s cubic-bezier(.34,1.56,.64,1);
  }
  .mb.wide  { max-width:700px; }
  .mb.xwide { max-width:900px; }

  .mh { display:flex; justify-content:space-between; align-items:flex-start; padding:1.8rem 2rem 0; }
  .mt { font-family:'Playfair Display',serif; font-size:1.45rem; font-weight:800; color:var(--text); }
  .ms { font-size:0.81rem; color:var(--muted); margin-top:4px; font-weight:500; }
  .mbody { padding:1.4rem 2rem 2rem; }

  .mcls {
    width:34px; height:34px; border-radius:50%; flex-shrink:0; margin-left:12px;
    background:#f1f5f9; border:none; cursor:pointer; font-size:0.95rem; color:var(--muted);
    display:flex; align-items:center; justify-content:center;
    transition:background 0.16s, color 0.16s;
  }
  .mcls:hover { background:#e2e8f0; color:var(--text); }

  /* Login modal header */
  .lhdr {
    background:linear-gradient(135deg,var(--navy) 0%,var(--blue) 100%);
    border-radius:22px 22px 0 0; padding:2rem 2rem 1.8rem; text-align:center;
    position:relative; overflow:hidden;
  }
  .lhdr::after {
    content:''; position:absolute; inset:0;
    background:radial-gradient(circle at 70% 30%,rgba(255,255,255,0.10) 0%,transparent 65%);
    pointer-events:none;
  }
  .l-logo {
    width:72px; height:72px; border-radius:18px; margin:0 auto 1rem;
    background:rgba(255,255,255,0.16); border:2px solid rgba(255,255,255,0.32);
    display:flex; align-items:center; justify-content:center; overflow:hidden;
    position:relative; z-index:1; box-shadow:0 4px 20px rgba(0,0,0,0.20);
  }
  .l-logo img { width:100%; height:100%; object-fit:contain; }
  .l-title { font-family:'Playfair Display',serif; font-size:1.35rem; font-weight:800; color:#fff; position:relative; z-index:1; }
  .l-sub   { font-size:0.79rem; color:rgba(255,255,255,0.72); margin-top:5px; font-weight:600; position:relative; z-index:1; }
  .lbody   { padding:1.8rem 2rem 2rem; }

  /* Form */
  .fg { margin-bottom:1.15rem; }
  .fl { display:block; font-size:0.71rem; font-weight:800; color:#374151; text-transform:uppercase; letter-spacing:0.09em; margin-bottom:7px; }
  .fi {
    width:100%; padding:12px 16px;
    background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px;
    font-family:'Nunito',sans-serif; font-size:0.95rem; color:#0f172a; font-weight:600;
    outline:none; transition:border-color 0.18s, box-shadow 0.18s, background 0.18s;
  }
  .fi::placeholder { color:#94a3b8; font-weight:500; }
  .fi:focus { border-color:var(--blue); background:#fff; box-shadow:0 0 0 4px rgba(30,58,138,0.10); }
  .fi:-webkit-autofill,.fi:-webkit-autofill:focus {
    -webkit-box-shadow:0 0 0 30px #f8fafc inset !important;
    -webkit-text-fill-color:#0f172a !important;
  }

  .cap-row { display:flex; align-items:center; gap:10px; }
  .cap-pill {
    padding:12px 18px; border-radius:12px; flex-shrink:0;
    background:linear-gradient(135deg,rgba(30,58,138,0.07),rgba(59,130,246,0.09));
    border:1.5px solid rgba(30,58,138,0.22);
    font-size:1.15rem; font-weight:900; color:var(--blue);
    letter-spacing:0.15em; font-family:monospace; user-select:none; white-space:nowrap;
  }
  .cap-ref {
    width:42px; height:42px; flex-shrink:0;
    background:rgba(30,58,138,0.07); border:1.5px solid rgba(30,58,138,0.18);
    border-radius:11px; cursor:pointer; font-size:1.15rem;
    display:flex; align-items:center; justify-content:center; color:var(--blue);
    transition:background 0.16s, transform 0.28s;
  }
  .cap-ref:hover { background:rgba(30,58,138,0.14); transform:rotate(90deg); }

  .err-box {
    background:#fef2f2; border:1.5px solid #fecaca; color:#b91c1c;
    padding:10px 14px; border-radius:12px; font-size:0.83rem;
    margin-bottom:1rem; font-weight:600;
    display:flex; align-items:center; gap:8px;
  }
  .sbtn {
    width:100%; padding:14px; border:none; border-radius:12px;
    background:linear-gradient(135deg,var(--orange),var(--orange2));
    color:#fff; font-family:'Nunito',sans-serif; font-weight:800; font-size:1rem;
    cursor:pointer; box-shadow:0 6px 24px rgba(249,115,22,0.35);
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:transform 0.18s, box-shadow 0.18s, opacity 0.18s;
  }
  .sbtn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 32px rgba(249,115,22,0.45); }
  .sbtn:disabled { opacity:0.55; cursor:not-allowed; }

  /* ════════ RESPONSIVE ════════ */
  @media (max-width:1024px) {
    .footer-top { grid-template-columns:1fr 1fr; }
    .footer-top > *:first-child { grid-column:span 2; }
  }
  @media (max-width:960px) {
    .b4,.b3 { grid-template-columns:1fr 1fr; }
    .nav     { padding:0 1.4rem; }
    .sec     { padding:3.5rem 1.5rem; }
    .stats-bar { padding:1.8rem 1rem; }
    .sc      { padding:0.5rem 1.5rem; }
    .footer-top { padding:3rem 1.5rem 2rem; gap:2rem; }
    .footer-bottom { padding:1.2rem 1.5rem; }
  }
  @media (max-width:620px) {
    .b4,.b3,.b2 { grid-template-columns:1fr; }
    .nav-lnk    { display:none; }
    .footer-top { grid-template-columns:1fr; }
    .footer-top > *:first-child { grid-column:span 1; }
    .footer-bottom { flex-direction:column; gap:0.8rem; text-align:center; }
  }
`;

// ─── Generic Modal ─────────────────────────────────────────────────────────────
function Modal({ title, subtitle, onClose, children, size = '' }) {
  return (
    <div className="mo" onClick={onClose}>
      <div className={`mb ${size}`} onClick={e => e.stopPropagation()}>
        <div className="mh">
          <div>
            <div className="mt">{title}</div>
            {subtitle && <div className="ms">{subtitle}</div>}
          </div>
          <button className="mcls" onClick={onClose}>✕</button>
        </div>
        <div className="mbody">{children}</div>
      </div>
    </div>
  );
}

// ─── Page Component ────────────────────────────────────────────────────────────
export default function MasterLandingPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [loginId,     setLoginId]     = useState('');
  const [loginPass,   setLoginPass]   = useState('');
  const [loginErr,    setLoginErr]    = useState('');
  const [loading,     setLoading]     = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [captcha,     setCaptcha]     = useState(genCaptcha);
  const [capVal,      setCapVal]      = useState('');
  const [capErr,      setCapErr]      = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null); setLoginErr(''); setCapVal(''); setCapErr(false);
  }, []);

  const refresh = () => { setCaptcha(genCaptcha()); setCapVal(''); setCapErr(false); };

  const handleLogin = async (e) => {
    e.preventDefault(); setLoginErr(''); setCapErr(false);
    if (parseInt(capVal, 10) !== captcha.ans) { setCapErr(true); refresh(); return; }
    setLoading(true);
    try {
      const res  = await fetch('http://localhost:5000/api/auth/login', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ loginId, password: loginPass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      dispatch(setCredentials({ user: data.user, token: data.token }));
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(`/dashboard/${data.user.role.toLowerCase()}`);
    } catch (err) { setLoginErr(err.message); refresh(); }
    finally { setLoading(false); }
  };

  // ── JSX ──────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav className={`nav${scrolled ? ' solid' : ''}`}>

        <div className="nav-brand" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}>
          <img
            src="/abhyaas-logo.jpeg" alt="Abhyaas" className="nav-logo"
            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
          />
          <div className="nav-logo-fb">A</div>
          <div>
            <div className="nav-brand-name">Abhyaas</div>
            <div className="nav-brand-sub">International School</div>
          </div>
        </div>

        <div className="nav-links">
          <button className="nav-lnk" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}>Home</button>
          <button className="nav-lnk" onClick={() => setActiveModal('programs')}>Programs</button>
          <button className="nav-lnk" onClick={() => setActiveModal('why')}>Why Us</button>
          <button className="nav-lnk" onClick={() => setActiveModal('notices')}>Notices</button>
          <button className="nav-lnk" onClick={() => setActiveModal('contact')}>Contact</button>
          {/* <button className="nav-reg" onClick={() => navigate('/register')}>Register</button> */}
          <button className="nav-login-btn" onClick={() => setActiveModal('login')}>
            🔑 Login ERP
          </button>
        </div>

      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="hero">

        {/* Background Video */}
        <div className="hero-vid">
          <video autoPlay muted loop playsInline>
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-little-school-kids-learning-in-class-4434-large.mp4"
              type="video/mp4"
            />
            {/* fallback */}
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div className="hero-ov" />

        {/* Atmospheric blobs */}
        <div className="hero-blob1" />
        <div className="hero-blob2" />

        {/* Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-dot" />
            Rajam's Premier School &nbsp;·&nbsp; Est. 1999
          </div>

          <h1>
            Nurturing{' '}
            <span className="highlight">Brilliant Minds</span>
            <br />for Tomorrow's World
          </h1>

          <p>
            Abhyaas International School — Nursery to Class X — empowering every
            child with knowledge, character, and the confidence to lead.
          </p>

          <div className="hero-btns">
            <button className="btn-hero-p" onClick={() => navigate('/register')}>
              ✨ Apply for Admission
            </button>
            <button className="btn-hero-g" onClick={() => setActiveModal('login')}>
              🔑 Login ERP →
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span style={{ fontSize:'1.2rem' }}>↓</span>
          Scroll to explore
        </div>

      </section>

      {/* ══════════════════ STATS BAR ══════════════════ */}
      <div className="stats-bar">
        {STATS.map(({ value, label }) => (
          <div className="sc" key={label}>
            <div className="sc-val">{value}</div>
            <div className="sc-lbl">{label}</div>
          </div>
        ))}
      </div>

      {/* ══════════════════ OVERVIEW BENTO ══════════════════ */}
      <section className="sec" style={{ background:'#fff' }}>
        <div className="sec-in">
          <div className="chip">📊 At a Glance</div>
          <div className="sec-h">School Overview</div>
          <div className="sec-p">Key numbers that reflect our dedication to every student.</div>
          <div className="bento b4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`gc${i === 0 ? ' gc-navy' : i === 3 ? ' gc-orange' : ''}`}
                style={{ display:'flex', flexDirection:'column', gap:8 }}
              >
                <div className="c-ico" style={{ background: (i===0||i===3) ? 'rgba(255,255,255,0.18)' : s.bg }}>
                  {s.icon}
                </div>
                <div className="c-val" style={{ color: (i===0||i===3) ? '#fff' : s.color }}>
                  {s.value}
                </div>
                <div className="c-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ ACADEMICS BENTO ══════════════════ */}
      <section className="sec" style={{ background:'var(--bg)' }}>
        <div className="sec-in">
          <div className="chip">🎓 Academics</div>
          <div className="sec-h">Our Academic Programs</div>
          <div className="sec-p">A structured, holistic learning journey from early childhood to board-level excellence.</div>
          <div className="bento b4">
            {PROGRAMS.map((p, i) => (
              <div
                key={p.id}
                className={`gc${i === 2 ? ' gc-navy' : ''}`}
                style={{ display:'flex', flexDirection:'column', gap:8 }}
              >
                <div className="c-ico"
                  style={{ background: i===2 ? 'rgba(255,255,255,0.18)' : p.bg, fontSize:'1.65rem' }}>
                  {p.icon}
                </div>
                <div className="c-name">{p.name}</div>
                <div className="c-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY US BENTO ══════════════════ */}
      <section className="sec" style={{ background:'#fff' }}>
        <div className="sec-in">
          <div className="chip">⭐ Why Abhyaas</div>
          <div className="sec-h">Why Choose Us?</div>
          <div className="sec-p">We combine rigorous academics with a nurturing environment — because great education shapes both mind and character.</div>
          <div className="bento b2" style={{ gridTemplateColumns:'repeat(2,1fr)' }}>
            {WHY_ITEMS.map((w, i) => (
              <div key={w.title} className={`gc${i === 1 ? ' gc-navy' : ''}`}>
                <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
                  <div className="why-dot"
                    style={{ background: i===1 ? 'rgba(255,255,255,0.60)' : w.color }} />
                  <div>
                    <div className="c-name" style={{ marginBottom:6, color: i===1 ? '#fff' : '' }}>
                      {w.icon}&nbsp; {w.title}
                    </div>
                    <div className="c-desc" style={{ color: i===1 ? 'rgba(255,255,255,0.74)' : '' }}>
                      {w.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ NOTICES STRIP ══════════════════ */}
      <section className="sec" style={{ background:'var(--bg)' }}>
        <div className="sec-in">
          <div className="chip">📢 Latest Updates</div>
          <div className="sec-h">School Notices</div>
          <div className="sec-p">Stay informed with the latest announcements from Abhyaas.</div>
          <div className="notices-row">
            {NOTICES.map(n => (
              <div key={n.title} className="nc" style={{ borderLeftColor:n.color }}>
                <div className="nc-type"  style={{ color:n.color }}>{n.type}</div>
                <div className="nc-title">{n.title}</div>
                <div className="nc-body">{n.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="footer">
        <div className="footer-top">

          {/* Col 1 — Brand + contact */}
          <div>
            <div className="ft-logo-row">
              <img
                src="/abhyaas-logo.jpeg" alt="Abhyaas" className="ft-logo"
                onError={e => { e.target.style.display='none'; }}
              />
              <div>
                <div className="ft-logo-name">Abhyaas</div>
                <div className="ft-logo-sub">International School</div>
              </div>
            </div>
            <p className="ft-desc">
              Empowering young minds with quality education, strong values, and the skills to thrive in an ever-changing world — since 1999.
            </p>
            <div className="ft-contact-item"><span className="ft-contact-ico">📍</span> Rajam, Andhra Pradesh</div>
            <div className="ft-contact-item"><span className="ft-contact-ico">📞</span> +91 98765 43210</div>
            <div className="ft-contact-item"><span className="ft-contact-ico">✉️</span> admissions@abhyaas.edu.in</div>
            <div className="ft-contact-item"><span className="ft-contact-ico">🕐</span> Mon – Sat, 8:00 AM – 4:00 PM</div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <div className="ft-col-title">Quick Links</div>
            {QUICK_LINKS.map(l => (
              <button key={l} className="ft-link"
                onClick={() => l === 'Contact' ? setActiveModal('contact') : l === 'Programs' ? setActiveModal('programs') : null}>
                → {l}
              </button>
            ))}
          </div>

          {/* Col 3 — Academics */}
          <div>
            <div className="ft-col-title">Academics</div>
            {ACADEMIC_LINKS.map(l => (
              <button key={l} className="ft-link">→ {l}</button>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Abhyaas International School, Rajam. All rights reserved.</span>
            <div className="footer-bottom-links">
              <button className="footer-bottom-lnk">Privacy Policy</button>
              <button className="footer-bottom-lnk">Terms of Use</button>
              <button className="footer-bottom-lnk">Sitemap</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ══════════════════════ MODALS ══════════════════════ */}

      {/* ── LOGIN ERP ── */}
      {activeModal === 'login' && (
        <div className="mo" onClick={closeModal}>
          <div className="mb" onClick={e => e.stopPropagation()}>

            <div className="lhdr">
              <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:10 }}>
                <button className="mcls"
                  style={{ background:'rgba(255,255,255,0.18)', color:'#fff' }}
                  onClick={closeModal}>✕</button>
              </div>
              <div className="l-logo">
                <img src="/abhyaas-logo.jpeg" alt="Abhyaas"
                  onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML='<span style="font-size:2rem">🏫</span>'; }} />
              </div>
              <div className="l-title">Welcome Back</div>
              <div className="l-sub">Abhyaas International School — ERP Portal</div>
            </div>

            <div className="lbody">
              {loginErr && <div className="err-box">⚠️ {loginErr}</div>}
              {capErr   && <div className="err-box">🔢 Wrong answer. New captcha generated.</div>}

              <form onSubmit={handleLogin}>
                <div className="fg">
                  <label className="fl">Login ID</label>
                  <input type="text" placeholder="e.g. AB-STD-101 or Staff ID"
                    required className="fi"
                    value={loginId} onChange={e => setLoginId(e.target.value)}
                    autoComplete="username" />
                </div>

                <div className="fg">
                  <label className="fl">Password</label>
                  <input type="password" placeholder="Enter your password"
                    required className="fi"
                    value={loginPass} onChange={e => setLoginPass(e.target.value)}
                    autoComplete="current-password" />
                </div>

                <div className="fg">
                  <label className="fl">Security Check &nbsp;— What is &nbsp;{captcha.q} ?</label>
                  <div className="cap-row">
                    <div className="cap-pill">{captcha.q} = ?</div>
                    <input type="number" placeholder="Your answer"
                      required className="fi"
                      value={capVal} onChange={e => setCapVal(e.target.value)}
                      autoComplete="off"
                      style={{ textAlign:'center', fontWeight:800, fontSize:'1.05rem' }} />
                    <button type="button" className="cap-ref" onClick={refresh} title="New captcha">↻</button>
                  </div>
                </div>

                <button type="submit" className="sbtn" disabled={loading}>
                  {loading ? '⏳ Signing in…' : '🔑 Sign In to ERP'}
                </button>
              </form>

              {/* <p style={{ textAlign:'center', marginTop:'1.2rem', fontSize:'0.83rem', color:'#6b7280', fontWeight:600 }}>
                New here?{' '}
                <button onClick={() => { closeModal(); navigate('/register'); }}
                  style={{ background:'none', border:'none', color:'var(--blue)', fontWeight:800, cursor:'pointer', fontFamily:'Nunito,sans-serif', fontSize:'0.83rem' }}>
                  Register your account → */}
                {/* </button> */}
              {/* </p> */}
            </div>

          </div>
        </div>
      )}

      {/* ── PROGRAMS ── */}
      {activeModal === 'programs' && (
        <Modal title="Academic Programs" subtitle="Nursery to Class X — a journey of structured excellence" onClose={closeModal} size="xwide">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:'1rem' }}>
            {PROGRAMS.map(p => (
              <div key={p.id}
                style={{ background:p.bg, border:`1.5px solid ${p.accent}28`, borderRadius:16, padding:'1.8rem 1.2rem', textAlign:'center', transition:'transform 0.22s', cursor:'default' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-6px)'}
                onMouseLeave={e => e.currentTarget.style.transform='none'}>
                <div style={{ fontSize:'2.6rem', marginBottom:12 }}>{p.icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, color:p.accent, marginBottom:5, fontSize:'1.1rem' }}>{p.name}</div>
                <div style={{ fontSize:'0.84rem', color:'#374151', fontWeight:600 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ── WHY US ── */}
      {activeModal === 'why' && (
        <Modal title="Why Choose Abhyaas?" subtitle="What sets us apart from the rest" onClose={closeModal} size="wide">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            {WHY_ITEMS.map(w => (
              <div key={w.title}
                style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:16, padding:'1.4rem 1.5rem', transition:'border-color 0.2s, transform 0.2s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=w.color; e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none'; }}>
                <div style={{ fontSize:'2rem', marginBottom:10 }}>{w.icon}</div>
                <div style={{ fontWeight:800, color:'#0f172a', marginBottom:5 }}>{w.title}</div>
                <div style={{ fontSize:'0.83rem', color:'#64748b', lineHeight:1.65, fontWeight:500 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ── NOTICES ── */}
      {activeModal === 'notices' && (
        <Modal title="School Notices" subtitle="Latest announcements from Abhyaas" onClose={closeModal}>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
            {NOTICES.map(n => (
              <div key={n.title}
                style={{ background:n.bg, border:`1.5px solid ${n.color}28`, borderLeft:`4px solid ${n.color}`, borderRadius:14, padding:'1.1rem 1.3rem' }}>
                <div style={{ fontSize:'0.67rem', fontWeight:800, color:n.color, textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:5 }}>{n.type}</div>
                <div style={{ fontWeight:800, color:'#0f172a', marginBottom:4 }}>{n.title}</div>
                <div style={{ fontSize:'0.81rem', color:'#64748b', lineHeight:1.65, fontWeight:500 }}>{n.body}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ── CONTACT ── */}
      {activeModal === 'contact' && (
        <Modal title="Get in Touch" subtitle="We are always here to help" onClose={closeModal}>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.9rem' }}>
            {[
              { icon:'📍', bg:'#fff7ed', label:'Address', value:'Rajam, Andhra Pradesh' },
              { icon:'📞', bg:'#eff6ff', label:'Phone',   value:'+91 98765 43210' },
              { icon:'✉️', bg:'#eef2ff', label:'Email',   value:'admissions@abhyaas.edu.in' },
            ].map(({ icon, bg, label, value }) => (
              <div key={label}
                style={{ display:'flex', alignItems:'center', gap:14, background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:14, padding:'1.1rem 1.3rem' }}>
                <div style={{ width:46, height:46, borderRadius:13, background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', flexShrink:0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize:'0.68rem', fontWeight:800, color:' var(--blue)', textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:3 }}>{label}</div>
                  <div style={{ fontWeight:700, color:'#0f172a' }}>{value}</div>
                </div>
              </div>
            ))}
            <div style={{ background:'#eff6ff', border:'1.5px solid #bfdbfe', borderRadius:14, padding:'1rem 1.3rem', textAlign:'center', color:'var(--blue)', fontSize:'0.85rem', fontWeight:800 }}>
              🕐 Office Hours: Monday – Saturday &nbsp;·&nbsp; 8:00 AM – 4:00 PM
            </div>
          </div>
        </Modal>
      )}

    </>
  );
}