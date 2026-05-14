import React, { useEffect, useState } from "react";
import api from "../axios";
import { useStateContext } from "../context_provider"

/* ================= TYPES ================= */

type Variant = {
  id: number;
  sku: string;
  variant_name: string;
  price: number;
  stock: number;
};

type OrderItem = {
  product_variant_id: number;
  quantity: number;
};

type Order = {
  id: number;
  customer_name: string;
  customer_email?: string;
  total_price: number;
  status: "pending" | "processing" | "shipped" | "delivered";
};


/* ================= COMPONENT ================= */

export default function OrderPage() {
    const { user } = useStateContext()

  const [variants, setVariants] = useState<Variant[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

  const [customerName, setCustomerName] = useState(`${user?.first_name} ${user?.last_name}`);
  const [customerEmail, setCustomerEmail] = useState(`${user?.email}`);

  /* ================= FETCH ================= */

  const fetchVariants = async () => {
    const res = await api.get("/product_variants");
    setVariants(res.data || []);
  };

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data || []);
  };

  useEffect(() => {
    fetchVariants();
    fetchOrders();
  }, []);

  /* ================= ORDER ITEM LOGIC ================= */

  const addItem = (variantId: number) => {
    const exists = selectedItems.find(
      (i) => i.product_variant_id === variantId
    );

    if (exists) return;

    setSelectedItems([
      ...selectedItems,
      { product_variant_id: variantId, quantity: 1 },
    ]);
  };

  const removeItem = (variantId: number) => {
    setSelectedItems(
      selectedItems.filter(
        (i) => i.product_variant_id !== variantId
      )
    );
  };

  const updateQuantity = (variantId: number, qty: number) => {
    setSelectedItems(
      selectedItems.map((i) =>
        i.product_variant_id === variantId
          ? { ...i, quantity: qty }
          : i
      )
    );
  };

  /* ================= TOTAL ================= */

  const calculateTotal = () => {
    return selectedItems
      .reduce((sum, item) => {
        const v = variants.find(
          (x) => x.id === item.product_variant_id
        );
        return v ? sum + v.price * item.quantity : sum;
      }, 0)
      .toFixed(2);
  };

  /* ================= CREATE ORDER ================= */

  const submitOrder = async () => {
    if (!customerName || selectedItems.length === 0) return;

    await api.post("/orders", {
      customer_name: customerName,
      customer_email: customerEmail,
      items: selectedItems,
    });

    setCustomerName("");
    setCustomerEmail("");
    setSelectedItems([]);
    fetchOrders();
  };

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id: number, status: string) => {
    await api.put(`/orders/${id}`, { status });
    fetchOrders();
  };

  /* ================= DELETE ORDER ================= */

  const deleteOrder = async (id: number) => {
    await api.delete(`/orders/${id}`);
    fetchOrders();
  };

  /* ================= UI ================= */

  return (
    <div style={{ padding: 20 }}>

      {/* ================= CREATE ORDER ================= */}
      <h2>Create Order</h2>

      <hr />

      <h3>Products</h3>

      {variants.map((v) => (
        <div key={v.id}>
          {v.variant_name} | ₱{v.price}

          <button onClick={() => addItem(v.id)}>
            Add
          </button>
        </div>
      ))}

      <hr />

      <h3>Selected Items</h3>

      {selectedItems.map((i) => {
        const v = variants.find(
          (x) => x.id === i.product_variant_id
        );

        if (!v) return null;

        return (
          <div key={v.id}>
            {v.variant_name}

            <input
              type="number"
              value={i.quantity}
              min={1}
              onChange={(e) =>
                updateQuantity(
                  v.id,
                  Number(e.target.value)
                )
              }
            />

            <button onClick={() => removeItem(v.id)}>
              Remove
            </button>
          </div>
        );
      })}

      <h3>Total: ₱{calculateTotal()}</h3>

      <button onClick={submitOrder}>
        Submit Order
      </button>

      {/* ================= ORDERS CRUD ================= */}
      <hr />

      <h2>Orders (CRUD)</h2>

      {orders.map((o) => (
        <div
          key={o.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <b>{o.customer_name}</b>
          <div>{o.customer_email}</div>
          <div>Total: ₱{o.total_price}</div>

          {/* STATUS UPDATE */}
          <select
            value={o.status}
            onChange={(e) =>
              updateStatus(o.id, e.target.value)
            }
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>

          <button onClick={() => deleteOrder(o.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}