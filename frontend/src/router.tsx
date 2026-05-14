import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from './Layout/Guest'
import CustomerLayout from "./Layout/Customer"
import AdminLayout from "./Layout/Admin"

import RegisterPage from './Pages/Register'
import LoginPage from './Pages/Login'
import ForgotPasswordPage from './Pages/Forgot_Password'
import ResetPasswordPage from './Pages/Reset_Password'
import EditProfilePage from './Pages/Edit_Profile'
import ChangePasswordPage from './Pages/Change_Password'

import DashboardPage from './Pages/dashboard'

import AdminDashboardPage from './Pages/AdminDashboard'
import OrderPage from './Pages/Ordering'
import CategoryList from './Pages/Admin/Category/Category_List'
import CreateCategoryPage from './Pages/Admin/Category/Create_Category'
import EditCategoryPage from './Pages/Admin/Category/Edit_Category'
import DeleteCategoryPage from './Pages/Admin/Category/Delete_Category'

import ProductList from './Pages/Admin/Products/Product_List'
import CreateProductPage from './Pages/Admin/Products/Create_Product'
import EditProductPage from './Pages/Admin/Products/Edit_Product'
import DeleteProductPage from './Pages/Admin/Products/Delete_Product'

import ProductVariantList from './Pages/Admin/Product_Variants/Variant_List'
import CreateProductVariantPage from './Pages/Admin/Product_Variants/Create_Variant'
import EditProductVariantPage from './Pages/Admin/Product_Variants/Edit_Variant'
import DeleteProductVariantPage from './Pages/Admin/Product_Variants/Delete_Variant'

import OrderListPage from './Pages/Admin/Orders/Orders_List'
import EditOrderPage from './Pages/Admin/Orders/Edit_Orders'

export default createBrowserRouter([

    {
        path: '',
        element: <GuestLayout/>,
        children: [
            {
                path: '',
                element: <LoginPage/>
            },
            {
                path: 'register',
                element: <RegisterPage/>
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
            {
                path: "ordering",
                element: <OrderPage />
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
            },
            {
                path: 'admin/edit-profile',
                element: <EditProfilePage/>
            },            
            {
                path: 'admin/change-password',
                element: <ChangePasswordPage/>
            },
            {
                path: 'admin/category',
                element: <CategoryList/>
            },
            {
                path: 'admin/category/create',
                element: <CreateCategoryPage/>
            },
            {
                path: 'admin/category/edit/:id',
                element: <EditCategoryPage/>
            },
            {
                path: 'admin/category/delete/:id',
                element: <DeleteCategoryPage/>
            },
            {
                path: 'admin/product',
                element: <ProductList/>
            },
            {
                path: 'admin/product/create',
                element: <CreateProductPage/>
            },
            {
                path: 'admin/product/edit/:id',
                element: <EditProductPage/>
            },
            {
                path: 'admin/product/delete/:id',
                element: <DeleteProductPage/>
            },
            {
                path: 'admin/product/variant',
                element: <ProductVariantList/>
            },
            {
                path: 'admin/product/variant/create',
                element: <CreateProductVariantPage/>
            },
            {
                path: 'admin/product/variant/edit/:id',
                element: <EditProductVariantPage/>
            },
            {
                path: 'admin/product/variant/delete/:id',
                element: <DeleteProductVariantPage/>
            },
            {
                path: 'admin/orders',
                element: <OrderListPage/>
            },
            {
                path: "admin/ordering",
                element: <OrderPage />
            },
            {
                path: 'admin/orders/edit/:id',
                element: <EditOrderPage/>
            },
        ]
    }
])

