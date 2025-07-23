import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    FiHome, FiSettings, FiUser, FiFileText, FiLogOut, FiSend, FiMenu, FiX,
    FiUpload, FiPlusSquare
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { logoutUser } from '../../api/auth';
import { getUserRoles } from '../../utils/auth'

export default function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const roles = getUserRoles();
    const isAdmin = roles.includes('ADMIN');


    const logout = () => {
        logoutUser();
        toast.success('Logged out successfully', {
            onClose: () => navigate('/auth/login'),
            autoClose: 1500
        });
    };

    const navItems = [
        { to: '/dashboard/', icon: <FiHome />, label: 'Home', exact: true },
        { to: '/dashboard/profile', icon: <FiUser />, label: 'Profile' },
        ...(!isAdmin ? [{ to: '/dashboard/view-notes', icon: <FiFileText />, label: 'Notes' }] : []),
        ...(isAdmin ? [
            { to: '/dashboard/admin-notes', icon: <FiFileText />, label: 'Manage Notes' },
            { to: '/dashboard/course-create', icon: <FiPlusSquare />, label: 'Add Course' },
            { to: '/dashboard/semester-create', icon: <FiPlusSquare />, label: 'Add Semester' },
            { to: '/dashboard/subject-create', icon: <FiPlusSquare />, label: 'Add Subject' },
        ] : []),
        { to: '/dashboard/settings/change-password', icon: <FiSettings />, label: 'Settings' }
    ];

    // ✅ Detect if current path is note viewer
    const isNoteViewer = location.pathname.startsWith('/dashboard/notes/');

    return (
        <div className={`min-h-screen dark:bg-slate-950 flex flex-col md:flex-row ${isNoteViewer ? '' : 'pt-14'}`}>
            {/* Top bar for mobile */}
            {!isNoteViewer && (
                <div className="md:hidden p-4 flex justify-between items-center dark:bg-slate-950">
                    <button onClick={() => setSidebarOpen(true)}>
                        <FiMenu className="text-2xl text-gray-800 dark:text-white" />
                    </button>
                </div>
            )}

            {/* Sidebar */}
            {!isNoteViewer && (
                <aside
                    className={`fixed min-h-screen z-40 transition-transform transform md:translate-x-0 w-64 dark:bg-slate-950 p-6 shadow-indigoShadow h-full
                        ${sidebarOpen ? 'translate-x-0 bg-white' : '-translate-x-full'}
                    `}
                >
                    {/* Close button for mobile */}
                    <div className="md:hidden flex justify-end mb-4">
                        <button onClick={() => setSidebarOpen(false)}>
                            <FiX className="text-2xl text-gray-800 dark:text-white" />
                        </button>
                    </div>

                    <nav className="space-y-6">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.to}
                                end={item.exact}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-2 text-xl rounded transition hover:bg-indigo-200 dark:hover:bg-indigo-800 ${isActive
                                        ? 'bg-indigo-300 dark:bg-indigo-700 text-white'
                                        : 'text-gray-700 dark:text-gray-300'
                                    }`
                                }
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        ))}
                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-3 text-xl p-2 text-red-600 rounded hover:bg-red-100 dark:hover:bg-red-300 transition"
                        >
                            <FiLogOut /> Logout
                        </button>
                    </nav>
                </aside>
            )}

            {/* Main content */}
            <main className={`${isNoteViewer ? '' : 'md:ml-[264px] md:m-2 sm:mt-0 sm:mx-2'} flex-1 `}>
                <Outlet />
            </main>
        </div>
    );
}
