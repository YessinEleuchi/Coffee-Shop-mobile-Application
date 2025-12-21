import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "../../atoms";
import { LoginForm } from "../../organismes";

export default function LoginScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <AppText style={styles.title}>Welcome back</AppText>

            <View style={{ height: 18 }} />

            {/* ✅ Après login -> on va vers MainApp (Stack) */}
            <LoginForm onSuccess={() => navigation.replace("MainApp")} />
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
});
