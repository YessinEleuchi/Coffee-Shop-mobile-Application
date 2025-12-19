import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";

import { ProductHorizontalList } from "../../organismes";
import { fav, favicon } from "../../../assets";
import { useShopStore } from "../../../stores/useShopStore";

const Favorite: React.FC = () => {
    const products = useShopStore((s) => s.products);
    const toggleFavorite = useShopStore((s) => s.toggleFavorite);
    const addToCart = useShopStore((s) => s.addToCart);

    const favoriteProducts = useMemo(
        () => products.filter((p) => p.isFavorite),
        [products]
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorite</Text>

            {favoriteProducts.length === 0 ? (
                <Text style={styles.empty}>Aucun produit en favoris.</Text>
            ) : (
                <ProductHorizontalList
                    products={favoriteProducts}
                    onPressCard={(id) => console.log("open details", id)}
                    onPressAdd={(id) => addToCart(id)} // ✅ ajout panier réel
                    favoriteMode="toggle"
                    favIconOff={favicon}
                    favIconOn={fav}
                    onToggleFavorite={toggleFavorite}
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
});
