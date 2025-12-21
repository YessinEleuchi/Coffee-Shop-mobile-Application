import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { profile, search, filter, fav, favicon } from "../../../assets";
import { HomeHeader, SearchBar } from "../../molecules";
import { Categories, ProductsCarousel } from "../../organismes";
import { AppText } from "../../atoms";

import { useShopStore } from "../../../stores/useShopStore";
import { useFavoritesStore } from "../../../stores/useFavoritesStore";

const Home: React.FC = () => {
    const [q, setQ] = useState("");
    const [selectedCatId, setSelectedCatId] = useState<string>("");

    // ✅ catalog store
    const categories = useShopStore((s) => s.categories);
    const products = useShopStore((s) => s.products);
    const loadingCatalog = useShopStore((s) => s.loading);
    const errorCatalog = useShopStore((s) => s.error);

    const fetchCategories = useShopStore((s) => s.fetchCategories);
    const fetchProducts = useShopStore((s) => s.fetchProducts);
    // const fetchProductsByCategory = useShopStore((s) => s.fetchProductsByCategory);

    // ✅ favorites store (protected)
    const favorites = useFavoritesStore((s) => s.favorites);
    const loadingFav = useFavoritesStore((s) => s.loading);
    const errorFav = useFavoritesStore((s) => s.error);

    const fetchFavorites = useFavoritesStore((s) => s.fetchFavorites);
    const favLoading = useFavoritesStore((s) => s.loading);
    const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

    // ✅ init
    useEffect(() => {
        fetchCategories();
        fetchProducts();
        fetchFavorites();
    }, [fetchCategories, fetchProducts, fetchFavorites]);

    // ✅ sélectionner la première catégorie dès qu'elle arrive
    useEffect(() => {
        if (!selectedCatId && categories.length > 0) {
            setSelectedCatId(categories[0].id);
        }
    }, [categories, selectedCatId]);

    const categoriesUI = useMemo(
        () => categories.map((c) => ({ id: c.id, title: c.title, icon: c.icon })), // icon peut être emoji/uri/local (selon ButtonCat)
        [categories]
    );

    const favIds = useMemo(() => {
        return new Set(favorites.map((f) => f.ProduitId));
    }, [favorites]);

    // ✅ merge products + isFavorite
    const productsWithFav = useMemo(() => {
        return products.map((p) => ({ ...p, isFavorite: favIds.has(p.id) }));
    }, [products, favIds]);

    // ✅ filter (client side) sur productsWithFav
    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();

        return productsWithFav.filter((p) => {
            const matchQ =
                !qq ||
                p.name.toLowerCase().includes(qq) ||
                (p.subtitle || "").toLowerCase().includes(qq);

            const matchCat = !selectedCatId || p.categorieId === selectedCatId;
            return matchQ && matchCat;
        });
    }, [productsWithFav, q, selectedCatId]);

    const loading = loadingCatalog || loadingFav;
    const error = errorCatalog || errorFav;

    return (
        <View style={{ flex: 1 }}>
            <HomeHeader avatar={profile} location="Sfax, Tunisia" />

            <View style={{ marginTop: 16 }}>
                <SearchBar
                    value={q}
                    onChangeText={setQ}
                    placeholder="Search Coffee..."
                    leftIcon={search}
                    rightIcon={filter}
                    onPressFilter={() => console.log("filter")}
                    containerStyle={{ marginHorizontal: 30 }}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                <Categories items={categoriesUI} selectedId={selectedCatId} onSelect={setSelectedCatId} />

                {!!error && <AppText style={styles.error}>{error}</AppText>}
                {loading && <AppText style={styles.loading}>Loading...</AppText>}




                <ProductsCarousel
                    products={filtered}
                    onOpenProduct={(id) => console.log(id)}
                    onAddToCart={(id) => console.log(id)}
                    favoriteMode="toggle"
                    favIconOff={favicon}
                    favIconOn={fav}
                    onToggleFavorite={toggleFavorite}
                    favoriteLoading={favLoading}
                />


                <AppText style={styles.heading}>Special Offer</AppText>

                {/* Tous les produits */}
                <ProductsCarousel
                    products={productsWithFav}
                    onAddToCart={(id) => console.log("addToCart", id)}
                    onOpenProduct={(id) => console.log(id)}
                    favoriteMode="toggle"
                    favIconOff={favicon}
                    favIconOn={fav}
                    onToggleFavorite={toggleFavorite}
                    favoriteLoading={favLoading}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: { marginHorizontal: 30, fontWeight: "700", color: "#0F172A" },
    loading: { marginHorizontal: 30, marginTop: 8, color: "#64748B", fontWeight: "600" },
    error: { marginHorizontal: 30, marginTop: 8, color: "#EF4444", fontWeight: "700" },
});

export default Home;
