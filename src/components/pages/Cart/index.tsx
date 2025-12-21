import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useShopStore } from "../../../stores/useShopStore";

const Cart: React.FC = () => {
    const cart = useShopStore((s) => s.cart);
    const incQty = useShopStore((s) => s.incQty);
    const decQty = useShopStore((s) => s.decQty);
    const clearCart = useShopStore((s) => s.clearCart);

    const items = useMemo(() => Object.values(cart), [cart]);

    const total = useMemo(() => {
        return items.reduce((sum, it) => {
            const price = typeof it.product.price === "number" ? it.product.price : Number(it.product.price) || 0;
            return sum + price * it.qty;
        }, 0);
    }, [items]);

    if (items.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.title}>Cart</Text>
                <Text style={styles.empty}>Ton panier est vide.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Cart</Text>
                <TouchableOpacity onPress={clearCart}>
                    <Text style={styles.clear}>Clear</Text>
                </TouchableOpacity>
            </View>

            {items.map((it) => (
                <View key={it.product.id} style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{it.product.name}</Text>
                        <Text style={styles.sub}>{it.product.subtitle}</Text>

                        {/* ✅ optionnel: afficher prix unitaire */}
                        <Text style={styles.unitPrice}>
                            {((typeof it.product.price === "number" ? it.product.price : Number(it.product.price) || 0)).toFixed(3)}{" "}
                            DT
                        </Text>
                    </View>

                    <View style={styles.qtyBox}>
                        <TouchableOpacity onPress={() => decQty(it.product.id)} style={styles.qtyBtn}>
                            <Text style={styles.qtyBtnText}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.qty}>{it.qty}</Text>

                        <TouchableOpacity onPress={() => incQty(it.product.id)} style={styles.qtyBtn}>
                            <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            <View style={styles.footer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{total.toFixed(3)} DT</Text>
            </View>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60, backgroundColor: "#F8FAFC", paddingHorizontal: 18 },
    center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC" },

    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    title: { fontSize: 22, fontWeight: "900", color: "#0F172A" },
    clear: { color: "#EF4444", fontWeight: "800" },

    empty: { marginTop: 10, color: "#64748B" },

    row: {
        backgroundColor: "white",
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
    },
    name: { fontSize: 16, fontWeight: "800", color: "#0F172A" },
    sub: { marginTop: 3, fontSize: 12, color: "#64748B" },
    unitPrice: { marginTop: 6, fontSize: 12, fontWeight: "800", color: "#00512C" },

    qtyBox: { flexDirection: "row", alignItems: "center", gap: 10 },
    qtyBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#00512C",
        justifyContent: "center",
        alignItems: "center",
    },
    qtyBtnText: { color: "white", fontSize: 18, fontWeight: "900" },
    qty: { width: 24, textAlign: "center", fontWeight: "900", color: "#0F172A" },

    footer: {
        marginTop: "auto",
        backgroundColor: "white",
        borderRadius: 18,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    totalLabel: { color: "#64748B", fontWeight: "700" },
    totalValue: { fontSize: 20, fontWeight: "900", color: "#0F172A" },
});
