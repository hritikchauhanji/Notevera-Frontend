import { useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiEdit2 } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            // console.log('Decoded JWT:', decoded);
            setUser({
                name: decoded.firstName + ' ' + decoded.lastName,
                email: decoded.sub,
                mobNo: decoded.mobNo,
                role: decoded.roles?.[0] || 'USER',
                course: decoded.course?.name || 'N/A',
                semester: decoded.semester?.name || 'N/A',
                isActive: decoded.status
            });
        }
    }, []);

    if (!user) return <p className="text-center text-gray-500 dark:text-gray-300">Loading profile...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 dark:bg-slate-950 shadow-lg rounded-lg border border-indigo-200 dark:border-indigo-700">
            <h2 className="font-semibold text-3xl text-center text-gray-800 dark:text-white">My Profile</h2>
            <div className='h-[2px] w-60 bg-indigo-600 mx-auto mt-1 mb-10'></div>

            <div className="space-y-7">
                <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                    <FiUser className="text-4xl" />
                    <span className='text-2xl'>{user.name}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                    <FiMail className="text-4xl" />
                    <span className='text-2xl'>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                    <FiPhone className="text-4xl" />
                    <span className='text-2xl'>{user.mobNo || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                    <span className="text-2xl font-semibold">Course:</span>
                    <span className="uppercase text-xl px-2 py-1 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-white">
                        {user.course}
                    </span>
                </div>

                <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                    <span className="text-2xl font-semibold">Semester:</span>
                    <span className="uppercase text-xl px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white">
                        {user.semester}
                    </span>
                </div>

                <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                    <span className="text-2xl font-semibold">Role:</span>
                    <span className="uppercase text-xl px-2 py-1 rounded bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-white">
                        {user.role}
                    </span>
                </div>

                <div className="flex justify-between items-center gap-3 text-gray-800 dark:text-white">
                    <div>

                        <span className="text-2xl font-semibold">Account Status: </span>
                        <span className={`text-xl px-2 py-1 rounded ${user.isActive ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-white' : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-white'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div>
                        <Link to="/dashboard/profile/edit" className="flex items-center gap-2 bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 hover:text-white  dark:hover:bg-indigo-800">
                            <FiEdit2 /> Edit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
