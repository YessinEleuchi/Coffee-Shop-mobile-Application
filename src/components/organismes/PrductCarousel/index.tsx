import React from "react";
import { ScrollView, View, StyleProp, ViewStyle } from "react-native";
import { ProductCard } from "../../molecules";
import type { Product } from "../../../lib/types";

type Props = {
    products: Product[];
    onOpenProduct: (id: string) => void;
    onAddToCart: (id: string) => void;

    contentContainerStyle?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;

    favoriteMode?: "hidden" | "toggle";
    favIconOff?: any;
    favIconOn?: any;
    onToggleFavorite?: (id: string) => void;

    // ✅ optionnel: si tu veux calculer fav depuis un store (Set)
    isFavoriteById?: (id: string) => boolean;

    // ✅ optionnel: bloque le bouton fav pendant la requête
    favoriteLoading?: boolean;
};

export default function ProductsCarousel({
                                             products,
                                             onOpenProduct,
                                             onAddToCart,
                                             contentContainerStyle,
                                             wrapperStyle,

                                             favoriteMode = "hidden",
                                             favIconOff,
                                             favIconOn,
                                             onToggleFavorite,

                                             isFavoriteById,
                                             favoriteLoading = false,
                                         }: Props) {
    return (
        <View style={wrapperStyle}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[{ paddingLeft: 30, paddingVertical: 20 }, contentContainerStyle]}
            >
                {products.map((p, idx) => {
                    // ✅ source de vérité du fav :
                    // 1) isFavoriteById si fourni
                    // 2) sinon product.isFavorite (merge déjà fait dans Home)
                    const isFav = isFavoriteById ? isFavoriteById(p.id) : (p as any).isFavorite;

                    return (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onPressCard={onOpenProduct}
                            onPressAdd={onAddToCart}
                            favoriteMode={favoriteMode}
                            isFavorite={!!isFav}
                            favIconOff={favIconOff}
                            favIconOn={favIconOn}
                            onToggleFavorite={onToggleFavorite}
                            favoriteLoading={favoriteLoading}
                            cardStyle={idx === products.length - 1 ? { marginRight: 30 } : undefined}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}
