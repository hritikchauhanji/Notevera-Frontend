import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CheckEmailPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 dark:bg-slate-950">
            <FiMail className="text-6xl text-indigo-600 mb-4" />
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">
                Please Verify Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
                A verification link has been sent to your email. Please check your inbox (and spam folder) and verify your account to continue.After verification, you can log in to your account.
            </p>
            <Link to="/auth/login" className="mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Login
            </Link>
        </div>
    );
}
