import React from "react";
import {
    View,
    Image,
    StyleSheet,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    ImageStyle,
} from "react-native";

type Props = {
    source: ImageSourcePropType;
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
};

export default function SplashHero({
                                       source,
                                       containerStyle,
                                       imageStyle,
                                   }: Props) {
    return (
        <View style={[styles.wrap, containerStyle]}>
            <Image
                source={source}
                resizeMode="contain"
                style={[styles.img, imageStyle]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { marginTop: 120, alignItems: "center" },
    img: { width: 220, height: 220 },
});
