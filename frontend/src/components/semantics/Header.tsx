import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useStateContext} from '../../context_provider'
import {useScreenWidth, useLogoutHook} from '../../exporter/hooks'
import {Href, Inputbox, Group, Button} from '../../exporter/components'
import '../../assets/styles/Components/Header.sass'
import '../../assets/styles/Components/MenuBurger.css'

export default function Header({}) {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const screenwidth = useScreenWidth()
    const {user} = useStateContext()
    const {destroyToken} = useLogoutHook()

    const performSearch = () => {
        if (!search.trim()) return
        if (user?.role === `customer`) navigate(`/customer/search?q=${encodeURIComponent(search)}`)
        else if (user?.role === `admin`) navigate(`/admin/search?q=${encodeURIComponent(search)}`)
        else navigate(`/search?q=${encodeURIComponent(search)}`)
    }

    const searchBar = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === `Enter`) performSearch()
    }

    return (
        <header id={`header`}>
            <div id={`header-container`} className={`container`}>
                <nav id={`header-nav-left`} className={`dropdown`}>
                    <Href Title={`HOME`} Redirect={user?.role === `customer` ? `/customer` : user?.role === `admin` ? `/admin` : `/`} />

                    <Href Title={`SEARCH`} Class='dropdown-toggle' DataBsToggle="dropdown" />
                    {/* <div className="dropdown-menu p-4 text-body-secondary">
                        <Inputbox Title={`Search products...`} Value={search} OnChange={(e) => setSearch(e.target.value)} OnKeyDown={searchBar} />
                        <Button Title={`Search`} OnClick={performSearch} />
                    </div> */}
                    <ul className="dropdown-menu">
                        <Group>
                            <Inputbox Title={`Search products...`} Value={search} OnChange={(e) => setSearch(e.target.value)} OnKeyDown={searchBar} />
                            <Button Title={`Search`} OnClick={performSearch} />
                        </Group>
                    </ul>
                    {user?.role === `customer` && <Href Title={`CART`} Redirect={`/customer/cart`} />}
                </nav>

                {screenwidth > 766 ?
                    <nav id={`header-nav`}>

                        {user?.role === `customer` ?
                            <>
                                <Href Title={`CART`} Redirect={`/customer/cart`} />
                                <Href Title={`ORDERS`} Redirect={`/customer/list/orders`} />
                                <Href Title={`EDIT PROFILE`} Redirect={`/customer/edit-profile`} />
                                <Href Title={`CHANGE PASSWORD`} Redirect={`/customer/change-password`} />
                                <Href Title={`LOGOUT`} OnClick={destroyToken} />
                            </>
                        :
                        user?.role === `admin` ?
                            <>
                                <Href Title={`ORDERS`} Redirect={`/admin/list/orders`} />
                                <Href Title={`CATEGORIES`} Redirect={`/admin/list/categories`} />
                                <Href Title={`PRODUCTS`} Redirect={`/admin/list/products`} />
                                <Href Title={`VARIANTS`} Redirect={`/admin/list/products/variants`} />
                                <Href Title={`EDIT PROFILE`} Redirect={`/admin/edit-profile`} />
                                <Href Title={`CHANGE PASSWORD`} Redirect={`/admin/change-password`} />
                                <Href Title={`LOGOUT`} OnClick={destroyToken} />
                            </>
                        :
                            <>
                                <Href Title={`LOGIN`} Redirect={`/login`} />
                                <Href Title={`REGISTER`} Redirect={`/register`} />
                            </>
                        }
                    </nav>
                    :
                    <div className={`burger`}>
                        <input className={`burger-in`} type={`checkbox`} data-bs-toggle={`collapse`} data-bs-target={`#collapseExample`} />
                    </div>
                }
            </div>
            {screenwidth <= 766 && 
                <div className={`collapse`} id={`collapseExample`}>
                    <nav id={`header-nav`}>
                        <Href Title={`HOME`} Redirect={user?.role === `customer` ? `/customer` : user?.role === `admin` ? `/admin` : `/`} />
                        {user?.role === `customer` ?
                            <>
                                <Href Title={`CART`} Redirect={`/customer/cart`} />
                                <Href Title={`ORDERS`} Redirect={`/customer/list/orders`} />
                                <Href Title={`EDIT PROFILE`} Redirect={`/customer/edit-profile`} />
                                <Href Title={`CHANGE PASSWORD`} Redirect={`/customer/change-password`} />
                                <Href Title={`LOGOUT`} OnClick={destroyToken} />
                            </>
                        :
                        user?.role === `admin` ?
                            <>
                                <Href Title={`ORDERS`} Redirect={`/admin/list/orders`} />
                                <Href Title={`CATEGORIES`} Redirect={`/admin/list/categories`} />
                                <Href Title={`PRODUCTS`} Redirect={`/admin/list/products`} />
                                <Href Title={`VARIANTS`} Redirect={`/admin/list/products/variants`} />
                                <Href Title={`EDIT PROFILE`} Redirect={`/admin/edit-profile`} />
                                <Href Title={`CHANGE PASSWORD`} Redirect={`/admin/change-password`} />
                                <Href Title={`LOGOUT`} OnClick={destroyToken} />
                            </>
                        :
                            <>
                                <Href Title={`LOGIN`} Redirect={`/login`} />
                                <Href Title={`REGISTER`} Redirect={`/register`} />
                                <Href Title={`FORGOT PASSWORD`} Redirect={`/forgot-password`} />
                            </>
                        }
                    </nav>
                </div>
            }
        </header>
    )
}