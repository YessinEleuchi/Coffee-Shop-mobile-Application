import React, { useEffect, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";

import { ProductHorizontalList } from "../../organismes";
import { fav, favicon } from "../../../assets";

import { useShopStore } from "../../../stores/useShopStore";
import { useFavoritesStore } from "../../../stores/useFavoritesStore";
import type { Product } from "../../../lib/types";

const Favorite: React.FC = () => {
    // ✅ cart
    const addToCart = useShopStore((s) => s.addToCart);
    const productsCatalog = useShopStore((s) => s.products); // au cas où addToCart a besoin du catalog

    // ✅ favorites backend
    const favorites = useFavoritesStore((s) => s.favorites);
    const loading = useFavoritesStore((s) => s.loading);
    const error = useFavoritesStore((s) => s.error);
    const fetchFavorites = useFavoritesStore((s) => s.fetchFavorites);
    const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    // ✅ transformer favorites -> products
    const favoriteProducts: Product[] = useMemo(() => {
        return favorites
            .map((f) => f.Produit)
            .filter(Boolean)
            .map((p) => ({ ...p, isFavorite: true } as any)); // isFavorite utile pour UI
    }, [favorites]);

    // Option A (simple) : addToCart(id) (si ton addToCart trouve le produit dans shop.products)
    const handleAddToCart = (id: string) => {
        // Si ton addToCart dépend de shop.products, on s'assure qu'il existe
        const existsInCatalog = productsCatalog.some((p) => p.id === id);
        if (!existsInCatalog) {
            console.warn("Produit pas trouvé dans catalog, addToCart peut échouer:", id);
        }
        addToCart(id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorite</Text>

            {!!error && <Text style={styles.error}>{error}</Text>}
            {loading && <Text style={styles.loading}>Loading...</Text>}

            {!loading && favoriteProducts.length === 0 ? (
                <Text style={styles.empty}>Aucun produit en favoris.</Text>
            ) : (
                <ProductHorizontalList
                    products={favoriteProducts}
                    onPressCard={(id) => console.log("open details", id)}
                    onPressAdd={handleAddToCart}
                    favoriteMode="toggle"
                    favIconOff={favicon}
                    favIconOn={fav}
                    onToggleFavorite={toggleFavorite} // ✅ toggle backend (add/delete)
                    containerStyle={{ marginTop: 16 }}
                />
            )}
        </View>
    );
};

export default Favorite;

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60, backgroundColor: "#F8FAFC" },
    title: { fontSize: 22, fontWeight: "800", marginHorizontal: 30, color: "#0F172A" },
    empty: { marginTop: 20, marginHorizontal: 30, color: "#64748B" },
    loading: { marginTop: 12, marginHorizontal: 30, color: "#64748B", fontWeight: "700" },
    error: { marginTop: 12, marginHorizontal: 30, color: "#EF4444", fontWeight: "800" },
});
