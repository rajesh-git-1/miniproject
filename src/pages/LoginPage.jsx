// import React, { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCredentials, authStart, authFailure, selectCurrentSchoolId } from '../store/authSlice';

// const LoginPage = () => {
//     const { schoolCode } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     // In a real app, map schoolCode (subdomain or code) to school_id if necessary
//     const school_id = useSelector(selectCurrentSchoolId) || schoolCode;

//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [localError, setLocalError] = useState('');
//     const { isLoading } = useSelector(state => state.auth || { isLoading: false });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLocalError('');
//         dispatch(authStart());

//         try {
//             const response = await fetch('/api/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     email: formData.email,
//                     password: formData.password,
//                     school_id // tenant context passed explicitly
//                 })
//             });

//             const data = await response.json();

//             if (data.success) {
//                 dispatch(setCredentials({
//                     user: data.user,
//                     token: data.token,
//                     school_id: data.user.school_id
//                 }));

//                 // Route dynamically based on role
//                 const roleStr = data.user.role.toLowerCase();
//                 navigate(`/dashboard/${roleStr}`);
//             } else {
//                 setLocalError(data.message || 'Login failed');
//                 dispatch(authFailure(data.message));
//             }
//         } catch (err) {
//             setLocalError('Network error connecting to login service.');
//             dispatch(authFailure('Network error'));
//         }
//     };

//     return (
//         <div className="min-h-screen app-layout items-center justify-center p-4">
//             <div className="card w-full max-w-md space-y-8">
//                 <div>
//                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                         Sign in to your account
//                     </h2>
//                     <p className="mt-2 text-center text-sm text-gray-600">
//                         School Portal: <span className="font-semibold text-primary uppercase">{schoolCode}</span>
//                     </p>
//                 </div>

//                 <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                     {localError && (
//                         <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-700">
//                             {localError}
//                         </div>
//                     )}

//                     <div className="rounded-md shadow-sm space-y-4">
//                         <div>
//                             <label className="form-label" htmlFor="email">Email Address</label>
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 required
//                                 className="form-input"
//                                 placeholder="you@example.com"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label className="form-label" htmlFor="password">Password</label>
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 required
//                                 className="form-input"
//                                 placeholder="••••••••"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <button
//                             type="submit"
//                             disabled={isLoading}
//                             className={`btn btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                         >
//                             {isLoading ? 'Signing in...' : 'Sign in'}
//                         </button>
//                     </div>
//                 </form>

//                 <div className="text-center">
//                     <p className="text-sm text-gray-600">
//                         Don't have an account?{' '}
//                         <Link to={`/school/${schoolCode}/register`} className="font-medium text-primary hover:text-primary-hover transition-colors">
//                             Register here
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, authStart, authFailure, selectCurrentSchoolId } from '../store/authSlice';

const LoginPage = () => {
    const { schoolCode } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const school_id = useSelector(selectCurrentSchoolId) || schoolCode;

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [localError, setLocalError] = useState('');
    const { isLoading } = useSelector(state => state.auth || { isLoading: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        dispatch(authStart());

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password, school_id })
            });
            const data = await response.json();
            if (data.success) {
                dispatch(setCredentials({ user: data.user, token: data.token, school_id: data.user.school_id }));
                navigate(`/dashboard/${data.user.role.toLowerCase()}`);
            } else {
                setLocalError(data.message || 'Login failed');
                dispatch(authFailure(data.message));
            }
        } catch (err) {
            setLocalError('Network error connecting to login service.');
            dispatch(authFailure('Network error'));
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            fontFamily: '"Sora", "Poppins", sans-serif',
            background: '#0a0e23',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
                * { box-sizing: border-box; }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                .login-input:focus {
                    outline: none;
                    border-color: #63b3ed !important;
                    box-shadow: 0 0 0 3px rgba(99,179,237,0.15) !important;
                }
                .login-input::placeholder { color: rgba(255,255,255,0.3); }
                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(59,130,246,0.5) !important;
                }
                .submit-btn:active:not(:disabled) { transform: translateY(0); }
                .back-link:hover { color: #63b3ed !important; }
            `}</style>

            {/* Navbar */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                background: 'rgba(10,14,35,0.9)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(99,179,237,0.1)',
                padding: '0 2rem',
            }}>
                <div style={{
                    maxWidth: '1200px', margin: '0 auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    height: '64px',
                }}>
                    <Link to="/" style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        textDecoration: 'none',
                    }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '8px',
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '16px', fontWeight: '900', color: 'white',
                        }}>E</div>
                        <span style={{
                            fontSize: '1.2rem', fontWeight: '800', color: 'white',
                            letterSpacing: '-0.3px',
                        }}>EduManager</span>
                    </Link>

                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        {['Home', 'About Us', 'Contact Us'].map(link => (
                            <Link key={link} to="/" style={{
                                color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                                fontSize: '0.85rem', fontWeight: '500',
                                transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => e.target.style.color = 'white'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                            >{link}</Link>
                        ))}
                        <Link
                            to={`/school/${schoolCode}/register`}
                            style={{
                                padding: '7px 18px',
                                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                borderRadius: '8px', color: 'white',
                                textDecoration: 'none', fontSize: '0.85rem',
                                fontWeight: '600',
                            }}
                        >Register</Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '5rem 1.5rem 3rem',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Background Orbs */}
                <div style={{
                    position: 'absolute', top: '20%', left: '15%',
                    width: '350px', height: '350px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
                    animation: 'pulse 4s ease-in-out infinite',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: '15%', right: '12%',
                    width: '280px', height: '280px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
                    animation: 'pulse 5s 1s ease-in-out infinite',
                    pointerEvents: 'none',
                }} />

                <div style={{
                    width: '100%', maxWidth: '440px',
                    animation: 'fadeInUp 0.6s ease both',
                }}>
                    {/* Back link */}
                    <Link to="/" className="back-link" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                        fontSize: '0.82rem', fontWeight: '500',
                        marginBottom: '2rem', transition: 'color 0.2s',
                    }}>
                        ← Back to Home
                    </Link>

                    {/* Card */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '22px', padding: '2.8rem',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                    }}>
                        {/* School badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'rgba(59,130,246,0.12)',
                            border: '1px solid rgba(59,130,246,0.25)',
                            borderRadius: '100px', padding: '5px 14px',
                            marginBottom: '1.5rem',
                        }}>
                            <span style={{ fontSize: '0.7rem' }}>🏫</span>
                            <span style={{
                                color: '#93c5fd', fontSize: '0.75rem',
                                fontWeight: '700', textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                            }}>
                                {schoolCode}
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: '1.8rem', fontWeight: '900', color: 'white',
                            marginBottom: '0.4rem', letterSpacing: '-0.5px',
                        }}>Welcome Back</h1>
                        <p style={{
                            color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem',
                            marginBottom: '2rem', lineHeight: '1.5',
                        }}>
                            Sign in to access your dashboard
                        </p>

                        <form onSubmit={handleSubmit}>
                            {localError && (
                                <div style={{
                                    background: 'rgba(239,68,68,0.12)',
                                    border: '1px solid rgba(239,68,68,0.3)',
                                    borderRadius: '10px', padding: '11px 14px',
                                    color: '#fca5a5', fontSize: '0.83rem',
                                    marginBottom: '1.2rem', fontWeight: '500',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                }}>
                                    <span>⚠️</span> {localError}
                                </div>
                            )}

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block', color: 'rgba(255,255,255,0.55)',
                                    fontSize: '0.73rem', fontWeight: '700',
                                    textTransform: 'uppercase', letterSpacing: '0.08em',
                                    marginBottom: '8px',
                                }}>Email Address</label>
                                <input
                                    id="email" name="email" type="email" required
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="login-input"
                                    style={{
                                        width: '100%', padding: '13px 16px',
                                        background: 'rgba(255,255,255,0.07)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        borderRadius: '11px', color: 'white',
                                        fontSize: '0.92rem', fontFamily: '"Sora", sans-serif',
                                        transition: 'all 0.2s',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.8rem' }}>
                                <label style={{
                                    display: 'block', color: 'rgba(255,255,255,0.55)',
                                    fontSize: '0.73rem', fontWeight: '700',
                                    textTransform: 'uppercase', letterSpacing: '0.08em',
                                    marginBottom: '8px',
                                }}>Password</label>
                                <input
                                    id="password" name="password" type="password" required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="login-input"
                                    style={{
                                        width: '100%', padding: '13px 16px',
                                        background: 'rgba(255,255,255,0.07)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        borderRadius: '11px', color: 'white',
                                        fontSize: '0.92rem', fontFamily: '"Sora", sans-serif',
                                        transition: 'all 0.2s',
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="submit-btn"
                                style={{
                                    width: '100%', padding: '14px',
                                    background: isLoading
                                        ? 'rgba(59,130,246,0.4)'
                                        : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                    border: 'none', borderRadius: '11px',
                                    color: 'white', fontSize: '0.97rem',
                                    fontWeight: '700', cursor: isLoading ? 'not-allowed' : 'pointer',
                                    fontFamily: '"Sora", sans-serif',
                                    boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
                                    transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {isLoading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <span style={{
                                            width: '16px', height: '16px',
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            borderTop: '2px solid white',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            animation: 'spin 0.7s linear infinite',
                                        }} />
                                        Signing in...
                                    </span>
                                ) : 'Sign In →'}
                            </button>

                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        </form>

                        <div style={{
                            marginTop: '1.8rem', paddingTop: '1.5rem',
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            textAlign: 'center',
                        }}>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                                Don't have an account?{' '}
                            </span>
                            <Link
                                to={`/school/${schoolCode}/register`}
                                style={{
                                    color: '#63b3ed', fontSize: '0.85rem',
                                    fontWeight: '600', textDecoration: 'none',
                                    borderBottom: '1px solid transparent',
                                    transition: 'border-color 0.2s',
                                }}
                                onMouseEnter={e => e.target.style.borderColor = '#63b3ed'}
                                onMouseLeave={e => e.target.style.borderColor = 'transparent'}
                            >
                                Register here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Minimal footer */}
            <div style={{
                textAlign: 'center', padding: '1.5rem',
                color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
                © 2025 EduManager. All rights reserved.
            </div>
        </div>
    );
};

export default LoginPage;