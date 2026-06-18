import {useState, useEffect} from 'react'
import {type Categories, type Products, type ProductVariants} from '../../exporter/data'
import {retrieveCategories, retrieveProducts, retrieveProductVariants} from '../../exporter/api'

export default function useRetrieveCategories() {
    const [variants, setVariants] = useState<Pick<ProductVariants, `id` | `product_id` | `variant_name` | `price` | `stock` | `image`>[]>([])
    const [products, setProducts] = useState<Pick<Products, `id` | `product_name` | `category_id`>[]>([])
    const [categories, setCategories] = useState<Pick<Categories, `id` | `category_name`>[]>([])

    const [search, setSearch] = useState<string | null>(``)
    const [page, setPage] = useState<Number>(1)

    useEffect(() => {
        const load = async () => {
            setVariants(await retrieveProductVariants())
            setProducts(await retrieveProducts())
            setCategories(await retrieveCategories())
        }
        load()
    }, [])

    useEffect(() => {
        setPage(1)
    }, [search])

    const enrichedVariables = variants.map((v) => {
        const product = products.find((p) => Number(p.id) === Number(v.product_id))
        const category = categories.find((c) => Number(c.id) === Number(product?.category_id))

        return {
            ...v,
            product_name: product?.product_name || ``,
            category_name: category?.category_name || ``,
        }
    })

    const filteredItems = enrichedVariables.filter((v) => {
        const searchValue = (search || ``).toLowerCase()

        if (!searchValue) return true

        return (
            v?.product_name.toLowerCase().includes(searchValue) ||
            v?.variant_name.toLowerCase().includes(searchValue) ||
            v?.category_name.toLowerCase().includes(searchValue) ||
            v?.price.toString().includes(searchValue) ||
            v?.stock.toString().includes(searchValue)
        )
    })

    const perPage = 10

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage))
    const paginatedItems = filteredItems.slice((Number(page) - 1) * perPage, Number(page) * perPage)
    const pages = Array.from({length: totalPages}, (_, i) => i + 1)

    const getVisiblePages = (page: number, totalPages: number): (number | string)[] => {
        if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1)
        
        if (page <= 4) return [1, 2, 3, 4, 5, "...", totalPages]

        if (page >= totalPages - 3) return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        
        return [1, "...", page - 1, page, page + 1, "...", totalPages]
    }

    return {
        variants,
        setVariants,
        products,
        setProducts,
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