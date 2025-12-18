import React from "react";
import {
    View,
    Image,
    StyleSheet,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    ImageStyle,
    TextStyle,
    TouchableOpacity,
} from "react-native";
import { AppText, IconButton } from "../../atoms";

export interface Product {
    id: string;
    name: string;
    subtitle: string;
    price: string;
    image: ImageSourcePropType;
    isFavorite?: boolean;
}

type Props = {
    product: Product;
    onPressCard: (id: string) => void;
    onPressAdd: (id: string) => void;
    favoriteMode?: "hidden" | "toggle";
    isFavorite?: boolean;
    favIconOff?: ImageSourcePropType;
    favIconOn?: ImageSourcePropType;
    onToggleFavorite?: (id: string) => void;
    cardStyle?: StyleProp<ViewStyle>;
    imageWrapStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
    priceStyle?: StyleProp<TextStyle>;
    addButtonStyle?: StyleProp<ViewStyle>;
};

export default function ProductCard({
                                        product,
                                        onPressCard,
                                        onPressAdd,

                                        favoriteMode = "hidden",
                                        isFavorite,
                                        favIconOff,
                                        favIconOn,
                                        onToggleFavorite,

                                        cardStyle,
                                        imageWrapStyle,
                                        imageStyle,
                                        titleStyle,
                                        subtitleStyle,
                                        priceStyle,
                                        addButtonStyle,
                                    }: Props) {
    // ✅ source de vérité : prop isFavorite si fournie, sinon product.isFavorite
    const fav = isFavorite ?? product.isFavorite ?? false;

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPressCard(product.id)}
            style={[styles.card, cardStyle]}
        >
            {/* Image */}
            <View style={[styles.imageWrap, imageWrapStyle]}>
                <Image
                    source={product.image}
                    style={[styles.image, imageStyle]}
                    resizeMode="cover"
                />

            </View>

            {/* Title + subtitle */}
            {/* Title + subtitle */}
            <View style={styles.info}>
                <View style={styles.titleRow}>
                    <AppText style={[styles.title, titleStyle]}>{product.name}</AppText>

                    {favoriteMode === "toggle" && favIconOff && favIconOn && (
                        <IconButton
                            activeOpacity={0.6}
                            style={styles.favInlineBtn}
                            onPress={(e) => {
                                e.stopPropagation?.();
                                onToggleFavorite?.(product.id);
                            }}
                        >
                            <Image
                                source={fav ? favIconOn : favIconOff}
                                style={styles.favInlineIcon}
                                resizeMode="contain"
                            />
                        </IconButton>
                    )}
                </View>

                <AppText style={[styles.subtitle, subtitleStyle]}>{product.subtitle}</AppText>
            </View>


            {/* Bottom row */}
            <View style={styles.bottom}>
                <AppText style={[styles.price, priceStyle]}>{product.price}</AppText>

                <IconButton
                    style={[styles.addBtn, addButtonStyle]}
                    onPress={(e: any) => {
                        e.stopPropagation?.(); // ✅ ne déclenche pas la card
                        onPressAdd(product.id);
                    }}
                >
                    <AppText style={styles.plus}>+</AppText>
                </IconButton>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 210,
        height: 270,
        backgroundColor: "white",
        borderRadius: 28,
        padding: 10,
        marginRight: 14,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
    },

    imageWrap: { borderRadius: 22, overflow: "hidden" },
    image: { width: "100%", height: 120 },

    info: { marginTop: 10, paddingHorizontal: 6 },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    favInlineBtn: {
        padding: 4,
        marginLeft: 10,
    },

    favInlineIcon: {
        width: 16,
        height: 16,
    },
    title: { fontSize: 20, fontWeight: "700", color: "#0F172A" },
    subtitle: { marginTop: 6, fontSize: 13, color: "#6B7280" },

    bottom: {
        marginTop: 12,
        paddingHorizontal: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    price: { fontSize: 22, fontWeight: "800", color: "#0F172A" },

    addBtn: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#00512C",
        alignItems: "center",
        justifyContent: "center",
    },
    plus: { color: "white", fontSize: 28, fontWeight: "700", marginTop: -2 },
});
