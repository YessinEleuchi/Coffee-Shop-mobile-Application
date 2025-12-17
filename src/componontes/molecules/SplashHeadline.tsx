import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../atoms/AppText";

type Props = { title: string; subtitle: string };

export default function SplashHeadline({ title, subtitle }: Props) {
    return (
        <View style={styles.wrap}>
            <AppText variant="title" style={styles.titlePad}>{title}</AppText>
            <AppText variant="body" style={styles.bodyPad}>{subtitle}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { marginTop: 30 },
    titlePad: { paddingHorizontal: 60 },
    bodyPad: { paddingHorizontal: 60, marginTop: 10 },
});
