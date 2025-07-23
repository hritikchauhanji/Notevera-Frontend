// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';

export const getUserRoles = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return [];
        const decoded = jwtDecode(token);
        return decoded.roles || [];
    } catch {
        return [];
    }
};
