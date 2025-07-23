import axiosInstance from './axiosInstance';

export const registerUser = async (userData) => {
    return await axiosInstance.post('/auth', userData);
};

export const loginUser = async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data.data; // { user, token }
};

export const getActiveCourses = async () => {
    return await axiosInstance.get('/course/active');
}

export const getActiveSemesters = async (courseId) => {
    return await axiosInstance.get(`/semester/active/by-course/${courseId}`);
}

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const sendResetEmail = async (email) => {
    return await axiosInstance.get(`/home/send-email-reset`, {
        params: { email }
    });
};

export const resetPasswordApi = async (data) => {
    return await axiosInstance.post(`/home/reset-pswd`, data);
};
