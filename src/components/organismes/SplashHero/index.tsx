import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";

type Props = { source: ImageSourcePropType };

export default function SplashHero({ source }: Props) {
    return (
        <View style={styles.wrap}>
            <Image source={source} style={styles.img} resizeMode="contain" />
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { marginTop: 120, alignItems: "center" },
    img: { width: 220, height: 220 },
});
