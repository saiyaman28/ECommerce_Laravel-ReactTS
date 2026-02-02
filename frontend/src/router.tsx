import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from './Layout/Guest'
import CustomerLayout from "./Layout/Customer"
import AdminLayout from "./Layout/Admin"

import IndexPage from './Pages/index'
import LoginPage from './Pages/login'
import ForgotPasswordPage from './Pages/forgot_password'
import ResetPasswordPage from './Pages/reset_password'
import EditProfilePage from './Pages/edit_profile'
import ChangePasswordPage from './Pages/change_password'

import DashboardPage from './Pages/dashboard'

import AdminDashboardPage from './Pages/AdminDashboard'

export default createBrowserRouter([

    {
        path: '',
        element: <GuestLayout/>,
        children: [
            {
                path: '',
                element: <IndexPage/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage/>
            },
            {
                path: 'reset-password',
                element: <ResetPasswordPage/>
            },
        ]
    },

    {
        path: "",
        element: <CustomerLayout />,
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />
            },
            {
                path: 'edit-profile',
                element: <EditProfilePage/>
            },
            {
                path: 'change-password',
                element: <ChangePasswordPage/>
            },
        ]
    },

    {
        path: "",
        element: <AdminLayout />,
        children: [
            {
                path: "admin/dashboard",
                element: <AdminDashboardPage />
            }
        ]
    }
])

