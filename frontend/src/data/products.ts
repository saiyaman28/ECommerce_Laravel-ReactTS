export interface Products {
    id: string | number,
    product_name: string,
    category_id: number,
    description: string,
    image: File | string | null,
    created_at: Date,
    updated_at: Date,
}