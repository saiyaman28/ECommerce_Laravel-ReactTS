export interface Orders {
    id: string | number,
    customer_id: number,
    total_price: string | number,
    status: `Pending` | `Processing` | `Shipped` | `Delivered` | `Canceled`,
    created_at: Date,
    updated_at: Date,
}