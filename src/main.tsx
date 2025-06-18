import { StrictMode  } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import SignInForm from './components/SignForm/SignInForm';
import SignUpForm from './components/SignForm/SignUpForm';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import ItemsList from './components/items/ItemsList/ItemsList';
import ShowItem from './components/items/ShowItem/ShowItem';
import ItemsForm from './components/items/ItemsForm/ItemsForm';
import PageUnavailable from './layouts/PageUnavailable/PageUnavailable';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout logo='/AdminDashboard-task-5-/assets/imgs/logo.png' />,
    children: [
      { path: "login", element: <SignInForm /> },
      { path: "register", element: <SignUpForm /> }
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>),
    children: [
      { index: true, element: <Navigate to="products" replace /> },
      { path: "products", element: <ItemsList /> },
      { path: "products/new", element: <ItemsForm pageTitle='ADD NEW ITEM' buttonLabel='Save' /> },
      { path: "products/:id/edit", element: <ItemsForm pageTitle='EDIT ITEM' buttonLabel='Save' /> },
      { path: "products/:id/show", element: <ShowItem /> },
      { path: "fav", element: <PageUnavailable /> },
      { path: "orders", element: <PageUnavailable /> },
    ]
  }
], {
  basename: "/AdminDashboard-task-5-/"
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
