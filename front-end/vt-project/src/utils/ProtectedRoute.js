import { Navigate } from 'react-router-dom';
import jwt_decode from './decodeJWT';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const user = jwt_decode(token);
    const userRoles = Array.isArray(user.auth) ? user.auth : [user.auth];

    if (!allowedRoles.some(auth => userRoles.includes(auth))) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (error) {
    localStorage.removeItem('accessToken');
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;