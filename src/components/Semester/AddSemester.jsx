import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import InputBox from '../Common/InputBox';
import SelectBox from '../Common/SelectBox';
import { createSemester, deleteSemesterById, getAllSemesters } from '../../api/semester';
import { getAllCourses } from '../../api/course';

export default function AddSemester() {
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        isActive: true,
        courseId: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [courses, setCourses] = useState([]);

    const fetchSemesters = async () => {
        try {
            setIsFetching(true);
            const res = await getAllSemesters();
            setSemesters(res.data.data || []);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to load semesters');
        } finally {
            setIsFetching(false);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await getAllCourses();
            setCourses(res.data.data || []);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to load courses');
        }
    };

    useEffect(() => {
        fetchSemesters();
        fetchCourses();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            id: formData.id,
            name: formData.name,
            isActive: formData.isActive,
            courseId: formData.courseId
            // course: {
            //     id: parseInt(formData.courseId),
            // },
        };

        try {
            await createSemester(payload);
            toast.success(formData.id ? 'Semester updated!' : 'Semester added!');
            setFormData({ id: null, name: '', isActive: true, courseId: '' });
            fetchSemesters();
        } catch (err) {
            toast.error(Object.values(err?.response?.data?.data || {})[0] || 'Failed to save semester');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (semester) => {
        setFormData({
            id: semester.id,
            name: semester.name,
            isActive: semester.isActive,
            courseId: semester.course?.id || '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            background: '#1f2937',
            color: '#fff',
        });

        if (result.isConfirmed) {
            try {
                await deleteSemesterById(id);
                toast.success('Semester deleted!');
                fetchSemesters();
            } catch (err) {
                toast.error(err?.response?.data?.message || 'Failed to delete semester');
            }
        }
    };

    return (
        <div className="min-h-screen mt-8 flex flex-col items-center justify-start dark:bg-slate-950 px-4">
            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="dark:bg-slate-950 mt-10 dark:border border border-indigo-200 dark:border-indigo-700 p-8 rounded-lg shadow-xl w-full max-w-2xl"
            >
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                        {formData.id ? 'Edit Semester' : 'Add New Semester'}
                    </h2>

                    <InputBox
                        name="name"
                        placeholder="Semester Name"
                        value={formData.name}
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

                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="accent-indigo-600"
                        />
                        Mark as Active
                    </label>

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
                                Saving...
                            </>
                        ) : (
                            formData.id ? 'Update Semester' : 'Add Semester'
                        )}
                    </button>

                    {formData.id && (
                        <button
                            type="button"
                            onClick={() => setFormData({ id: null, name: '', isActive: true, courseId: '' })}
                            className="mt-2 text-sm text-gray-600 hover:text-indigo-600 underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {/* Semester Table */}
            <div className="w-full max-w-3xl mt-10">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center">All Semesters</h3>
                <div className='h-[2px] w-32 bg-indigo-600 mx-auto mb-4'></div>

                {isFetching ? (
                    <div className="text-center py-10 text-indigo-600 dark:text-indigo-400">
                        <svg className="animate-spin h-8 w-8 mx-auto mb-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        Loading semesters...
                    </div>
                ) : (
                    <div className="overflow-x-auto shadow-lg border rounded-lg border-indigo-200 dark:border-indigo-700">
                        <table className="w-full border-collapse rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">
                                    <th className="p-3 border">ID</th>
                                    <th className="p-3 border">Name</th>
                                    <th className="p-3 border">Course</th>
                                    <th className="p-3 border">Status</th>
                                    <th className="p-3 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {semesters.map((sem) => (
                                    <tr key={sem.id} className="text-center dark:text-gray-300">
                                        <td className="p-2 border">{sem.id}</td>
                                        <td className="p-2 border">{sem.name}</td>
                                        <td className="p-2 border">{sem.course?.name || 'N/A'}</td>
                                        <td className="p-2 border">
                                            {sem.isActive ? (
                                                <span className="text-green-600 font-semibold">Active</span>
                                            ) : (
                                                <span className="text-red-500 font-semibold">Inactive</span>
                                            )}
                                        </td>
                                        <td className="p-2 border space-x-2">
                                            <button
                                                onClick={() => handleEdit(sem)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm py-1 px-3 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(sem.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {semesters.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500">
                                            No semesters found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
