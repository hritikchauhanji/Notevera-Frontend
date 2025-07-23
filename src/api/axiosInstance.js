import axios from 'axios';
import { toast } from 'react-toastify';

const BaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: `${BaseUrl}/api/v1`, // change this when deploying
    headers: {
        'Content-Type': 'application/json',
    },
});

const publicRoutes = ['/auth', '/auth/login', '/auth/register', '/course/active', '/semester/active', '/home/verify', '/home/send-email-reset', '/home/reset-pswd'];

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    const isPublic = publicRoutes.some((route) => config.url.includes(route));
    if (token && !isPublic) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Handle 401 (token expired)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Prevent duplicate redirects
            if (!window.location.pathname.startsWith('/auth/login')) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                toast.error('Session expired. Please log in again.', {
                    onClose: () => {
                        window.location.href = '/auth/login';
                    },
                    autoClose: 1500,
                });
            }
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
