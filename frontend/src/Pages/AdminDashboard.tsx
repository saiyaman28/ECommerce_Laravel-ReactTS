import React, { useEffect, useState } from "react";
import api from "../axios";

/* ================= TYPES ================= */

type Category = {
  id: number;
  category_name: string;
};

type Product = {
  id: number;
  product_name: string;
  category: Category;
};

type ProductVariant = {
  id: number;
  sku: string;
  variant_name: string;
  price: number;
  stock: number;
  product: Product;
};

/* ================= COMPONENT ================= */

export default function AdminDashboard() {
  /* ================= STATES ================= */

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  /* ---------- CATEGORY ---------- */
  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");

  /* ---------- PRODUCT ---------- */
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingProductData, setEditingProductData] = useState({
    product_name: "",
    category_id: "",
  });

  /* ---------- VARIANT ---------- */
  const [selectedProductId, setSelectedProductId] = useState("");
  const [variantName, setVariantName] = useState("");
  const [variantPrice, setVariantPrice] = useState("");
  const [variantStock, setVariantStock] = useState("");

  const [editingVariantId, setEditingVariantId] = useState<number | null>(null);
  const [editingVariantData, setEditingVariantData] = useState({
    variant_name: "",
    price: "",
    stock: "",
  });

  /* ================= FETCH ================= */

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data || []);
  };

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data || []);
  };

  const fetchVariants = async () => {
    const res = await api.get("/product_variants");
    setVariants(res.data || []);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchVariants();
  }, []);

  /* ================= CATEGORY ================= */

  const createCategory = async () => {
    if (!categoryName.trim()) return;

    await api.post("/categories", {
      category_name: categoryName,
    });

    setCategoryName("");
    fetchCategories();
  };

  const deleteCategory = async (id: number) => {
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  const saveCategory = async (id: number) => {
    await api.put(`/categories/${id}`, {
      category_name: editingCategoryName,
    });

    setEditingCategoryId(null);
    setEditingCategoryName("");
    fetchCategories();
  };

  /* ================= PRODUCT ================= */

  const createProduct = async () => {
    if (!productName.trim() || !selectedCategory) return;

    await api.post("/products", {
      product_name: productName,
      category_id: Number(selectedCategory),
    });

    setProductName("");
    setSelectedCategory("");
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const startEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setEditingProductData({
      product_name: p.product_name,
      category_id: String(p.category?.id || ""),
    });
  };

  const saveProduct = async (id: number) => {
    await api.put(`/products/${id}`, {
      product_name: editingProductData.product_name,
      category_id: Number(editingProductData.category_id),
    });

    setEditingProductId(null);
    setEditingProductData({ product_name: "", category_id: "" });

    fetchProducts();
  };

  /* ================= VARIANT ================= */

  const createVariant = async () => {
    if (!selectedProductId || !variantName.trim()) return;

    await api.post("/product_variants", {
      product_id: Number(selectedProductId),
      sku: "AUTO-" + Date.now(),
      variant_name: variantName,
      price: Number(variantPrice),
      stock: Number(variantStock),
    });

    setVariantName("");
    setVariantPrice("");
    setVariantStock("");
    fetchVariants();
  };

  const deleteVariant = async (id: number) => {
    await api.delete(`/product_variants/${id}`);
    fetchVariants();
  };

  const startEditVariant = (v: ProductVariant) => {
    setEditingVariantId(v.id);
    setEditingVariantData({
      variant_name: v.variant_name,
      price: String(v.price),
      stock: String(v.stock),
    });
  };

  const saveVariant = async (id: number) => {
    await api.put(`/product_variants/${id}`, {
      variant_name: editingVariantData.variant_name,
      price: Number(editingVariantData.price),
      stock: Number(editingVariantData.stock),
    });

    setEditingVariantId(null);
    fetchVariants();
  };

  /* ================= UI ================= */

  return (
    <div style={{ padding: 20 }}>

      {/* ================= CATEGORY ================= */}
      <h2>Categories</h2>

      <input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Category"
      />
      <button onClick={createCategory}>Create</button>

      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {editingCategoryId === c.id ? (
              <>
                <input
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                />
                <button onClick={() => saveCategory(c.id)}>Save</button>
                <button onClick={() => setEditingCategoryId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {c.category_name}
                <button onClick={() => {
                  setEditingCategoryId(c.id);
                  setEditingCategoryName(c.category_name);
                }}>
                  Edit
                </button>
                <button onClick={() => deleteCategory(c.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <hr />

      {/* ================= PRODUCT ================= */}
      <h2>Products</h2>

      <input
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.category_name}
          </option>
        ))}
      </select>

      <button onClick={createProduct}>Create</button>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {editingProductId === p.id ? (
              <>
                <input
                  value={editingProductData.product_name}
                  onChange={(e) =>
                    setEditingProductData({
                      ...editingProductData,
                      product_name: e.target.value,
                    })
                  }
                />

                <select
                  value={editingProductData.category_id}
                  onChange={(e) =>
                    setEditingProductData({
                      ...editingProductData,
                      category_id: e.target.value,
                    })
                  }
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.category_name}
                    </option>
                  ))}
                </select>

                <button onClick={() => saveProduct(p.id)}>Save</button>
                <button onClick={() => setEditingProductId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {p.product_name} - {p.category?.category_name ?? "No Category"}
                <button onClick={() => startEditProduct(p)}>Edit</button>
                <button onClick={() => deleteProduct(p.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <hr />

      {/* ================= VARIANT ================= */}
      <h2>Variants</h2>

      {/* FIXED: correct product selector */}
      <select
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.product_name}
          </option>
        ))}
      </select>

      <input
        placeholder="Variant Name"
        value={variantName}
        onChange={(e) => setVariantName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={variantPrice}
        onChange={(e) => setVariantPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        value={variantStock}
        onChange={(e) => setVariantStock(e.target.value)}
      />

      <button onClick={createVariant}>Create Variant</button>

      <hr />

      {variants.map((v) => (
        <div key={v.id}>
          {editingVariantId === v.id ? (
            <>
              <input
                value={editingVariantData.variant_name}
                onChange={(e) =>
                  setEditingVariantData({
                    ...editingVariantData,
                    variant_name: e.target.value,
                  })
                }
              />

              <input
                value={editingVariantData.price}
                onChange={(e) =>
                  setEditingVariantData({
                    ...editingVariantData,
                    price: e.target.value,
                  })
                }
              />

              <input
                value={editingVariantData.stock}
                onChange={(e) =>
                  setEditingVariantData({
                    ...editingVariantData,
                    stock: e.target.value,
                  })
                }
              />

              <button onClick={() => saveVariant(v.id)}>Save</button>
            </>
          ) : (
            <>
              <b>{v.product.product_name}</b> | {v.variant_name} | ₱{v.price} | Stock: {v.stock}
              <button onClick={() => startEditVariant(v)}>Edit</button>
              <button onClick={() => deleteVariant(v.id)}>Delete</button>
            </>
          )}
        </div>
      ))}

    </div>
  );
}