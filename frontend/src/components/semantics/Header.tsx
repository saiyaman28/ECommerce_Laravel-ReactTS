// import React from 'react'
import {useStateContext} from "../../context_provider"
import {useScreenWidth, useLogoutHook} from '../../exporter/hooks'
import {Href} from '../../exporter/components'
import '../../assets/styles/Components/Header.sass'
import '../../assets/styles/Components/MenuBurger.css'

export default function Header({}) {
    const screenwidth = useScreenWidth()
    const {user} = useStateContext()
    const {destroyToken} = useLogoutHook()

    return (
        <header id={`header`}>
            <div id={`header-container`} className={`container`}>
                <h1 id={`header-title`}>CARDEAL</h1>
                {screenwidth > 766 ? 
                    user?.role === "customer" ?
                        <nav id={`header-nav`}>
                            <Href Title={`HOME`} Redirect={`/customer`} />
                            <Href Title={`CART`} Redirect={`/customer/cart`} />
                            <Href Title={`ORDERS`} Redirect={`/customer/list/orders`} />
                            <Href Title={`EDIT PROFILE`} Redirect={`/customer/edit-profile`} />
                            <Href Title={`CHANGE PASSWORD`} Redirect={`/customer/change-password`} />
                            <Href Title={`LOGOUT`} OnClick={destroyToken} />
                        </nav>
                        :
                    user?.role === "admin" ?
                        <nav id={`header-nav`}>
                            <Href Title={`HOME`} Redirect={`/`} />
                            <Href Title={`ORDERS`} Redirect={`/admin/list/orders`} />
                            <Href Title={`CATEGORIES`} Redirect={`/admin/list/categories`} />
                            <Href Title={`PRODUCTS`} Redirect={`/admin/list/products`} />
                            <Href Title={`VARIANTS`} Redirect={`/admin/list/products/variants`} />
                            <Href Title={`EDIT PROFILE`} Redirect={`/admin/edit-profile`} />
                            <Href Title={`CHANGE PASSWORD`} Redirect={`/admin/change-password`} />
                            <Href Title={`LOGOUT`} OnClick={destroyToken} />
                        </nav>
                        :
                        <nav id={`header-nav`}>
                            <Href Title={`HOME`} Redirect={`/`} />
                            <Href Title={`LOGIN`} Redirect={`/login`} />
                            <Href Title={`REGISTER`} Redirect={`/register`} />
                            <Href Title={`FORGOT PASSWORD`} Redirect={`/forgot-password`} />
                        </nav>
                    :
                    <div className={`burger`}>
                        <input className={`burger-in`} type={`checkbox`} data-bs-toggle={`collapse`} data-bs-target={`#collapseExample`} />
                    </div>
                }
            </div>
            {screenwidth <= 766 && 
                <div className={`collapse`} id={`collapseExample`}>
                    {user?.role === "customer" ?
                        <nav id={`header-nav`}>
                            <Href Title={`HOME`} Redirect={`/customer`} />
                            <Href Title={`EDIT PROFILE`} Redirect={`/customer/edit-profile`} />
                            <Href Title={`CHANGE PASSWORD`} Redirect={`/customer/change-password`} />
                            <Href Title={`LOGOUT`} OnClick={destroyToken} />
                        </nav>
                        :
                    user?.role === "admin" ?
                        <nav id={`header-nav`}>
                            <Href Title={`HOME`} Redirect={`/`} />
                            <Href Title={`ORDERS`} Redirect={`/admin/orders`} />
                            <Href Title={`CATEGORIES`} Redirect={`/admin/category`} />
                            <Href Title={`PRODUCTS`} Redirect={`/admin/product`} />
                            <Href Title={`VARIANTS`} Redirect={`/admin/product/variant`} />
                            <Href Title={`EDIT PROFILE`} Redirect={`/admin/edit-profile`} />
                            <Href Title={`CHANGE PASSWORD`} Redirect={`/admin/change-password`} />
                            <Href Title={`LOGOUT`} OnClick={destroyToken} />
                        </nav>
                        :
                        <nav id={`header-nav`}>
                            <Href Title={`HOME`} Redirect={`/`} />
                            <Href Title={`LOGIN`} Redirect={`/login`} />
                            <Href Title={`REGISTER`} Redirect={`/register`} />
                            <Href Title={`FORGOT PASSWORD`} Redirect={`/forgot-password`} />
                        </nav>
                    }
                </div>
            }
        </header>
    )
}