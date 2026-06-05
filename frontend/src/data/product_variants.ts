export interface ProductVariants {
    id: string | number,
    sku: string,
    product_id: number,
    variant_name: string,
    price: string | number,
    stock: string | number,
    image: File | null,
    created_at: Date,
    updated_at: Date,
}