import React, { useMemo } from "react";
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
import type { Product } from "../../../lib/types";
import { BASE_URL } from "../../../lib/api";

type Props = {
    product: Product;
    onPressCard: (id: string) => void;
    onPressAdd: (id: string) => void;

    favoriteMode?: "hidden" | "toggle";
    isFavorite?: boolean; // optionnel: override depuis parent
    favIconOff?: ImageSourcePropType;
    favIconOn?: ImageSourcePropType;
    onToggleFavorite?: (id: string) => void;

    favoriteLoading?: boolean; // ✅ bloque le clic pendant request

    cardStyle?: StyleProp<ViewStyle>;
    imageWrapStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
    priceStyle?: StyleProp<TextStyle>;
    addButtonStyle?: StyleProp<ViewStyle>;
};

function formatDT(price: number) {
    if (Number.isFinite(price)) return `${price.toFixed(3)} DT`;
    return "—";
}

function resolveImageUri(image?: string) {
    if (!image) return "";
    // déjà une URL complète
    if (/^https?:\/\//i.test(image)) return image;
    // chemin relatif backend: uploads/...
    const slash = image.startsWith("/") ? "" : "/";
    return `${BASE_URL}${slash}${image}`;
}

export default function ProductCard({
                                        product,
                                        onPressCard,
                                        onPressAdd,

                                        favoriteMode = "hidden",
                                        isFavorite,
                                        favIconOff,
                                        favIconOn,
                                        onToggleFavorite,
                                        favoriteLoading = false,

                                        cardStyle,
                                        imageWrapStyle,
                                        imageStyle,
                                        titleStyle,
                                        subtitleStyle,
                                        priceStyle,
                                        addButtonStyle,
                                    }: Props) {
    const fav = isFavorite ?? (product as any)?.isFavorite ?? false;

    const priceLabel = useMemo(() => {
        const p = (product as any).price;
        return typeof p === "number" ? formatDT(p) : String(p ?? "");
    }, [product]);

    const imageUri = useMemo(() => resolveImageUri(product.image), [product.image]);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPressCard(product.id)}
            style={[styles.card, cardStyle]}
        >
            {/* Image */}
            <View style={[styles.imageWrap, imageWrapStyle]}>
                <Image source={imageUri ? { uri: imageUri } : undefined}
                       style={[styles.image, imageStyle]}
                       resizeMode="cover" />
            </View>

            {/* Title + subtitle */}
            <View style={styles.info}>
                <View style={styles.titleRow}>
                    <AppText style={[styles.title, titleStyle]} numberOfLines={1}>
                        {product.name}
                    </AppText>

                    {favoriteMode === "toggle" && favIconOff && favIconOn && (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.favInlineBtn}
                            disabled={favoriteLoading}
                            onPress={(e: any) => {
                                e.stopPropagation?.();
                                if (!favoriteLoading) onToggleFavorite?.(product.id);
                            }}
                        >
                            <Image
                                source={fav ? favIconOn : favIconOff}
                                style={[styles.favInlineIcon, favoriteLoading && { opacity: 0.5 }]}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )}
                </View>

                <AppText style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
                    {product.subtitle}
                </AppText>
            </View>

            {/* Bottom row */}
            <View style={styles.bottom}>
                <AppText style={[styles.price, priceStyle]}>{priceLabel}</AppText>

                <IconButton
                    style={[styles.addBtn, addButtonStyle]}
                    onPress={(e: any) => {
                        e.stopPropagation?.();
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
    image: { width: "100%", height: 120, backgroundColor: "#F1F5F9" },

    info: { marginTop: 10, paddingHorizontal: 6 },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    favInlineBtn: { padding: 4, marginLeft: 10 },
    favInlineIcon: { width: 16, height: 16 },

    title: { fontSize: 20, fontWeight: "700", color: "#0F172A", flex: 1, marginRight: 8 },
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
