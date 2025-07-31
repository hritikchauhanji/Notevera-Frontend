import { useEffect, useState } from 'react';
import { getAllNotesAdminBySubject } from '../../api/note';
import { summarizeNote } from '../../api/ai';
import { FiArrowLeft, FiEye, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NotesList({ subject, onBack }) {
    const [notes, setNotes] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [loadingIds, setLoadingIds] = useState([]);
    const [summaries, setSummaries] = useState({});

    useEffect(() => {
        (async () => {
            setIsFetching(true);
            try {
                const res = await getAllNotesAdminBySubject(subject.id);
                setNotes(res.data.data?.notes || []);
            } catch (err) {
                console.error("Failed to fetch notes:", err);
            } finally {
                setIsFetching(false);
            }
        })();
    }, [subject]);

    const handleSummarize = async (noteId) => {
        try {
            setLoadingIds(prev => [...prev, noteId]);
            const res = await summarizeNote(noteId);
            setSummaries(prev => ({
                ...prev,
                [noteId]: res,
            }));
        } catch (err) {
            console.error(err);
            toast.error("Failed to summarize note.");
        } finally {
            setLoadingIds(prev => prev.filter(id => id !== noteId));
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4">
            <button
                onClick={onBack}
                className="mb-4 flex items-center text-sm text-indigo-600 hover:underline"
            >
                <FiArrowLeft className="mr-1" /> Back to Subjects
            </button>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Notes for <span className="text-indigo-600">{subject.name}</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Below are the notes shared by the admin for this subject.
                </p>
            </div>

            {isFetching ? (
                <div className="flex items-center justify-center h-80 text-indigo-600 dark:text-indigo-400">
                    <div className="text-center">
                        <svg className="animate-spin h-8 w-8 mx-auto mb-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <p>Loading Notes...</p>
                    </div>
                </div>
            ) : notes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="flex flex-col justify-between h-full dark:bg-slate-800 shadow-md border border-gray-200 dark:border-slate-700 rounded-lg p-5 hover:shadow-lg transition"
                        >
                            <div>
                                <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-1">
                                    {note.title || 'Untitled Note'}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                    {note.description || 'No description provided.'}
                                </p>
                                {note.createdByFirstName && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                                        <FiUser className="text-base" />
                                        Created by: {note.createdByFirstName} {note.createdByLastName}
                                    </p>
                                )}


                            </div>

                            <Link
                                to={`/dashboard/notes/${note.id}`}
                                className="mt-4 inline-flex items-center justify-center text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition w-full"
                            >
                                <FiEye className="mr-2" />
                                View Note
                            </Link>

                            {/* 👇 Moved summarize button below view note */}
                            <button
                                onClick={() => handleSummarize(note.id)}
                                disabled={loadingIds.includes(note.id)}
                                className="mt-2 text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition w-full"
                            >
                                {loadingIds.includes(note.id) ? 'Summarizing...' : 'Summarize by AI Agent'}
                            </button>

                            {/* 👇 Show AI summary */}
                            {summaries[note.id] && (
                                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow border border-indigo-300 dark:border-indigo-700">
                                    <h4 className="text-base font-bold text-indigo-700 dark:text-indigo-400 mb-2">AI Summary</h4>
                                    <div
                                        className="prose prose-sm max-w-none dark:prose-invert"
                                        dangerouslySetInnerHTML={{ __html: summaries[note.id] }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    No notes available for this subject.
                </p>
            )}
        </div>
    );
}
