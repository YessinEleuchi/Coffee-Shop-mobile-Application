import React from "react";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import AppText from "./AppText";

type Props = TouchableOpacityProps & {
    title: string;
};

export default function AppButton({ title, style, ...props }: Props) {
    return (
        <TouchableOpacity activeOpacity={0.8} {...props} style={[styles.btn, style]}>
            <AppText variant="button">{title}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#00512C",
        paddingHorizontal: 30,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
    },
});
