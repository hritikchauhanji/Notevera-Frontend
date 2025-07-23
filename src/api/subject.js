import axiosInstance from './axiosInstance';

export const createSubject = async (subjectData) => {
    return await axiosInstance.post(`/subject/save`, subjectData);
};

export const getAllSubjects = async () => {
    return await axiosInstance.get(`/subject/`);
};

export const deleteSubjectById = async (subjectId) => {
    return await axiosInstance.delete(`/subject/${subjectId}`);
};

export const updateSubject = async (subjectId, subjectData) => {
    return await axiosInstance.post(`/subject/${subjectId}`, subjectData);
};