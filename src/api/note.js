import axiosInstance from './axiosInstance';

const getTokenHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
});



// Get all notes uploaded by admin
export const getAllNotesAdminBySubject = async (subjectId) => {
    return await axiosInstance.get(`/note/admin/subject/${subjectId}`, getTokenHeader());
};

// Get all notes uploaded by subject
export const getAllNotesBySubject = async (subjectId) => {
    return await axiosInstance.get(`/note/subject/${subjectId}`, getTokenHeader());
};

// Get all notes uploaded by user
export const getAllMyNotesBySubject = async (subjectId) => {
    return await axiosInstance.get(`/note/user/subject/${subjectId}`, getTokenHeader());
};

// Get all notes uploaded by user
export const getNoteById = async (noteId) => {
    return await axiosInstance.get(`/note/${noteId}`, getTokenHeader());
};

// Get all notes
export const getAllNotes = async () => {
    return await axiosInstance.get(`/note/getnotes`, getTokenHeader());
};

// Get all files
export const getFiles = async (fileName) => {
    return await axiosInstance.get(`/files/${fileName}`, getTokenHeader());
};

// Download note
export const downloadNote = async (noteId) => {
    return await axiosInstance.get(`/notes/${noteId}/download`, {
        ...getTokenHeader(),
        responseType: 'blob', // for downloading files
    });
};
