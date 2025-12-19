import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from "react-native";
import AppText from "../AppText";

type Props = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
};

export default function AppButton({ title, onPress, disabled, style }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled}
            style={[styles.btn, disabled && styles.disabled, style]}
        >
            <AppText style={styles.text}>{title}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        height: 52,
        borderRadius: 18,
        backgroundColor: "#00512C",
        alignItems: "center",
        justifyContent: "center",
    },
    disabled: { opacity: 0.6 },
    text: { color: "white", fontSize: 16, fontWeight: "800" },
});
