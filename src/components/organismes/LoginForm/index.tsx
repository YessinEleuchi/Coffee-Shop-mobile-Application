import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText, AppTextInput, AppButton } from "../../atoms";
import { useAuthStore } from "../../../stores/useAuthStore";

type Props = {
    onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: Props) {
    const login = useAuthStore((s) => s.login);
    const password = useAuthStore((s) => s.password);
    const setLogin = useAuthStore((s) => s.setLogin);
    const setPassword = useAuthStore((s) => s.setPassword);
    const isLoading = useAuthStore((s) => s.isLoading);
    const error = useAuthStore((s) => s.error);
    const submit = useAuthStore((s) => s.submit);

    const handleSubmit = async () => {
        const ok = await submit();
        if (ok) onSuccess?.();
    };

    return (
        <View style={styles.card}>
        <AppText style={styles.label}>Login</AppText>
            <AppTextInput
    placeholder="Entrez votre login"
    value={login}
    onChangeText={setLogin}
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    editable={!isLoading}
    style={styles.input}
    />

    <View style={{ height: 14 }} />

    <AppText style={styles.label}>Mot de passe</AppText>
    <AppTextInput
    placeholder="Entrez votre mot de passe"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    autoCapitalize="none"
    autoCorrect={false}
    editable={!isLoading}
    onSubmitEditing={handleSubmit}
    returnKeyType="go"
    style={styles.input}
    />

    {!!error && <AppText style={styles.error}>{error}</AppText>}

        <View style={{ height: 18 }} />

    <AppButton
        title={isLoading ? "Connexion..." : "Se connecter"}
        onPress={handleSubmit}
        disabled={isLoading}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
        card: {
            backgroundColor: "white",
            borderRadius: 22,
            padding: 16,
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 16,
            elevation: 6,
        },
        label: {
            fontSize: 13,
            fontWeight: "700",
            color: "#0F172A",
            marginBottom: 8,
        },
        input: {
            height: 52,
            borderRadius: 16,
            paddingHorizontal: 14,
            backgroundColor: "#F1F5F9",
            color: "#0F172A",
            fontWeight: "600",
        },
        error: {
            marginTop: 10,
            color: "#EF4444",
            fontWeight: "700",
        },
    });
