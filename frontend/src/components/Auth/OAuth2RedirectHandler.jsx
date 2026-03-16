import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const username = params.get('username');
    const email = params.get('email');
    const role = params.get('role');

    if (token) {
      const authResponse = {
        token,
        username,
        email,
        role,
        message: 'Google login successful!'
      };
      login(authResponse);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [location, login, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Processing Google login...</p>
    </div>
  );
};

export default OAuth2RedirectHandler;
