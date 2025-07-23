import { useState } from 'react';
import InputBox from '../Common/InputBox';
import { sendResetEmail } from '../../api/auth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendResetEmail(email);
            toast.success('Password reset link sent to your email');
            setEmail('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send email');
        } finally {
            setLoading(false);
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
                        Forgot Your Password?
                    </h2>

                    <InputBox
                        type="email"
                        name="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 w-full transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? (
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
                                Sending...
                            </>
                        ) : (
                            'Send Reset Link'
                        )}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Remember your password?{' '}
                            <Link
                                to="/auth/login"
                                className="inline-block font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}
