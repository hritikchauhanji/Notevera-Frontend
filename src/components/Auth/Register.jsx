import { useState, useEffect } from 'react';
import { registerUser, getActiveCourses, getActiveSemesters } from '../../api/auth';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import InputBox from '../Common/InputBox';
import SelectBox from '../Common/SelectBox';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobNo: '',
        course: '',
        semester: '',
    });

    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const courseRes = await getActiveCourses();
                setCourses(courseRes.data.data || []);
            } catch (err) {
                toast.error(err?.response?.data?.message || 'Failed to load courses.');
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (!formData.course) return;
            try {
                const semesterRes = await getActiveSemesters(formData.course);
                setSemesters(semesterRes.data.data || []);
            } catch (err) {
                toast.error(err?.response?.data?.message || 'Failed to load semesters.');
            }
        }
        fetchData();
    }, [formData.course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            mobNo: formData.mobNo,
            courseId: parseInt(formData.course),
            // {
            //     id: parseInt(formData.course)
            // },
            semesterId: parseInt(formData.semester)
        };

        try {
            await registerUser(payload);
            toast.success('Registration successful!', {
                onClose: () => navigate('/auth/check-email'),
                autoClose: 1500
            });

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                mobNo: '',
                course: '',
                semester: '',
            });
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Registration failed!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-8 flex items-center justify-center dark:bg-slate-950 px-4">
            <form
                onSubmit={handleSubmit}
                className="dark:bg-slate-950 mt-10 dark:border-slate-700 dark:border bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl"
            >
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                        Register to Notevera
                    </h2>

                    {['firstName', 'lastName', 'email', 'password', 'mobNo'].map((field, i) => (
                        <InputBox
                            key={i}
                            type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                            name={field}
                            placeholder={field.replace(/([A-Z])/g, ' $1')}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                        />
                    ))}


                    <SelectBox
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        options={courses}
                        placeholder="Select Course"
                        required
                    />

                    <SelectBox
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        options={semesters}
                        placeholder="Select Semester"
                        required
                    />


                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 w-full transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Registering...
                            </>
                        ) : (
                            'Register'
                        )}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already registered?{' '}
                            <Link
                                to="/auth/login"
                                className="inline-block font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
                            >
                                Log in here
                            </Link>
                        </p>
                    </div>

                </div>
            </form>
        </div>
    );
}
