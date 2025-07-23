import { NotesUploadForm } from "../components";
import { saveNote } from "../api/admin";

export default function UploadNotes() {
    return <NotesUploadForm onUpload={saveNote} />;
}