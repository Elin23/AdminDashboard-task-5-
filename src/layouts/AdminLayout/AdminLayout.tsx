import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"

function AdminLayout() {
  return (
    <div>
      <Sidebar logo="/AdminDashboard-task-5-/assets/imgs/logo.png"/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
