import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import type { ImageSourcePropType } from "react-native";

type Props = {
    backgroundSource: ImageSourcePropType;
    children: React.ReactNode;
};

export default function SplashTemplate({ backgroundSource, children }: Props) {
    return (
        <ImageBackground source={backgroundSource} resizeMode="cover" style={styles.bg}>
            {children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1 },
});
