import axiosInstance from './axiosInstance';

export const verifyAccount = async (uid, code) => {
    return await axiosInstance.get(`/home/verify?uid=${uid}&code=${code}`);
};
