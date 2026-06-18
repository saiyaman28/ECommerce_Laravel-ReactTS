import {useState, useEffect} from 'react'
import {useStateContext} from '../../context_provider'
import {type Users, type Orders} from '../../exporter/data'
import {retrieveUsers, retrieveOrders} from '../../exporter/api'
import {format} from 'date-fns'

export default function useRetrieveOrders() {
    const {user} = useStateContext()

    const [orders, setOrders] = useState<Orders[]>([])
    const [buyer, setBuyer] = useState<Pick<Users, `id` | `first_name` | `last_name` | `email` | `contact`>[]>([])

    const [search, setSearch] = useState<string | null>(``)
    const [page, setPage] = useState<Number>(1)

    useEffect(() => {
        const load = async () => {
            setOrders(await retrieveOrders())
            setBuyer(await retrieveUsers())
        }
        load()
    }, [])

    useEffect(() => {
        setPage(1)
    }, [search])

    const enrichedVariables = (user?.role === `admin` ? orders : orders.filter(o => o.customer_id === user?.id)).map((o) => {
        const customer = buyer.find((b) => Number(b.id) === Number(o.customer_id))

        return {
            ...o,
            first_name: customer?.first_name || ``,
            last_name: customer?.last_name || ``,
            contact: customer?.contact || ``,
            email: customer?.email || ``,
            created_at: format(new Date(o.created_at), 'MM/dd/yyyy hh:mm'),
            updated_at: format(new Date(o.updated_at), 'MM/dd/yyyy hh:mm')
        }
    })

    const filteredItems = enrichedVariables.filter((o) => {
        const searchValue = search?.toLowerCase() ?? ``

        return (
            o?.id.toString().includes(searchValue) ||
            o?.first_name.toLowerCase().includes(searchValue) ||
            o?.last_name.toLowerCase().includes(searchValue) ||
            o?.contact.toLowerCase().includes(searchValue) ||
            o?.email.toLowerCase().includes(searchValue) ||
            o?.total_price.toString().includes(searchValue) ||
            o?.created_at.includes(searchValue) ||
            o?.updated_at.includes(searchValue)
        )
    })

    const perPage = 10

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage))
    const paginatedItems = filteredItems.slice((Number(page) - 1) * perPage, Number(page) * perPage)
    const pages = Array.from({length: totalPages}, (_, i) => i + 1)

    const getVisiblePages = (page: number, totalPages: number): (number | string)[] => {
        if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1)
        
        if (page <= 4) return [1, 2, 3, 4, 5, `...`, totalPages]

        if (page >= totalPages - 3) return [1, `...`, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        
        return [1, `...`, page - 1, page, page + 1, `...`, totalPages]
    }

    return {
        orders,
        setOrders,
        buyer,
        setBuyer,
        search,
        setSearch,
        page,
        setPage,
        perPage,
        totalPages,
        paginatedItems,
        pages,
        getVisiblePages
    }
}