import { useEffect, useState } from 'react';
import { FiSave, FiXCircle } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { updateUserProfile } from '../../api/user';
import { getActiveCourses, getActiveSemesters } from '../../api/auth';

import InputBox from '../Common/InputBox';
import SelectBox from '../Common/SelectBox';

export default function EditProfilePage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobNo: '',
        courseId: '',
        semesterId: ''
    });

    const [initialData, setInitialData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const userInfo = {
                firstName: decoded.firstName || '',
                lastName: decoded.lastName || '',
                email: decoded.sub || '',
                mobNo: decoded.mobNo || '',
                courseId: decoded.courseId || '',
                semesterId: decoded.semesterId || ''
            };

            setFormData(userInfo);
            setInitialData(userInfo);

            getActiveCourses()
                .then(res => setCourses(res.data.data || []))
                .catch(err => console.error(err));

            if (decoded.courseId) {
                getActiveSemesters(decoded.courseId)
                    .then(res => setSemesters(res.data.data || []))
                    .catch(err => console.error(err));
            }
        }
    }, []);

    useEffect(() => {
        if (formData.courseId) {
            getActiveSemesters(formData.courseId)
                .then(res => setSemesters(res.data.data || []))
                .catch(err => console.error(err));
        } else {
            setSemesters([]);
        }
    }, [formData.courseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await updateUserProfile(formData);
            const data = response.data.data;

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            toast.success(data.message || 'Profile updated successfully', {
                onClose: () => navigate('/dashboard/profile'),
                autoClose: 1500,
            });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData(initialData);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 mt-6 dark:bg-slate-950 shadow-lg rounded-lg border border-indigo-200 dark:border-indigo-700">
            <h2 className="font-semibold text-3xl text-center text-gray-800 dark:text-white">Edit Profile</h2>
            <div className='h-[2px] w-60 bg-indigo-600 mx-auto mt-1 mb-10'></div>

            <div className="space-y-6">
                <InputBox
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />

                <InputBox
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />

                <InputBox
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                />

                <InputBox
                    name="mobNo"
                    placeholder="Mobile Number"
                    value={formData.mobNo}
                    onChange={handleChange}
                    required
                />

                <SelectBox
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    options={courses}
                    placeholder="Select Course"
                    required
                />

                <SelectBox
                    name="semesterId"
                    value={formData.semesterId}
                    onChange={handleChange}
                    options={semesters}
                    placeholder="Select Semester"
                    required
                />

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={`flex items-center gap-2 px-5 py-2 text-white rounded transition ${loading
                            ? 'bg-indigo-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <FiSave /> Save Changes
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="flex items-center gap-2 px-5 py-2 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-800 dark:text-white rounded transition"
                    >
                        <FiXCircle /> Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
