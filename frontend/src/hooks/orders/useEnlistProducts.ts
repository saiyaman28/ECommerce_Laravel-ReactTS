import {useState, useEffect} from 'react'
import {type Categories, type Products, type ProductVariants} from '../../exporter/data'
import {retrieveCategories, retrieveProducts, retrieveProductVariants} from '../../exporter/api'

export default function useEnlistProducts() {
    const [categories, setCategories] = useState<Pick<Categories, `id` | `category_name`>[]>([])
    const [products, setProducts] = useState<Pick<Products, `id` | `product_name` | `category_id`>[]>([])
    const [variants, setVariants] = useState<Pick<ProductVariants, `id` | `product_id` | `variant_name` | `stock` | `price` | `image`>[]>([])

    const [search, setSearch] = useState<string | null>(``)
    const [page, setPage] = useState<Number>(1)

    useEffect(() => {
        const load = async () => {
            setCategories(await retrieveCategories())
            setProducts(await retrieveProducts())
            setVariants(await retrieveProductVariants())
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
            v?.price.toString().includes(searchValue)
        )
    })

    const perPage = 10

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage))
    const paginatedItems = filteredItems.slice((Number(page) - 1) * perPage, Number(page) * perPage)
    const pages = Array.from({length: totalPages}, (_, i) => i + 1)

    return {
        products, 
        setProducts,
        variants, 
        setVariants,
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