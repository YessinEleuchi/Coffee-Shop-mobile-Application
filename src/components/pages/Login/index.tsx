import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "../../atoms";
import {LoginForm} from "../../organismes";

export default function LoginScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <AppText style={styles.title}>Welcome back</AppText>
            <AppText style={styles.subtitle}>Connecte-toi pour continuer</AppText>

            <View style={{ height: 18 }} />

            <LoginForm onSuccess={() => navigation.replace("Home")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 18,
        backgroundColor: "#F8FAFC",
    },
    title: { fontSize: 28, fontWeight: "900", color: "#0F172A" },
    subtitle: { marginTop: 6, color: "#64748B", fontSize: 14, fontWeight: "600" },
});
