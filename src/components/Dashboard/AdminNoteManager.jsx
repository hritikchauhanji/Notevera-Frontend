// AdminNotesManager.jsx
import { useRef, useState } from 'react';
import NotesUploadForm from './NotesUploadForm';
import AdminNote from './AdminNote';
import { saveNote } from '../../api/admin';

export default function AdminNotesManager() {
    const [editNoteData, setEditNoteData] = useState(null);
    const formRef = useRef(null);

    const handleEdit = (note) => {
        setEditNoteData(note);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div>
            <div ref={formRef}>
                <NotesUploadForm editNote={editNoteData} clearEdit={() => setEditNoteData(null)} onUpload={saveNote} />
            </div>
            <AdminNote onEdit={handleEdit} />
        </div>
    );
}