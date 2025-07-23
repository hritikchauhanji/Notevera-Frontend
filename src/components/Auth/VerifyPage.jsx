import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyAccount } from '../../api/home'; // Import the function

export default function VerifyPage() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('Verifying...');
    const navigate = useNavigate();

    useEffect(() => {
        const uid = searchParams.get('uid');
        const code = searchParams.get('code');

        const verify = async () => {
            try {
                await verifyAccount(uid, code);
                setStatus('Verification successful! Redirecting to login...');
                toast.success('Account verified successfully!', {
                    onClose: () => navigate('/auth/login'),
                    autoClose: 1500
                });
            } catch (error) {
                setStatus('Invalid or expired verification link.');
                toast.error(error.response?.data?.message || 'Verification failed!', {
                    onClose: () => navigate('/auth/login'),
                    autoClose: 1500
                });
            }
        };

        if (uid && code) verify();
        else setStatus('Invalid verification link.');
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-slate-950">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Email Verification</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{status}</p>
            </div>
        </div>
    );
}
