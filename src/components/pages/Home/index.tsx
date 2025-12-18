import React, { useMemo, useState } from "react";
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {profile, search, filter, coffee, capucin, add, faviourateMenu, fav} from "../../../assets";
import { HomeHeader, SearchBar } from "../../molecules";
import {Categories, ProductsCarousel} from "../../organismes";
import { AppText } from "../../atoms";

const Home: React.FC = () => {
    const [q, setQ] = useState("");
    const [selectedCat, setSelectedCat] = useState("cappuccino");

    const categories = useMemo(
        () => [
            { id: "cappuccino", title: "Cappuccino", icon: coffee },
            { id: "coffee", title: "Coffee", icon: coffee },
            { id: "espresso", title: "Espresso", icon: coffee },
            { id: "latte", title: "Latte", icon: coffee },
        ],
        []
    );


    const products = useMemo(
        () => [
            { id: "1", name: "Cappuccino", subtitle: "With Sugar", price: "3.500 DT", image: capucin },
            { id: "2", name: "Cappuccino", subtitle: "With Sugar", price: "3.500 DT", image: capucin },
        ],
        []
    );

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase())
    );


    return (
        <View style={{ flex: 1 }}>
            <HomeHeader avatar={profile} location="Sfax, Tunisia" />

            <AppText style={{ marginHorizontal: 30, marginTop: 15, fontWeight: "700", color: "#0F172A" }}>
                Good Morning, Yessine
            </AppText>

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

            <Categories
                items={categories}
                selectedId={selectedCat}
                onSelect={setSelectedCat}
            />


            <ProductsCarousel
                products={filtered}
                onOpenProduct={(id) => console.log("open product", id)}
                onAddToCart={(id) => console.log("add to cart", id)}
            />

        </View>
    );
};
const styles = StyleSheet.create({
});

export default Home;
