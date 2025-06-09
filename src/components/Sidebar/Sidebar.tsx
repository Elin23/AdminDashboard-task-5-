import { useEffect, useState } from 'react'
import { Button, Image, Offcanvas, Stack } from 'react-bootstrap'
import './Sidebar.css'
import LogoutButton from '../LogoutButton/LogoutButton';
import UserService from '../../services/UserService';

type SidebarProps = {
  logo: string;
}
function Sidebar({ logo }: SidebarProps) {
  const [show, setShow] = useState(false);
  const [closeBtn, setCloseBtn] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = UserService.getUserInfo();
  useEffect(() => {
    const monitor = () => {
      setShow(window.innerWidth >= 768);
      setCloseBtn(window.innerWidth < 768);
    };
    monitor();
    window.addEventListener('resize', monitor);
    return () => window.removeEventListener('resize', monitor)
  }, []);

  return (
    <>
      {!show && (
        <Button variant="primary" onClick={handleShow} className="m-2 d-md-none">
          Open Menu
        </Button>
      )}

      <Offcanvas show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton={closeBtn} className='d-flex justify-content-center align-items-center'>
          <Offcanvas.Title>
            <img src={logo} alt="logo" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            <div className="user-image d-flex align-items-center justify-content-center">
              <Image roundedCircle src={user?.profileImage} className='w-100'/>
            </div>
            <div className="user-name text-center fw-bold">{user?.firstName} {user?.lastName}</div>
          </Stack>
          <div className="sidebar-content d-flex flex-column justify-content-between">
            <ul>
              <li>jj</li>
            </ul>
            <LogoutButton />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Sidebar
