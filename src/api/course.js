import axiosInstance from './axiosInstance';

export const createCourse = async (courseData) => {
    return await axiosInstance.post(`/course/save`, courseData);
};

export const getAllCourses = async () => {
    return await axiosInstance.get(`/course/`);
};

export const deleteCourseById = async (courseId) => {
    return await axiosInstance.delete(`/course/${courseId}`);
};

export const updateCourse = async (courseId, courseData) => {
    return await axiosInstance.post(`/course/${courseId}`, courseData);
};
