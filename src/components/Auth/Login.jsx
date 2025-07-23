import { useState } from 'react';
import InputBox from '../Common/InputBox';
import { toast } from 'react-toastify';
import { loginUser } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { token, user } = await loginUser(formData);

            // Save token and user info
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // const isAdmin = user.role?.some((r) => r.name === 'ROLE_ADMIN');

            // Check if account is inactive
            if (!user.status?.isActive) {
                toast.error('Your account is inactive. Please check your email for verification.', {
                    onClose: () => navigate('/auth/check-email'),
                    autoClose: 1500
                });
                return; // Stop further execution
            }

            toast.success('Login successful!', {
                onClose: () => navigate('/dashboard'),
                autoClose: 1500
            });

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Login failed!');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-slate-950 px-4">
            <form
                onSubmit={handleSubmit}
                className="dark:bg-slate-950 dark:border-slate-700 dark:border bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl"
            >
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                        Login to Notevera
                    </h2>

                    <InputBox
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <InputBox
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
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
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                    <div className="text-right text-sm text-indigo-600 mt-1">
                        <Link to="/auth/forgot-password" className="hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Don’t have an account?{' '}
                            <Link
                                to="/auth/register"
                                className="inline-block font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>

                </div>
            </form>
        </div>
    );
}
