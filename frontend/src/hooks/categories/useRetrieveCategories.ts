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
        pages
    }
}