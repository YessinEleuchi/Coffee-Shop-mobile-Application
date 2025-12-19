import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { profile, search, filter, coffee, capucin, fav, favicon } from "../../../assets";
import { HomeHeader, SearchBar } from "../../molecules";
import { Categories, ProductsCarousel } from "../../organismes";
import { AppText } from "../../atoms";

import { useShopStore } from "../../../stores/useShopStore";

const Home: React.FC = () => {
    const [q, setQ] = useState("");
    const [selectedCat, setSelectedCat] = useState("cappuccino");

    // ✅ Zustand
    const products = useShopStore((s) => s.products);
    const setProducts = useShopStore((s) => s.setProducts);
    const addToCart = useShopStore((s) => s.addToCart);
    const toggleFavorite = useShopStore((s) => s.toggleFavorite);

    // ✅ Init products une seule fois (si store vide)
    useEffect(() => {
        if (products.length > 0) return;

        setProducts([
            { id: "1", name: "Cappuccino", subtitle: "With Sugar", price: "3.500 DT", image: capucin, categoryId: "cappuccino", isFavorite: false },
            { id: "2", name: "Cappuccino", subtitle: "With Sugar", price: "3.500 DT", image: capucin, categoryId: "cappuccino", isFavorite: true },
            { id: "3", name: "Latte", subtitle: "With Milk", price: "4.200 DT", image: capucin, categoryId: "latte", isFavorite: false },
        ]);
    }, [products.length, setProducts]);

    const categories = useMemo(
        () => [
            { id: "cappuccino", title: "Cappuccino", icon: coffee },
            { id: "coffee", title: "Coffee", icon: coffee },
            { id: "espresso", title: "Espresso", icon: coffee },
            { id: "latte", title: "Latte", icon: coffee },
        ],
        []
    );

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();
        return products.filter((p) => {
            const matchQ = !qq || p.name.toLowerCase().includes(qq);
            const matchCat = !selectedCat || p.categoryId === selectedCat;
            return matchQ && matchCat;
        });
    }, [products, q, selectedCat]);

    return (
        <View style={{ flex: 1 }}>
            <HomeHeader avatar={profile} location="Sfax, Tunisia" />

            <View style={{ marginTop: 16 }}>
                <SearchBar
                    value={q}
                    onChangeText={setQ}
                    placeholder="Search Coffee..."
                    leftIcon={search}
                    rightIcon={filter}
                    onPressFilter={() => console.log("filter")}
                    containerStyle={{ marginHorizontal: 30 }}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                <Categories items={categories} selectedId={selectedCat} onSelect={setSelectedCat} />

                <ProductsCarousel
                    products={filtered}
                    onOpenProduct={(id) => console.log("open product", id)}
                    onAddToCart={(id) => addToCart(id)} // ✅ cart zustand
                />

                <AppText style={styles.heading}>Special Offer</AppText>

                <ProductsCarousel
                    products={products}
                    onOpenProduct={(id) => console.log("open product", id)}
                    onAddToCart={(id) => addToCart(id)} // ✅ cart zustand
                    favoriteMode="toggle"
                    favIconOff={favicon} // OFF
                    favIconOn={fav}      // ON
                    onToggleFavorite={(id) => toggleFavorite(id)} // ✅ favorites zustand
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: { marginHorizontal: 30, fontWeight: "700", color: "#0F172A" },
});

export default Home;
