import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SelectBox from '../Common/SelectBox';
import { getActiveCourses, getActiveSemesters } from '../../api/auth';
import { deleteNoteById, getActiveSubjects } from '../../api/admin';
import { getAllNotesBySubject } from '../../api/note';
import Swal from 'sweetalert2';

export default function AdminNote({ onEdit }) {
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [formData, setFormData] = useState({
        course: '',
        semester: '',
        subject: '',
    });

    const handleEditNote = (note) => {
        const editData = {
            id: note.id,
            title: note.title,
            description: note.description,
            course: note.subject?.semester?.course?.id,
            semester: note.subject?.semester?.id,
            subject: note.subject?.id,
            file: null,
        };
        onEdit(editData); // Call parent prop to update NotesUploadForm
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await getActiveCourses();
                setCourses(res.data.data || []);
            } catch {
                toast.error('Failed to load courses');
            }
        })();
    }, []);

    useEffect(() => {
        if (!formData.course) {
            setSemesters([]);
            return;
        }

        (async () => {
            try {
                const res = await getActiveSemesters(formData.course);
                setSemesters(res.data.data || []);
            } catch {
                toast.error('Failed to load semesters');
            }
        })();
    }, [formData.course]);

    useEffect(() => {
        if (!formData.semester) {
            setSubjects([]);
            return;
        }

        (async () => {
            try {
                const res = await getActiveSubjects(formData.semester);
                setSubjects(res.data.data || []);
            } catch {
                toast.error('Failed to load subjects');
            }
        })();
    }, [formData.semester]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === 'course' && { semester: '', subject: '' }),
            ...(name === 'semester' && { subject: '' }),
        }));
        if (name === 'subject') {
            // Scroll to table on subject selection
            setTimeout(() => {
                document.getElementById('notes-table')?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    const fetchNotes = async () => {
        try {
            if (formData.subject) {
                setIsFetching(true);
                const res = await getAllNotesBySubject(formData.subject);
                setNotes(res.data.data.notes || []);
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to load notes.');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [formData.subject]);

    const handleDeleteNote = async (id) => {
        const result = await Swal.fire({
            title: 'Delete this note?',
            text: 'This action is irreversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await deleteNoteById(id);
                toast.success('Note deleted');
                fetchNotes();
            } catch (err) {
                toast.error(err?.response?.data?.message || 'Failed to delete note');
            }
        }
    };

    return (

        <div id="notes-table" className="w-full max-w-5xl mx-auto p-6 rounded-xl border dark:border-slate-700 dark:bg-slate-950 shadow-lg space-y-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                View Notes by Subject
            </h2>
            <div className="h-[2px] w-32 bg-indigo-600 mx-auto mb-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <SelectBox
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    options={subjects}
                    placeholder="Select Subject"
                    required
                />
            </div>

            {isFetching ? (
                <div className="text-center py-10 text-indigo-600 dark:text-indigo-400">
                    <svg className="animate-spin h-8 w-8 mx-auto mb-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Loading notes...
                </div>
            ) : (
                <div className="overflow-x-auto shadow-lg border rounded-lg border-indigo-200 dark:border-indigo-700">
                    <table className="w-full border-collapse rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">
                                <th className="p-3 border">ID</th>
                                <th className="p-3 border">Title</th>
                                <th className="p-3 border">Description</th>
                                <th className="p-3 border">Subject</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note) => (
                                <tr key={note.id} className="text-center dark:text-gray-300">
                                    <td className="p-2 border">{note.id}</td>
                                    <td className="p-2 border">{note.title}</td>
                                    <td className="p-2 border">{note.description}</td>
                                    <td className="p-2 border">{note.subject.name}</td>
                                    <td className="p-2 border space-x-2">
                                        <button
                                            onClick={() => handleEditNote(note)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm py-1 px-3 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {notes.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                        No notes found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
