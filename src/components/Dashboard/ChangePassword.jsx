import { useState } from 'react';
import { toast } from 'react-toastify';
import { changePasswordApi } from '../../api/user';
import InputBox from '../Common/InputBox';

export default function ChangePasswordPage() {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        try {
            setLoading(true);
            await changePasswordApi({
                oldPassword: form.currentPassword,
                newPassword: form.newPassword,
            });

            toast.success('Password changed successfully!');
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            const errors = err?.response?.data?.data || {};
            if (typeof errors === 'object') {
                Object.values(errors).forEach((msg) => toast.error(msg));
            } else {
                toast.error(err?.response?.data?.message || 'Password update failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 dark:bg-slate-950 rounded-lg shadow-md border border-indigo-300 dark:border-indigo-700 mt-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Change Password</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputBox
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={form.currentPassword}
                    onChange={handleChange}
                    required
                />
                <InputBox
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={form.newPassword}
                    onChange={handleChange}
                    required
                />
                <InputBox
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Change Password'}
                </button>
            </form>
        </div>
    );
}
