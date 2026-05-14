// import React from 'react'
import '../../Assets/CSS/Components/Header.sass'
import '../../Assets/CSS/Components/MenuBurger.css'
import { Href } from '../../Exporter/Components_Exporter'
import { UseScreenWidth } from '../../Exporter/Hooks_Exporter'
import { useStateContext } from "../../Context_Provider"

export default function Header({}) {
    const screenwidth = UseScreenWidth()
    const { user, logout } = useStateContext()

    return (
        <header id={`header`}>
            <div id={`header-container`} className={`container`}>
                <h1 id={`header-title`}>CARDEAL</h1>
                {screenwidth > 766 ? 
                    user?.role === "customer" ?
                        <nav id={`header-nav`}>
                            <Href Title={`HOME`} Redirect={`/`} />
                            <Href Title={`EDIT PROFILE`} Redirect={`/edit-profile`} />
                            <Href Title={`CHANGE PASSWORD`} Redirect={`/change-password`} />
                            <Href Title={`LOGOUT`} OnClick={logout} />
                        </nav>
                        :
                    user?.role === "admin" ?
                        <nav id={`header-nav`}>
                            <Href Title={`HOME`} Redirect={`/`} />
                            <Href Title={`ORDERS`} Redirect={`admin/orders`} />
                            <Href Title={`CATEGORIES`} Redirect={`admin/category`} />
                            <Href Title={`PRODUCTS`} Redirect={`admin/product`} />
                            <Href Title={`VARIANTS`} Redirect={`admin/product/variant`} />
                            <Href Title={`EDIT PROFILE`} Redirect={`admin/edit-profile`} />
                            <Href Title={`CHANGE PASSWORD`} Redirect={`admin/change-password`} />
                            <Href Title={`LOGOUT`} OnClick={logout} />
                        </nav>
                        :
                        <nav id={`header-nav`}>
                            <Href Title={`LOGIN`} Redirect={`/`} />
                            <Href Title={`REGISTER`} Redirect={`/register`} />
                            <Href Title={`FORGOT PASSWORD`} Redirect={`/forgot-password`} />
                        </nav>
                    :
                    <div className={`burger`}>
                        <input className={`burger-in`} type={`checkbox`} data-bs-toggle={`collapse`} data-bs-target={`#collapseExample`} />
                    </div>
                }
            </div>
            { screenwidth <= 766 && 
                <div className={`collapse`} id={`collapseExample`}>
                    <nav>
                        <Href Title={`HOME`} Redirect={`/`} />
                        <Href Title={`EXPLORE`} Redirect={`/explore`} />
                    </nav>
                </div>
            }
        </header>
    )
}