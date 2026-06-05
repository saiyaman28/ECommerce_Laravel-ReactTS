export interface OrderItems {
    id: string | number,
    order_id: number,
    product_variant_id: number,
    quantity: string | number,
    total_price: string | number,
    created_at: Date,
    updated_at: Date,
}
