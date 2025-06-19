import { useEffect, useState } from 'react';
import { Button, Image, Stack, Nav } from 'react-bootstrap';
import './Sidebar.css';
import UserService from '../../services/UserService';
import { NavLink, useNavigate } from 'react-router-dom';
import ModelComponent from '../ModelComponent/ModelComponent';
import Loader from '../Loader/Loader';
import AuthService from '../../services/AuthService';
import { generateProductsReport } from '../../services/GenerateReportService';

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 992);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = UserService.getUserInfo();

  const handleLogout = async () => {
    try {
      setLoading(true);
      if (token) {
        await AuthService.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      UserService.clearUser();
      setLoading(false);
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 992;
      setIsMobile(isNowMobile);
      setShowSidebar(!isNowMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {loading && <Loader />}

      {isMobile && !showSidebar && (
        <Button onClick={() => setShowSidebar(true)} className="bg-primary-color m-2 position-fixed top-0 start-0 z-3 border-0">
          <img src="/AdminDashboard-task-5-/assets/icons/burger_icon.svg" alt="icon" />
        </Button>
      )}
      <div className={`sidebar-wrapper d-flex flex-column align-items-center justify-content-between bg-secondary-color top-0 start-0 z-3  ${showSidebar ? 'visible' : 'hidden'}`}>

        {isMobile && (
          <Button variant="light" onClick={() => setShowSidebar(false)} className="position-absolute top-0 end-0 m-2 bg-primary-color">
            <img src="/AdminDashboard-task-5-/assets/icons/close.svg" alt="icon" />
          </Button>
        )}
        <div className="sidebar-logo mt-4">
          <img src={logo} alt="logo" />
        </div>
        <Stack gap={3} className="d-flex align-items-center justify-content-center">
          <div className="user-image">
            <Image roundedCircle src={user?.profileImage} className="w-100 h-100 object-fit-cover" />
          </div>
          <div className="fs-17 text-center fw-bold">
            {user?.firstName} {user?.lastName}
          </div>
        </Stack>
        <div className="sidebar-content w-100 d-flex flex-column justify-content-between">
          <Nav className="sidebar-nav flex-column align-items-center">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center justify-content-center text-dark fw-medium rounded-4px w-100 py-2 ${isActive ? 'bg-primary-color' : ''}`}>
                <img src={item.icon} alt={item.label} />
                <span className="fs-17">{item.label}</span>
              </NavLink>
            ))}
          </Nav>

          <button onClick={() => setShowLogoutAlert(true)} className="fw-medium border-0 bg-transparent d-flex align-items-center justify-content-center gap-4">
            Logout <img src="/AdminDashboard-task-5-/assets/icons/sign-out.svg" alt="logout icon" />
          </button>
        </div>
      </div>

      <ModelComponent
        show={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        onConfirm={() => {
          handleLogout();
          setShowLogoutAlert(false);
        }}
        title="Confirm Logout"
        body={
          <>
            <p>Are you sure you want to log out?</p>
            <button onClick={generateProductsReport} className="btn btn-link text-decoration-underline text-primary fs-6">
              Generate product report before logout
            </button>
          </>
        }
        close="Cancel" confirm="Logout" closeStyle="bg-primary-color" confirmStyle="btn-danger"/>
    </>
  );
}

export default Sidebar;
