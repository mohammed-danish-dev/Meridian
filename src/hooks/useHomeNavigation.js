import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useHomeNavigation = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const navigateToHome = () => {
    if (!user) {
      navigate('/');
    } else {
      switch (user.role) {
        case 'Employee':
          navigate('/dashboard');
          break;
        case 'Manager':
          navigate('/procurement');
          break;
        case 'Compliance Officer':
          navigate('/compliance');
          break;
        case 'Auditor':
          navigate('/audit');
          break;
        case 'Administrator':
          navigate('/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    }
  };

  return navigateToHome;
};
