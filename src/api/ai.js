import axiosInstance from './axiosInstance';

export const summarizeNote = async (noteId) => {
    const response = await axiosInstance.get(`/summary/${noteId}`);
    return response.data;
};
