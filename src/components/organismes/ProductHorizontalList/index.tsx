import React from "react";
import {
    FlatList,
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
    Text,
} from "react-native";
import { ProductCard, Product } from "../../molecules";

type Props = {
    products: Product[];

    onPressCard: (id: string) => void;
    onPressAdd: (id: string) => void;

    favoriteMode?: "hidden" | "toggle";
    favIconOff?: any;
    favIconOn?: any;
    onToggleFavorite?: (id: string) => void;

    containerStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;

    isFavoriteById?: (id: string) => boolean;
};

export default function ProductsGridList({
                                             products,
                                             onPressCard,
                                             onPressAdd,

                                             favoriteMode = "hidden",
                                             favIconOff,
                                             favIconOn,
                                             onToggleFavorite,

                                             containerStyle,
                                             contentStyle,

                                             isFavoriteById,
                                         }: Props) {
    if (!products?.length) {
        return (
            <View style={[styles.emptyWrap, containerStyle]}>
                <Text style={styles.emptyTitle}>Aucun produit</Text>
                <Text style={styles.emptySub}>Ajoute des produits ou marque-les en favoris.</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, containerStyle]}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.content, contentStyle]}
                columnWrapperStyle={styles.row} // ✅ spacing horizontal entre 2 cards
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <ProductCard
                            product={item}
                            onPressCard={onPressCard}
                            onPressAdd={onPressAdd}
                            favoriteMode={favoriteMode}
                            favIconOff={favIconOff}
                            favIconOn={favIconOn}
                            onToggleFavorite={onToggleFavorite}
                            isFavorite={isFavoriteById ? isFavoriteById(item.id) : undefined}
                            // ✅ design compact pour grid
                            cardStyle={styles.card}
                            imageStyle={styles.image}
                            titleStyle={styles.title}
                            subtitleStyle={styles.subtitle}
                            priceStyle={styles.price}
                            addButtonStyle={styles.addBtn}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    content: {
        paddingHorizontal: 18,
        paddingTop: 14,
        paddingBottom: 24,
    },

    // Chaque ligne (2 colonnes)
    row: {
        justifyContent: "space-between",
        marginBottom: 14,
    },

    // wrapper pour garantir 2 items alignés
    item: {
        width: "48.5%", // ✅ 2 items avec espace au milieu
    },

    // Styles appliqués à ProductCard
    card: {
        width: "100%",
        height: 245,
        borderRadius: 22,
        padding: 10,
        marginRight: 0, // important en grid
    },
    image: { height: 105 },
    title: { fontSize: 16, fontWeight: "800" },
    subtitle: { fontSize: 12, marginTop: 4 },
    price: { fontSize: 18, fontWeight: "900" },
    addBtn: { width: 44, height: 44, borderRadius: 22 },

    // Empty state
    emptyWrap: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyTitle: { fontSize: 18, fontWeight: "800", color: "#0F172A" },
    emptySub: { marginTop: 6, fontSize: 13, color: "#64748B", textAlign: "center" },
});
