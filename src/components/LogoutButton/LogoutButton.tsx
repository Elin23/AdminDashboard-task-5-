import { useNavigate } from 'react-router-dom'

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth/signIn");
    }
  return (
    <button onClick={handleLogout}>Logout <img src="" alt="" /></button>
  )
}

export default LogoutButton
