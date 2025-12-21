
import { apiGetAuth, apiPost, apiDeleteAuth } from "../lib/api";
import type { Favorite } from "../lib/types";

export const FavoritesService = {
    getFavorites: (token: string) => apiGetAuth<Favorite[]>("/favorites", token),

    addFavorite: (produitId: string, token: string) =>
        apiPost<{ message: string; favorite: Favorite }>(
            "/favorites",
            { ProduitId: produitId },
            token
        ),

    removeFavorite: (produitId: string, token: string) =>
        apiDeleteAuth<{ message: string }>(
            "/favorites",
            { ProduitId: produitId },
            token
        ),
};
