import { useEffect, useState } from 'react';
import { getActiveSubjects } from '../../api/admin';
import { FiArrowLeft, FiBookOpen } from 'react-icons/fi';
import NotesList from './NotesList';
import { getUserRoles } from '../../utils/auth';
import AdminNote from './AdminNote';

export default function SubjectList() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const userSemesterId = user?.semester?.id;


    const roles = getUserRoles();
    const isAdmin = roles.includes('ADMIN');

    useEffect(() => {
        (async () => {
            try {
                if (!userSemesterId) return;
                setIsFetching(true);
                const res = await getActiveSubjects(userSemesterId);
                setSubjects(res.data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsFetching(false);
            }
        })();
    }, [userSemesterId]);

    if (selectedSubject) {
        return (
            <NotesList
                subject={selectedSubject}
                onBack={() => setSelectedSubject(null)}
            />
        );
    }

    if (isAdmin) {
        return (
            <>
                <AdminNote />
            </>
        )
    } else {
        return (
            <div className="max-w-5xl mx-auto px-4 space-y-8 sm:mb-4 md:mb-0">
                {/* {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center text-sm text-indigo-600 hover:underline"
                >
                    <FiArrowLeft className="mr-1" /> Back
                </button>
            )} */}

                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Select a Subject to View Notes
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Browse available subjects based on your semester. Click on a subject to explore all admin-shared notes uploaded for you.
                    </p>
                </div>

                {isFetching ? (
                    <div className="flex items-center justify-center h-96 text-indigo-600 dark:text-indigo-400">
                        <div className="text-center">
                            <svg className="animate-spin h-8 w-8 mx-auto mb-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            <p>Loading Subjects...</p>
                        </div>
                    </div>
                ) : subjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">
                        {subjects.map((subject) => (
                            <div
                                key={subject.id}
                                onClick={() => setSelectedSubject(subject)}
                                className="cursor-pointer h-full p-6 min-h-[220px] min-w-[240px] rounded-xl shadow-lg border dark:border-none dark:bg-slate-800 hover:shadow-xl transition flex flex-col justify-between"
                            >
                                {/* Icon and Title */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-4xl text-indigo-600">
                                        <FiBookOpen />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        {subject.name}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                                    {subject.description || 'This subject currently has no description.'}
                                </p>

                                {/* Footer */}
                                <div className="mt-6 text-right">
                                    <p className="text-sm text-indigo-600 font-medium">
                                        Click to view notes →
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No subjects found for your semester.
                    </p>
                )}
            </div>
        );
    }
}
