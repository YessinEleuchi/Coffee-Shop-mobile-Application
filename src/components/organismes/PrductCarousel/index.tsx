import React from "react";
import {ScrollView, View, StyleProp, ViewStyle} from "react-native";
import {ProductCard, Product} from "../../molecules";


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
                                         }: Props) {
    return (
        <View style={wrapperStyle}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[{paddingLeft: 30, paddingVertical: 20}, contentContainerStyle]}
            >
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onPressCard={onOpenProduct}
                        onPressAdd={onAddToCart}
                        favoriteMode={favoriteMode}
                        isFavorite={p.isFavorite}
                        favIconOff={favIconOff}
                        favIconOn={favIconOn}
                        onToggleFavorite={onToggleFavorite}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
