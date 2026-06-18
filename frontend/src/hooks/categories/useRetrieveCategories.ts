import {useState, useEffect} from 'react'
import {type Categories} from '../../exporter/data'
import {retrieveCategories} from '../../exporter/api'

export default function useRetrieveCategories() {
    const [categories, setCategories] = useState<Pick<Categories, `id` | `category_name`>[]>([])

    const [search, setSearch] = useState<string | null>(``)
    const [page, setPage] = useState<Number>(1)

    useEffect(() => {
        const load = async () => {
            const res = await retrieveCategories()
            setCategories(res)
        }
        load()
    }, [])

    useEffect(() => {
        setPage(1)
    }, [search])

    const filteredItems = categories.filter((c) => {
        const searchValue = (search || ``).toLowerCase()

        if (!searchValue) return true

        return (
            c?.category_name.toLowerCase().includes(searchValue)
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