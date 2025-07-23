import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiUploadCloud } from 'react-icons/fi';
import SelectBox from '../Common/SelectBox';
import InputBox from '../Common/InputBox';
import {
    getActiveCourses,
    getActiveSemesters,
} from '../../api/auth';
import { getActiveSubjects, updateNote } from '../../api/admin';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export default function NotesUploadForm({ editNote, clearEdit, onUpload }) {
    const [formData, setFormData] = useState({
        id: null,
        subject: '',
        title: '',
        description: '',
        file: null,
    });

    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (editNote) {
            setFormData({
                ...editNote,
                file: null, // Don't populate file
            });
        }
    }, [editNote]);

    const validateFile = (file) => {
        if (!file) return false;
        if (file.size > MAX_FILE_SIZE) {
            toast.error('File size must be less than 20MB.');
            return false;
        }
        return true;
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await getActiveCourses();
                setCourses(res.data.data || []);
            } catch {
                toast.error('Failed to load courses.');
            }
        })();
    }, []);

    useEffect(() => {
        if (!formData.course) return;
        (async () => {
            try {
                const res = await getActiveSemesters(formData.course);
                setSemesters(res.data.data || []);
            } catch {
                toast.error('Failed to load semesters.');
            }
        })();
    }, [formData.course]);

    useEffect(() => {
        if (!formData.semester) return;
        (async () => {
            try {
                const res = await getActiveSubjects(formData.semester);
                setSubjects(res.data.data || []);
            } catch {
                toast.error('Failed to load subjects.');
            }
        })();
    }, [formData.semester]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (validateFile(file)) {
            setFormData((prev) => ({ ...prev, file }));
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && validateFile(file)) {
            setFormData((prev) => ({ ...prev, file }));
        }
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file) return toast.error('Please upload a file.');

        const notesPayload = {
            id: formData.id,
            title: formData.title,
            description: formData.description,
            subject: {
                id: formData.subject
            }
        };


        const payload = new FormData();
        payload.append('notes', JSON.stringify(notesPayload));
        payload.append('file', formData.file);

        try {
            setIsUploading(true);

            if (formData.id) {
                await updateNote(payload);
                toast.success('Note updated successfully');
            } else {
                await onUpload(payload);
                toast.success('Note uploaded successfully');
            }

            setFormData({
                course: '',
                semester: '',
                subject: '',
                title: '',
                description: '',
                file: null,
            });
            setSemesters([]);
            setSubjects([]);
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload note');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className='flex-col justify-center items-center'>
            {/* Upload Form Section */}
            <div className='max-w-5xl w-full mb-4 mx-auto p-6 rounded-xl border dark:border-slate-700 dark:bg-slate-950 shadow-lg space-y-10'>
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
                    {formData.id ? 'Edit Note' : 'Upload New Note'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <InputBox
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Note Title"
                        required
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Short description..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 resize-none"
                    />

                    <div
                        className={`w-full border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10' : 'border-gray-300 dark:border-gray-600'
                            } text-gray-600 dark:text-gray-300`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <label htmlFor="file" className="flex flex-col items-center cursor-pointer">
                            <FiUploadCloud className="text-4xl mb-1" />
                            <span className="font-medium">
                                {formData.file
                                    ? `${formData.file.name} (${(formData.file.size / (1024 * 1024)).toFixed(2)} MB)`
                                    : 'Click or drag file here to upload (PDF, DOCX, Images - Max size 20MB)'}
                            </span>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleFileChange}
                                accept=".pdf"
                                className="hidden"
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isUploading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg w-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? (formData.id ? 'Updating...' : 'Uploading...') : (formData.id ? 'Update Note' : 'Upload Note')}
                    </button>
                    {formData.id && (
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    id: null,
                                    course: '',
                                    semester: '',
                                    subject: '',
                                    title: '',
                                    description: '',
                                    file: null,
                                });
                                clearEdit();
                            }}
                            className="mt-2 w-full flex justify-center items-center text-sm text-gray-600 hover:text-indigo-600 underline"
                        >
                            Cancel Edit
                        </button>
                    )}

                </form>
            </div>
        </div>
    );

}
