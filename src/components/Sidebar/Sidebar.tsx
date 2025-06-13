import { useEffect, useState } from 'react';
import { Button, Image, Offcanvas, Stack, Nav, Modal } from 'react-bootstrap';
import './Sidebar.css';
import UserService from '../../services/UserService';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModelComponent from '../ModelComponent/ModelComponent';


interface NavItem {
  to: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  logo: string;
  navItems: NavItem[];
}

function Sidebar({ logo, navItems }: SidebarProps) {
  const [show, setShow] = useState(false);
  const [closeBtn, setCloseBtn] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = UserService.getUserInfo();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = async () => {
    try {
      await axios.post('https://web-production-3ca4c.up.railway.app/api/logout', {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      UserService.clearUser();
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    const monitor = () => {
      setShow(window.innerWidth >= 768);
      setCloseBtn(window.innerWidth < 768);
    };
    monitor();
    window.addEventListener('resize', monitor);
    return () => window.removeEventListener('resize', monitor);
  }, []);

  return (
    <>
      {!show && (
        <Button variant="primary" onClick={handleShow} className="m-2 d-md-none">
          Open Menu
        </Button>
      )}
      <div className='sidebar-wrapper d-flex flex-column align-items-center justify-content-between vh-100 bg-secondary-color'>
        <div className="sidebar-logo">
          <img src={logo} alt="logo" />
        </div>
        <Stack gap={3} className="d-flex align-items-center justify-content-center">
          <div className="user-image">
            <Image roundedCircle src={user?.profileImage} className="w-100" />
          </div>
          <div className="fs-17 text-center fw-bold">
            {user?.firstName} {user?.lastName}
          </div>
        </Stack>
        <div className="sidebar-content w-100 d-flex flex-column justify-content-between">
          <Nav className="sidebar-nav flex-column align-items-center">
            {navItems.map((item, index) => (
              <NavLink key={index} to={item.to}
                className={({ isActive }) => `nav-link d-flex align-items-center justify-content-center text-dark fw-medium rounded-4px w-100 py-2 ${isActive ? 'bg-primary-color' : ''}`}>
                <img src={item.icon} alt={item.label} />
                <span className="fs-17">{item.label}</span>
              </NavLink>
            ))}
          </Nav>
          <button onClick={() => setShowLogoutAlert(true)}
            className="fw-medium border-0 bg-transparent d-flex align-items-center justify-content-center gap-4">
            Logout <img src="/AdminDashboard-task-5-/assets/icons/sign-out.svg" alt="logout icon" />
          </button>
        </div>
      </div>
      
      <ModelComponent show = {showLogoutAlert} onClose={()=> setShowLogoutAlert(false)}
      onConfirm={()=> {handleLogout(); setShowLogoutAlert(false)}}
      title='Confirm Logout' body='Are you sure you want to log out?' close='Cancel' confirm='Logout'
      closeStyle='bg-primary-color' confirmStyle='btn-danger'
      />
    </>
  );
}

export default Sidebar;
