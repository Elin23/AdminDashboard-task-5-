import { StrictMode, type JSX} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import SignInForm from './components/auth/SignForm/SignInForm';
import SignUpForm from './components/auth/SignForm/SignUpForm';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import ItemsList from './components/items/ItemsList/ItemsList';
import ItemsCreate from './components/items/ItemsCreate/ItemsCreate';
import ItemsEdit from './components/items/ItemsEdit/ItemsEdit';
import ShowItem from './components/items/ShowItem/ShowItem';

const verifyPermissions = (element: JSX.Element) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/auth/login" />;
}

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout logo='/AdminDashboard-task-5-/assets/imgs/logo.png'/>,
    children: [
      { path: "login", element: <SignInForm /> },
      { path: "register", element: <SignUpForm /> }
    ],
  },
  {
    path: "/",
    element: verifyPermissions(<AdminLayout />),
    children: [
      { index: true, element: <Navigate to="products" replace /> },
      { path: "products", element: <ItemsList /> },
      { path: "products/new", element: <ItemsCreate /> },
      { path: "products/:id/edit", element: <ItemsEdit /> },
      { path: "products/:id/show", element: <ShowItem /> }
    ]
  }
],{
  basename: "/AdminDashboard-task-5-/"
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
