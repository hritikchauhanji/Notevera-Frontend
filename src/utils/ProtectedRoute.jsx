import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



const getToken = () => localStorage.getItem('token');


const getUserFromToken = () => {
    try {
        const token = getToken();
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error('Token decode error:', error);
        return null;
    }
};

/**
 * ProtectedRoute component
 * @param {Array} allowedRoles - array of roles allowed to access the route
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const token = getToken();
    const user = getUserFromToken();

    if (!token || !user) {
        // No token or invalid token
        return <Navigate to="/auth/login" replace />;
    }

    const userRoles = user.roles || [];

    const hasAccess =
        allowedRoles.length === 0 || allowedRoles.some((role) => userRoles.includes(role));

    return hasAccess ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
