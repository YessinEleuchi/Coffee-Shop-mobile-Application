import React from "react";
import { ScrollView, View, StyleProp, ViewStyle } from "react-native";
import { ProductCard, Product } from "../../molecules";

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

    // ✅ source de vérité optionnelle (Zustand)
    isFavoriteById?: (id: string) => boolean;
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
                                         }: Props) {
    return (
        <View style={wrapperStyle}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[{ paddingLeft: 30, paddingVertical: 20 }, contentContainerStyle]}
            >
                {products.map((p, idx) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onPressCard={onOpenProduct}
                        onPressAdd={onAddToCart}
                        favoriteMode={favoriteMode}
                        isFavorite={isFavoriteById ? isFavoriteById(p.id) : p.isFavorite}
                        favIconOff={favIconOff}
                        favIconOn={favIconOn}
                        onToggleFavorite={onToggleFavorite}
                        cardStyle={idx === products.length - 1 ? { marginRight: 30 } : undefined}
                    />
                ))}
            </ScrollView>
        </View>
    );
}