import React from "react";
import { View, StyleSheet } from "react-native";
import {AppText} from "../../atoms";

type Props = { title: string; subtitle: string };

const  HeadSplash: React.FC<Props>=({ title, subtitle }: Props)=> {
    return (
        <View style={styles.wrap}>
            <AppText variant="title" style={styles.title}>{title}</AppText>
            <AppText variant="body" style={styles.body}>{subtitle}</AppText>
        </View>
    );
}
export default HeadSplash;

const styles = StyleSheet.create({
    wrap: { marginTop: 30 },
    title: {
    fontSize: 24,
        fontWeight: "600",
        color: "white",
        textAlign: "center",
        paddingHorizontal: 60,},
    body: { fontSize: 14,
        color: "white",
        textAlign: "center",
        paddingHorizontal: 60,
        opacity: 0.9,
        marginTop: 10 },
});
