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
import CashOut from './pages/CashOut/CashOut'
import AgentRoute from './secureRoutes/AgentRoute'
import AdminRoute from './secureRoutes/AdminRoute'
import Users from './pages/Users/Users'
import Agents from './pages/Agents/Agents'
import Transactions from './pages/Transactions/Transactions'
import MyTransactions from './pages/MyTransactions/MyTransactions'
import ApprovalRequests from './pages/ApprovalRequests/ApprovalRequests'
import RequestMoney from './pages/RequestMoney/RequestMoney'
import MoneyRequests from './pages/MoneyRequests/MoneyRequests'
import Withdraw from './pages/Withdraw/Withdraw'
import WithdrawRequests from './pages/WithdrawRequests/WithdrawRequests'
import Error404 from './pages/Error404/Error404'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error404 />,
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
          <AgentRoute>
            <CashIn />
          </AgentRoute>
        </PrivateRoute>
      },
      {
        path: '/cash-out',
        element: <PrivateRoute>
          <UserRoute>
            <CashOut />
          </UserRoute>
        </PrivateRoute>
      },
      {
        path: '/users',
        element: <PrivateRoute>
          <AdminRoute>
            <Users />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: '/agents',
        element: <PrivateRoute>
          <AdminRoute>
            <Agents />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: '/withdraw',
        element: <PrivateRoute>
          <AgentRoute>
            <Withdraw />
          </AgentRoute>
        </PrivateRoute>
      },
      {
        path: '/money-requests',
        element: <PrivateRoute>
          <AdminRoute>
            <MoneyRequests />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: '/withdraw-requests',
        element: <PrivateRoute>
          <AdminRoute>
            <WithdrawRequests />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: '/request-money',
        element: <PrivateRoute>
          <AgentRoute>
            <RequestMoney />
          </AgentRoute>
        </PrivateRoute>
      },
      {
        path: '/transactions/:email',
        element: <PrivateRoute>
          <AdminRoute>
            <Transactions />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: '/approval-requests',
        element: <PrivateRoute>
          <AdminRoute>
            <ApprovalRequests />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: '/my-transactions',
        element: <PrivateRoute>
          <MyTransactions />
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
