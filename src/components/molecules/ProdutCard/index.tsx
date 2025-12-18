import React from "react";
import {
    View,
    Image,
    StyleSheet,
    ImageSourcePropType,
    Pressable,
    StyleProp,
    ViewStyle,
    ImageStyle,
    TextStyle, TouchableOpacity,
} from "react-native";
import {IconButton} from "../../atoms";
import { AppText } from "../../atoms";

export interface Product {
    id: string,
    name: string,
    subtitle: string,
    price: string,
    image: ImageSourcePropType,
}

type Props = {
    product: Product;
    onPressCard: (id: string) => void;
    onPressAdd: (id: string) => void;


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
                                        cardStyle,
                                        imageWrapStyle,
                                        imageStyle,
                                        titleStyle,
                                        subtitleStyle,
                                        priceStyle,
                                        addButtonStyle,
                                    }: Props) {
    return (
        <TouchableOpacity activeOpacity={0.7}
           // onPress={() => onPressCard(product.id)}
            style={[styles.card, cardStyle]}
        >
            {/* Image */}
            <View style={[styles.imageWrap, imageWrapStyle]}>
                <Image source={product.image} style={[styles.image, imageStyle]} resizeMode="cover" />
            </View>

            {/* Title + subtitle */}
            <View style={styles.info}>
                <AppText style={[styles.title, titleStyle]}>{product.name}</AppText>
                <AppText style={[styles.subtitle, subtitleStyle]}>{product.subtitle}</AppText>
            </View>

            {/* Bottom row */}
            <View style={styles.bottom}>
                <AppText style={[styles.price, priceStyle]}>{product.price}</AppText>

                {/* ✅ le + doit être cliquable sans déclencher la card */}
                <TouchableOpacity activeOpacity={0.7}
                    style={[styles.addBtn, addButtonStyle]}
                    onPress={() => onPressAdd(product.id)}
                >
                    <AppText style={styles.plus}>+</AppText>
                </TouchableOpacity>
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
