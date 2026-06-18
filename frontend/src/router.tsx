import {createBrowserRouter} from 'react-router-dom'

import GuestLayout from './layout/guest'
import CustomerLayout from './layout/customer'
import AdminLayout from './layout/admin'

import OrderingPage from './pages/Ordering'
import ProductPage from './pages/Product'
import SearchPage from './pages/Search'

import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ForgotPasswordPage from './pages/Forgot_Password'
import ResetPasswordPage from './pages/Reset_Password'

import CartPage from './pages/Cart'
import OrdersListPage from './pages/Orders_List'
import EditOrderPage from './pages/Edit_Order'
import EditProfilePage from './pages/Edit_Profile'
import ChangePasswordPage from './pages/Change_Password'

import CategoriesListPage from './pages/Admin/Categories/Categories_List'
import CreateCategoriesPage from './pages/Admin/Categories/Create_Categories'
import EditCategoriesPage from './pages/Admin/Categories/Edit_Categories'
import DeleteCategoriesPage from './pages/Admin/Categories/Delete_Categories'

import ProductsListPage from './pages/Admin/Products/Products_List'
import CreateProductsPage from './pages/Admin/Products/Create_Products'
import EditProductsPage from './pages/Admin/Products/Edit_Products'
import DeleteProductsPage from './pages/Admin/Products/Delete_Products'

import ProductVariantsListPage from './pages/Admin/Product_Variants/Variant_Lists'
import CreateProductVariantsPage from './pages/Admin/Product_Variants/Create_Variants'
import EditProductVariantsPage from './pages/Admin/Product_Variants/Edit_Variants'
import DeleteProductVariantsPage from './pages/Admin/Product_Variants/Delete_Variants'

// import SamplePage from './pages/Dashboard'

export default createBrowserRouter([

    {
        path: ``,
        element: <GuestLayout/>,
        children: [
            {
                path: ``,
                element: <OrderingPage/>
            },
            {
                path: `product/:id`,
                element: <ProductPage/>
            },
            {
                path: `search`,
                element: <SearchPage/>
            },
            {
                path: `login`,
                element: <LoginPage/>
            },
            {
                path: `register`,
                element: <RegisterPage/>
            },
            {
                path: `forgot-password`,
                element: <ForgotPasswordPage/>
            },
            {
                path: `reset-password`,
                element: <ResetPasswordPage/>
            },
        ]
    },
    {
        path: `customer`,
        element: <CustomerLayout />,
        children: [
            {
                path: ``,
                element: <OrderingPage/>
            },
            {
                path: `product/:id`,
                element: <ProductPage/>
            },
            {
                path: `search`,
                element: <SearchPage/>
            },
            {
                path: `cart`,
                element: <CartPage />
            },
            {
                path: `edit-profile`,
                element: <EditProfilePage/>
            },
            {
                path: `change-password`,
                element: <ChangePasswordPage/>
            },
            {
                path: `list`,
                children: [
                    {
                        path: `orders`,
                        children: [
                            {
                                path: ``,
                                element: <OrdersListPage />
                            },
                            {
                                path: `:id/edit`,
                                element: <EditOrderPage/>
                            }
                        ]
                    },
                ]
            },
        ]
    },
    {
        path: `admin`,
        element: <AdminLayout />,
        children: [
            {
                path: ``,
                element: <OrderingPage/>
            },
            {
                path: `search`,
                element: <SearchPage/>
            },
            {
                path: `product/:id`,
                element: <ProductPage/>
            },
            {
                path: `cart`,
                element: <CartPage />
            },
            {
                path: `edit-profile`,
                element: <EditProfilePage/>
            },
            {
                path: `change-password`,
                element: <ChangePasswordPage/>
            },
            {
                path: `list`,
                children: [
                    {
                        path: `orders`,
                        children: [
                            {
                                path: ``,
                                element: <OrdersListPage />
                            },
                            {
                                path: `:id/edit`,
                                element: <EditOrderPage/>
                            }
                        ]
                    },
                    {
                        path: `categories`,
                        children: [
                            {
                                path: ``,
                                element: <CategoriesListPage/>
                            },
                            {
                                path: `create`,
                                element: <CreateCategoriesPage/>
                            },
                            {
                                path: `:id/edit`,
                                element: <EditCategoriesPage/>
                            },
                            {
                                path: `:id/delete`,
                                element: <DeleteCategoriesPage/>
                            },
                        ]
                    },
                    {
                        path: `products`,
                        children: [
                            {
                                path: ``,
                                element: <ProductsListPage/>
                            },
                            {
                                path: `create`,
                                element: <CreateProductsPage/>
                            },
                            {
                                path: `:id/edit`,
                                element: <EditProductsPage/>
                            },
                            {
                                path: `:id/delete`,
                                element: <DeleteProductsPage/>
                            },
                            {
                                path: `variants`,
                                children: [
                                    {
                                        path: ``,
                                        element: <ProductVariantsListPage/>
                                    },
                                    {
                                        path: `create`,
                                        element: <CreateProductVariantsPage/>
                                    },
                                    {
                                        path: `:id/edit`,
                                        element: <EditProductVariantsPage/>
                                    },
                                    {
                                        path: `:id/delete`,
                                        element: <DeleteProductVariantsPage/>
                                    },
                                ]
                            },
                        ]
                    }
                ]
            }
        ]
    }
])