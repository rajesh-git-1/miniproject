import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentSchoolId } from '../store/authSlice';

const RegisterPage = () => {
    const { schoolCode } = useParams();
    // Using global school_id or falling back to param
    const school_id = useSelector(selectCurrentSchoolId) || schoolCode;

    const [formData, setFormData] = useState({
        role: 'Student', // Default
        name: '', email: '', password: '', profilePhotoUrl: '',

        // Student specifics
        rollNo: '', fatherName: '', motherName: '', dob: '', gender: '',
        className: '', section: '', admissionDate: '', mobile: '', address: '',

        // Teacher specifics
        teacherId: '', qualification: '', department: '', experience: '',
        joiningDate: '', salary: '', username: '',

        // Admin specifics
        adminId: '', position: '', accessLevel: '',

        // Principal specifics
        principalId: '', officeContact: '', officeAddress: ''
    });

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePhotoUrl: `https://fakeupload.com/photos/${file.name}` });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        // Core payload shared across all roles
        const payload = {
            school_id,
            role: formData.role,
            name: formData.name,
            email: formData.email,
            password: formData.password,
            profilePhotoUrl: formData.profilePhotoUrl,
        };

        // Attach specific fields based on the selected role
        if (formData.role === 'Student') {
            Object.assign(payload, {
                rollNo: formData.rollNo, fatherName: formData.fatherName, motherName: formData.motherName,
                dob: formData.dob, gender: formData.gender, standard: formData.className, // Mapping className to standard
                section: formData.section, admissionDate: formData.admissionDate, mobile: formData.mobile, address: formData.address
            });
        } else if (formData.role === 'Teacher') {
            Object.assign(payload, {
                teacherId: formData.teacherId, qualification: formData.qualification, designation: formData.department, // Mapping dept to designation
                experience: formData.experience, joiningDate: formData.joiningDate, mobile: formData.mobile, address: formData.address,
                salary: Number(formData.salary) || undefined, username: formData.username
            });
        } else if (formData.role === 'Admin') {
            Object.assign(payload, {
                adminId: formData.adminId, designation: formData.position, mobile: formData.mobile,
                username: formData.username, accessLevel: formData.accessLevel
            });
        } else if (formData.role === 'Principal') {
            Object.assign(payload, {
                principalId: formData.principalId, qualification: formData.qualification, experience: formData.experience,
                joiningDate: formData.joiningDate, officeContact: formData.officeContact, username: formData.username, officeAddress: formData.officeAddress
            });
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success || response.ok) {
                setSuccessMsg('Registration submitted successfully. Awaiting Admin approval.');
                // Scroll to top to see success message
                window.scrollTo(0, 0);
            } else {
                setErrorMsg(data.message || 'Registration failed');
            }
        } catch (err) {
            setErrorMsg('Server connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Helper to render the common input style
    const renderInput = (name, placeholder, type = "text", required = false) => (
        <div className="form-group">
            <label className="form-label" htmlFor={name}>{placeholder} {required && '*'}</label>
            <input
                type={type} name={name} value={formData[name] || ''} onChange={handleChange} required={required}
                className="form-input"
                placeholder={`Enter ${placeholder}`}
            />
        </div>
    );

    // Render Role-Specific Fields
    const renderDynamicFields = () => {
        switch (formData.role) {
            case 'Student':
                return (
                    <>
                        {renderInput('rollNo', 'Student ID / Roll No', 'text', true)}
                        {renderInput('fatherName', 'Father Name')}
                        {renderInput('motherName', 'Mother Name')}
                        {renderInput('dob', 'Date of Birth', 'date', true)}
                        <div className="form-group">
                            <label className="form-label">Gender *</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} required className="form-input">
                                <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
                            </select>
                        </div>
                        {renderInput('className', 'Class', 'text', true)}
                        {renderInput('section', 'Section')}
                        {renderInput('admissionDate', 'Admission Date', 'date')}
                        {renderInput('mobile', 'Mobile Number')}
                        {renderInput('address', 'Address')}
                    </>
                );
            case 'Teacher':
                return (
                    <>
                        {renderInput('teacherId', 'Teacher ID', 'text', true)}
                        {renderInput('qualification', 'Qualification')}
                        {renderInput('department', 'Subject / Department', 'text', true)}
                        {renderInput('experience', 'Experience (Years)', 'number')}
                        {renderInput('joiningDate', 'Date of Joining', 'date')}
                        {renderInput('mobile', 'Mobile Number')}
                        {renderInput('address', 'Address')}
                        {renderInput('salary', 'Salary (Optional)', 'number')}
                        {renderInput('username', 'Username', 'text', true)}
                    </>
                );
            case 'Admin':
                return (
                    <>
                        {renderInput('adminId', 'Admin ID', 'text', true)}
                        {renderInput('position', 'Role / Position')}
                        {renderInput('mobile', 'Mobile No.')}
                        {renderInput('username', 'Username', 'text', true)}
                        <div className="sm:col-span-2 form-group">
                            <label className="form-label">Access Level *</label>
                            <select name="accessLevel" value={formData.accessLevel} onChange={handleChange} required className="form-input">
                                <option value="">Select Access Level</option><option value="Super Admin">Super Admin</option><option value="Staff Admin">Staff Admin</option>
                            </select>
                        </div>
                    </>
                );
            case 'Principal':
                return (
                    <>
                        {renderInput('principalId', 'Principal ID', 'text', true)}
                        {renderInput('qualification', 'Qualification')}
                        {renderInput('experience', 'Experience (Years)')}
                        {renderInput('joiningDate', 'Date of Joining', 'date')}
                        {renderInput('officeContact', 'Office Contact No.')}
                        {renderInput('username', 'Username', 'text', true)}
                        <div className="sm:col-span-2">{renderInput('officeAddress', 'Office Address')}</div>
                    </>
                );
            default:
                return null;
        }
    };

    if (successMsg) {
        return (
            <div className="app-layout items-center justify-center p-4">
                <div className="card w-full max-w-md text-center space-y-6 border-green-100">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
                    <p className="text-gray-600">{successMsg}</p>
                    <div className="pt-4">
                        {/* <Link to={`/school/${schoolCode}/login`} className="btn btn-primary">
                            Return to Login
                        </Link> */}
                        <Link to="/" className="btn btn-primary">
    Return to Home
</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-layout items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="card w-full max-w-3xl space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {/* For portal: <span className="font-semibold text-primary uppercase">{schoolCode}</span> */}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {errorMsg && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-700">
                            {errorMsg}
                        </div>
                    )}

                    {/* CORE FIELDS */}
                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2 form-group">
                                <label className="form-label" htmlFor="role">Sign Up As *</label>
                                <select name="role" required value={formData.role} onChange={handleChange} className="form-input">
                                    <option value="Student">Student</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Principal">Principal</option>
                                </select>
                            </div>

                            {renderInput('name', 'Full Name', 'text', true)}
                            {renderInput('email', 'Email Address', 'email', true)}
                            {renderInput('password', 'Password', 'password', true)}

                            <div className="sm:col-span-2 mt-2 form-group">
                                <label className="form-label" htmlFor="profilePhoto">Profile Photo</label>
                                <input type="file" name="profilePhoto" onChange={handleFileChange} accept="image/*"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* DYNAMIC ROLE FIELDS */}
                    <div className="pt-2">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">{formData.role} Details</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {renderDynamicFields()}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button type="submit" disabled={loading} className={`btn btn-primary w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                            {loading ? 'Submitting...' : `Register as ${formData.role}`}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/" className="btn btn-primary">
    Return to Home
</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;