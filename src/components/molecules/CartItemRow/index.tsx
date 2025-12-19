import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText, IconButton } from "../../atoms";

export type CartItem = {
    productId: string;
    name: string;
    subtitle?: string;
    price: number;
    image: any;
    quantity: number;
};

type Props = {
    item: CartItem;
    onPressItem?: (id: string) => void;

    onDecrease: (id: string) => void;
    onIncrease: (id: string) => void;
    onRemove: (id: string) => void;
};

export default function CartItemRow({
                                        item,
                                        onPressItem,
                                        onDecrease,
                                        onIncrease,
                                        onRemove,
                                    }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onPressItem?.(item.productId)}
            style={styles.row}
        >
            <View style={styles.imageWrap}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
            </View>

            <View style={styles.mid}>
                <AppText style={styles.title} numberOfLines={1}>
                    {item.name}
                </AppText>
                {!!item.subtitle && (
                    <AppText style={styles.subtitle} numberOfLines={1}>
                        {item.subtitle}
                    </AppText>
                )}

                <View style={styles.bottomLine}>
                    <AppText style={styles.price}>{item.price.toFixed(2)} DT</AppText>

                    <View style={styles.qtyWrap}>
                        <IconButton
                            style={styles.qtyBtn}
                            onPress={(e: any) => {
                                e.stopPropagation?.();
                                onDecrease(item.productId);
                            }}
                        >
                            <AppText style={styles.qtyBtnText}>-</AppText>
                        </IconButton>

                        <AppText style={styles.qty}>{item.quantity}</AppText>

                        <IconButton
                            style={[styles.qtyBtn, styles.qtyBtnDark]}
                            onPress={(e: any) => {
                                e.stopPropagation?.();
                                onIncrease(item.productId);
                            }}
                        >
                            <AppText style={[styles.qtyBtnText, styles.qtyBtnTextLight]}>+</AppText>
                        </IconButton>
                    </View>
                </View>
            </View>

            <IconButton
                style={styles.removeBtn}
                onPress={(e: any) => {
                    e.stopPropagation?.();
                    onRemove(item.productId);
                }}
            >
                <AppText style={styles.removeText}>×</AppText>
            </IconButton>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    imageWrap: {
        width: 72,
        height: 72,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "#F1F5F9",
    },
    image: { width: "100%", height: "100%" },

    mid: { flex: 1, marginLeft: 12 },
    title: { fontSize: 16, fontWeight: "800", color: "#0F172A" },
    subtitle: { marginTop: 4, fontSize: 12, color: "#64748B" },

    bottomLine: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    price: { fontSize: 16, fontWeight: "900", color: "#0F172A" },

    qtyWrap: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F5F9",
        borderRadius: 16,
        paddingHorizontal: 8,
        height: 36,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    qtyBtnDark: { backgroundColor: "#00512C" },
    qtyBtnText: { fontSize: 18, fontWeight: "900", color: "#0F172A", marginTop: -2 },
    qtyBtnTextLight: { color: "white" },
    qty: { width: 28, textAlign: "center", fontSize: 14, fontWeight: "800", color: "#0F172A" },

    removeBtn: {
        marginLeft: 10,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#FEE2E2",
        alignItems: "center",
        justifyContent: "center",
    },
    removeText: { fontSize: 22, fontWeight: "900", color: "#991B1B", marginTop: -2 },
});
