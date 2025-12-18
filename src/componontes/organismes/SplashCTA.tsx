import React from "react";
import { StyleSheet } from "react-native";
import AppButton from "../molecules/AppButton";

type Props = { onPress: () => void };

export default function SplashCTA({ onPress }: Props) {
    return (
        <AppButton
            title="Get Started"
            onPress={onPress}
            style={styles.btn}
            textStyle={styles.text}
        />
    );
}

const styles = StyleSheet.create({
    btn: {
        marginHorizontal: 60,
        marginTop: 30,
        backgroundColor: "#00512C",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
