import { create } from "zustand";
import type { Category, Product } from "../lib/types";
import { CatalogService } from "../services/catalog.service";

type ShopStore = {
    categories: Category[];
    products: Product[];

    loading: boolean;
    error: string | null;

    fetchCategories: () => Promise<void>;
    fetchProducts: () => Promise<void>;
    fetchProductsByCategory: (categoryId: string) => Promise<void>;

    // ✅ cart (tu l'utilises déjà)
    cart: Record<string, { product: Product; qty: number }>;
    addToCart: (id: string) => void;
    incQty: (id: string) => void;
    decQty: (id: string) => void;
    clearCart: () => void;
};

export const useShopStore = create<ShopStore>((set, get) => ({
    categories: [],
    products: [],

    loading: false,
    error: null,

    fetchCategories: async () => {
        try {
            set({ loading: true, error: null });
            const categories = await CatalogService.getCategories();
            set({ categories, loading: false });
        } catch (e: any) {
            set({ loading: false, error: e?.message || "Erreur categories" });
        }
    },

    fetchProducts: async () => {
        try {
            set({ loading: true, error: null });
            const products = await CatalogService.getProducts();
            set({ products, loading: false });
        } catch (e: any) {
            set({ loading: false, error: e?.message || "Erreur produits" });
        }
    },

    fetchProductsByCategory: async (categoryId: string) => {
        try {
            set({ loading: true, error: null });
            const products = await CatalogService.getProductsByCategory(categoryId);
            set({ products, loading: false });
        } catch (e: any) {
            set({ loading: false, error: e?.message || "Erreur produits par catégorie" });
        }
    },

    // ---------------- CART ----------------
    cart: {},

    addToCart: (id) => {
        const p = get().products.find((x) => x.id === id);
        if (!p) return;

        const cart = { ...get().cart };
        const existing = cart[id];

        cart[id] = existing ? { product: p, qty: existing.qty + 1 } : { product: p, qty: 1 };
        set({ cart });
    },

    incQty: (id) => {
        const cart = { ...get().cart };
        const it = cart[id];
        if (!it) return;
        cart[id] = { ...it, qty: it.qty + 1 };
        set({ cart });
    },

    decQty: (id) => {
        const cart = { ...get().cart };
        const it = cart[id];
        if (!it) return;
        const nextQty = it.qty - 1;
        if (nextQty <= 0) delete cart[id];
        else cart[id] = { ...it, qty: nextQty };
        set({ cart });
    },

    clearCart: () => set({ cart: {} }),
}));
