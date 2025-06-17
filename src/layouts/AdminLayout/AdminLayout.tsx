import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"

function AdminLayout() {
  const navItems = [
    { to: 'products', icon: '/AdminDashboard-task-5-/assets/icons/products.svg', label: 'Products' },
    { to: 'fav', icon: '/AdminDashboard-task-5-/assets/icons/bookmark.svg', label: 'Favorites' },
    { to: 'orders', icon: '/AdminDashboard-task-5-/assets/icons/bookmark.svg', label: 'Order List' }
  ];
  return (
    <div className="d-flex">
      <Sidebar logo="/AdminDashboard-task-5-/assets/imgs/logo.png" navItems={navItems}/>
      <Outlet />
    </div>
  )
}

export default AdminLayout
