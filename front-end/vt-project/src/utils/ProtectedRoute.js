import { Navigate } from 'react-router-dom';
import jwt_decode from './decodeJWT';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Add loading state
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const validateAccess = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No token');

        const user = jwt_decode(token);
        
        // Validate token expiration
        if (isTokenExpired(user.exp)) {
          throw new Error('Token expired');
        }

        const userRoles = Array.isArray(user.Role) ? user.Role : [user.Role];
        const hasAccess = allowedRoles.some(role => userRoles.includes(role));

        setIsAuthorized(hasAccess);
      } catch (error) {
        localStorage.removeItem('accessToken');
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateAccess();
  }, [allowedRoles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;