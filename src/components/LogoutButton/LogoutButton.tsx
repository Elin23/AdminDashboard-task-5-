import { useNavigate } from 'react-router-dom'
import './LogoutButton.css'
import UserService from '../../services/UserService';
import axios from 'axios';
function LogoutButton() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    try {
      axios.post('https://web-production-3ca4c.up.railway.app/api/logout', {}, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      UserService.clearUser();
      navigate("/auth/login");
    };
  
    
  }
  return (
    <button onClick={handleLogout} className='logout-button border-0 bg-transparent d-flex align-items-center justify-content-center gap-4'>Logout <img src="/AdminDashboard-task-5-/assets/icons/sign-out.svg" alt="logout icon" /></button>
  )
}

export default LogoutButton
