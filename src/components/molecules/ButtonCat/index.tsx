import React from "react";
import {
    View,
    Image,
    StyleSheet,
    ImageSourcePropType,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";
import { AppText } from "../../atoms";

type Props = TouchableOpacityProps & {
    title: string;
    icon: ImageSourcePropType;
    active?: boolean;
};

export default function ButtonCat({ title, icon, active = false, style, ...props }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            {...props}
            style={[
                styles.base,
                active ? styles.active : styles.inactive,
                style,
            ]}
        >
            <View style={styles.row}>
                <Image
                    source={icon}
                    style={[styles.icon, active && styles.iconActive]}
                    resizeMode="contain"
                />
                <AppText
                    style={[
                        styles.text,
                        active ? styles.textActive : styles.textInactive,
                    ]}
                >
                    {title}
                </AppText>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        height: 34,
        paddingHorizontal: 12,
        borderRadius: 999,
        justifyContent: "center",
        marginRight: 10,
    },
    row: { flexDirection: "row", alignItems: "center", gap: 8 },

    icon: { width: 16, height: 16, tintColor: "#00512C" },
    iconActive: { tintColor: "white" },

    text: { fontSize: 12, fontWeight: "600" },
    textActive: { color: "white" },
    textInactive: { color: "#0F172A" },

    active: { backgroundColor: "#00512C" },
    inactive: {
        backgroundColor: "white",
        // shadow iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        // shadow Android
        elevation: 3,
    },
});
