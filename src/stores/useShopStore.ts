import { create } from "zustand";
import type { ImageSourcePropType } from "react-native";

export type Product = {
    id: string;
    name: string;
    subtitle: string;
    price: string;
    image: ImageSourcePropType;
    categoryId?: string;
    isFavorite?: boolean;
};

type CartItem = { product: Product; qty: number };

type ShopState = {
    products: Product[];
    cart: Record<string, CartItem>;
    setProducts: (products: Product[]) => void;
    toggleFavorite: (id: string) => void;
    addToCart: (id: string) => void;
    incQty: (id: string) => void;
    decQty: (id: string) => void;
    removeFromCart: (id: string) => void;
};

export const useShopStore = create<ShopState>((set, get) => ({
    products: [],
    cart: {},

    setProducts: (products) => set({ products }),

    toggleFavorite: (id) =>
        set((state) => ({
            products: state.products.map((p) =>
                p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
            ),
        })),

    addToCart: (id) => {
        const p = get().products.find((x) => x.id === id);
        if (!p) return;

        set((state) => {
            const existing = state.cart[id];
            return {
                cart: {
                    ...state.cart,
                    [id]: existing
                        ? { ...existing, qty: existing.qty + 1 }
                        : { product: p, qty: 1 },
                },
            };
        });
    },

    incQty: (id) =>
        set((state) => {
            const it = state.cart[id];
            if (!it) return state;
            return { cart: { ...state.cart, [id]: { ...it, qty: it.qty + 1 } } };
        }),

    decQty: (id) =>
        set((state) => {
            const it = state.cart[id];
            if (!it) return state;

            if (it.qty <= 1) {
                const copy = { ...state.cart };
                delete copy[id];
                return { cart: copy };
            }

            return { cart: { ...state.cart, [id]: { ...it, qty: it.qty - 1 } } };
        }),

    removeFromCart: (id) =>
        set((state) => {
            const copy = { ...state.cart };
            delete copy[id];
            return { cart: copy };
        }),
}));
