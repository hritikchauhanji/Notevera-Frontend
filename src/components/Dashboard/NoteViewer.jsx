import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { toast } from 'react-toastify';
import { getNoteById } from '../../api/note';
import { GiNotebook } from 'react-icons/gi';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

export default function NoteViewer() {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(false);

    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    useEffect(() => {
        (async () => {
            try {
                setIsFetching(true);
                const res = await getNoteById(noteId);
                const fetchedNote = res?.data?.data;

                if (fetchedNote && fetchedNote.fileDetails?.uploadFileName) {
                    // This for - dev
                    // const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
                    // const filePath = fetchedNote.fileDetails.uploadFileName.replace(/^\//, '');
                    // fetchedNote.fileDetails.fileUrl = `${baseUrl}/files/${filePath}`;
                    // This for - prod
                    fetchedNote.fileDetails.fileUrl = fetchedNote.fileDetails.uploadFileName;
                    console.log("🧾 File URL:", fetchedNote.fileDetails.fileUrl);
                }

                setNote(fetchedNote);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load note");
            } finally {
                setIsFetching(false);
            }
        })();
    }, [noteId]);

    const renderViewer = () => {
        if (!note || !note.fileDetails?.fileUrl) {
            return <p className="text-red-500 font-semibold">File not available.</p>;
        }

        const fileUrl = note.fileDetails.fileUrl;
        const ext = fileUrl.split('.').pop().toLowerCase();

        if (ext === 'pdf') {
            return (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <div className="h-[92vh] border rounded-md flex flex-col">
                        <div className="border-b p-2 bg-white dark:bg-slate-600">
                            <Toolbar />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <Viewer
                                fileUrl={fileUrl}
                                plugins={[toolbarPluginInstance]}
                                onDocumentLoadFailure={() => toast.error('Failed to render PDF')}
                            />
                        </div>
                    </div>
                </Worker>
            );
        }

        if (['jpg', 'jpeg', 'png'].includes(ext)) {
            return (
                <img
                    src={fileUrl}
                    alt={note?.title || 'Note Preview'}
                    className="max-w-full max-h-[80vh] mx-auto rounded shadow"
                />
            );
        }

        if (['doc', 'docx'].includes(ext)) {
            const encodedUrl = encodeURIComponent(fileUrl);
            return (
                <iframe
                    title="Document Viewer"
                    src={`https://docs.google.com/gview?url=${encodedUrl}&embedded=true`}
                    className="w-full h-[80vh] border rounded-md"
                />
            );
        }

        return <p className="text-red-500 font-semibold">Unsupported file type.</p>;
    };

    return (
        <div className="w-full mx-auto min-h-screen fixed right-0 p-2 bg-white dark:bg-slate-900">
            {isFetching ? (
                <div className="flex items-center justify-center h-screen w-full text-indigo-600 dark:text-indigo-400">
                    <div className="text-center">
                        <svg className="animate-spin h-8 w-8 mx-auto mb-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <p>Loading Note...</p>
                    </div>
                </div>

            ) : note ? (
                <>
                    <div className="flex items-center justify-between mb-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-sm text-indigo-600 hover:underline"
                        >
                            <FiArrowLeft className="mr-1" /> Back
                        </button>
                        <div className="flex text-indigo-700 sm:text-2xl text-3xl font-bold dark:text-white">
                            <GiNotebook />
                            <span className="ml-2 hidden sm:inline md:hidden">NV</span>
                            <span className="ml-2 hidden md:inline">Notevera</span>
                        </div>
                        <div className="space-y-1 text-right">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                {note?.title || "Untitled Note"}
                            </h1>
                        </div>
                    </div>
                    <div>{renderViewer()}</div>
                </>
            ) : (
                <p className="text-center text-red-600 font-semibold">Note not found.</p>
            )}
        </div>
    );
}
