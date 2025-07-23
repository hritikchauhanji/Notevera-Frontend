import axiosInstance from "./axiosInstance";


export const getActiveSubjects = async (semesterId) => {
    return await axiosInstance.get(`/subject/active/by-semester/${semesterId}`);
}

export const saveNote = async (formData) => {
    return await axiosInstance.post('/note/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateNote = async (formData) => {
    return await axiosInstance.post(`/note/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Delete note
export const deleteNoteById = async (noteId) => {
    return await axiosInstance.delete(`/note/delete/${noteId}`);
};

// Get all users
// export const getAllUsers = async () => {
//     return await axiosInstance.get('/admin/users');
// };

// // Get all notes
// export const getAllNotes = async () => {
//     return await axiosInstance.get('/admin/notes');
// };

// // Delete a user
// export const deleteUser = async (userId) => {
//     return await axiosInstance.delete(`/admin/users/${userId}`);
// };

// // Toggle user status (active/inactive)
// export const updateUserStatus = async (userId, isActive) => {
//     return await axiosInstance.put(`/admin/users/${userId}/status`, { isActive });
// };

