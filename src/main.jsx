import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import Home from './pages/Home/Home'
import PrivateRoute from './secureRoutes/PrivateRoute'
import UserRoute from './secureRoutes/UserRoute'
import SendMoney from './pages/SendMoney/SendMoney'
import CashIn from './pages/CashIn/CashIn'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <PrivateRoute><Home /></PrivateRoute>
      },
      {
        path: '/send-money',
        element: <PrivateRoute>
          <UserRoute>
            <SendMoney />
          </UserRoute>
        </PrivateRoute>
      },
      {
        path: '/cash-in',
        element: <PrivateRoute>
          <UserRoute>
            <CashIn />
          </UserRoute>
        </PrivateRoute>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
