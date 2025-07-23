import axiosInstance from './axiosInstance';

export const createSemester = async (semesterData) => {
    return await axiosInstance.post(`/semester/save`, semesterData);
};

export const getAllSemesters = async () => {
    return await axiosInstance.get(`/semester/`);
};

export const deleteSemesterById = async (semesterId) => {
    return await axiosInstance.delete(`/semester/${semesterId}`);
};

export const updateSemester = async (semesterId, semesterData) => {
    return await axiosInstance.post(`/semester/${semesterId}`, semesterData);
};
