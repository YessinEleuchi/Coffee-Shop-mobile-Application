// stores/useFavoritesStore.ts
import { create } from "zustand";
import { FavoritesService } from "../services/favorites.service";
import { useAuthStore } from "./useAuthStore";
import type { Favorite } from "../lib/types";

type FavoritesStore = {
    favorites: Favorite[];
    loading: boolean;
    error: string | null;

    fetchFavorites: () => Promise<void>;
    toggleFavorite: (produitId: string) => Promise<boolean>;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
    favorites: [],
    loading: false,
    error: null,

    fetchFavorites: async () => {
        const token = useAuthStore.getState().token;
        if (!token) {
            set({ favorites: [], error: null });
            return;
        }

        try {
            set({ loading: true, error: null });
            const favs = await FavoritesService.getFavorites(token);
            set({ favorites: favs, loading: false });
        } catch (e: any) {
            set({ loading: false, error: e?.message || "Erreur favoris" });
        }
    },

    toggleFavorite: async (produitId: string) => {
        const token = useAuthStore.getState().token;
        if (!token) {
            set({ error: "No token provided" });
            return false;
        }

        const exists = get().favorites.some((f) => f.ProduitId === produitId);

        try {
            set({ loading: true, error: null });

            if (exists) {
                await FavoritesService.removeFavorite(produitId, token);
            } else {
                await FavoritesService.addFavorite(produitId, token);
            }

            // refresh
            const favs = await FavoritesService.getFavorites(token);
            set({ favorites: favs, loading: false });
            return true;
        } catch (e: any) {
            set({ loading: false, error: e?.message || "Erreur toggle favoris" });
            return false;
        }
    },
}));
