import axiosInstance from './axiosInstance';

const getTokenHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
});

// Fetch profile
export const getUserProfile = async () => {
    return await axiosInstance.get('/user/profile', getTokenHeader());
};

// Update profile
export const updateUserProfile = async (editData) => {
    return await axiosInstance.put('/user/update-profile', editData, getTokenHeader());
};

// Change password
export const changePasswordApi = async (data) => {
    return await axiosInstance.post('/user/pass-change', data, getTokenHeader());
};

