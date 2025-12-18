import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AppText } from "../../atoms";
import {ButtonCat} from "../../molecules";

export type CategoryItem = {
    id: string;
    title: string;
    icon: any;
};

type Props = {
    title?: string;
    items: CategoryItem[];
    selectedId: string;
    onSelect: (id: string) => void;
};

export default function Categories({
                                       title = "Categories",
                                       items,
                                       selectedId,
                                       onSelect,
                                   }: Props) {
    return (
        <View style={styles.wrap}>
            <AppText style={styles.heading}>{title}</AppText>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.row}
            >
                {items.map((it) => (
                    <ButtonCat
                        key={it.id}
                        title={it.title}
                        icon={it.icon}
                        active={it.id === selectedId}
                        onPress={() => onSelect(it.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { marginTop: 18 },
    heading: { marginHorizontal: 30, fontWeight: "700", color: "#0F172A" },
    row: { paddingHorizontal: 30, paddingTop: 12, paddingBottom: 6 },
});
