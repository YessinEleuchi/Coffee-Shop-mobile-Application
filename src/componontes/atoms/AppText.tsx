import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

type Props = TextProps & {
    variant?: "title" | "body" | "button";
};

export default function AppText({ variant = "body", style, ...props }: Props) {
    return <Text {...props} style={[styles.base, styles[variant], style]} />;
}

const styles = StyleSheet.create({
    base: { color: "white" },
    title: { fontSize: 24, fontWeight: "600", textAlign: "center" },
    body: { fontSize: 14, textAlign: "center", opacity: 0.9 },
    button: { fontSize: 16, fontWeight: "600", textAlign: "center" },
});
