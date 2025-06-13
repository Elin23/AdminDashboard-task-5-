import { Link } from "react-router-dom"
import './GoBackButton.css'
type GoBackProps = {
    path: string;
}
function GoBackButton({path} : GoBackProps) {
  return (
    <div className="go-back-btn rounded-circle border border-1 border-dark d-flex align-items-center justify-content-center">
        <Link to={path} className="bg-transparent rounded-circle border-1 border-dark">
            <img src="/AdminDashboard-task-5-/assets/icons/left-arrow.svg" alt="arrow" />
        </Link>
    </div>
  )
}

export default GoBackButton
