import React from "react";
import { StyleSheet } from "react-native";
import AppButton from "../atoms/AppButton";

type Props = { onPress: () => void };

export default function SplashCTA({ onPress }: Props) {
    return (
        <AppButton
            title="Get Started"
            onPress={onPress}
            style={styles.btn}
        />
    );
}

const styles = StyleSheet.create({
    btn: { marginHorizontal: 60, marginTop: 30 },
});
