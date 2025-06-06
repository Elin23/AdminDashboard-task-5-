import { StrictMode, type JSX } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import SignInForm from './components/auth/SignInForm';
import SignUpForm from './components/auth/SignUpForm';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

const verifyPermissions = (element: JSX.Element) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/auth/signIn" />;
}
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
     {path: "signIn", element: <SignInForm/>},
     {path: "signUp", element: <SignUpForm/>}
    ],
  },
  {
    path: "/",
    element : verifyPermissions(<AdminLayout/>),
    children: [
      
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
