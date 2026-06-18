import {useState, useEffect} from 'react'
import {type Products, type Categories} from '../../exporter/data'
import {retrieveCategories, retrieveProducts} from '../../exporter/api'

export default function useRetrieveProducts() {
    const [products, setProducts] = useState<Pick<Products, `id` | `product_name` | `category_id` | `description` | `image`>[]>([])
    const [categories, setCategories] = useState<Pick<Categories, `id` | `category_name`>[]>([])

    const [search, setSearch] = useState<string | null>(``)
    const [page, setPage] = useState<Number>(1)

    useEffect(() => {
        const load = async () => {
            setProducts(await retrieveProducts())
            setCategories(await retrieveCategories())
        }
        load()
    }, [])

    useEffect(() => {
        setPage(1)
    }, [search])

    const enrichedVariables = products.map((p) => {
        const category = categories.find((c) => Number(c.id) === Number(p.category_id))

        return {
            ...p,
            category_name: category?.category_name || ``,
        }
    })

    const filteredItems = enrichedVariables.filter((p) => {
        const searchValue = (search || ``).toLowerCase()

        if (!searchValue) return true

        return (
            p?.product_name.toLowerCase().includes(searchValue) ||
            p?.category_name.toLowerCase().includes(searchValue) ||
            p?.description.toLowerCase().includes(searchValue)
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
        products,
        setProducts,
        categories,
        setCategories,
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