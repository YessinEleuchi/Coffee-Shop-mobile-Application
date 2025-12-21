import React from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    ImageSourcePropType,
} from "react-native";
import { AppText } from "../../atoms";

type Props = TouchableOpacityProps & {
    title: string;
    icon?: string | ImageSourcePropType;
    active?: boolean;
};

function isHttpUrl(v: string) {
    return /^https?:\/\//i.test(v);
}

export default function ButtonCat({ title, icon, active = false, style, ...props }: Props) {
    const renderIcon = () => {
        if (!icon) return null;

        // ✅ icon URI / emoji
        if (typeof icon === "string") {
            // URL => Image uri
            if (isHttpUrl(icon)) {
                return (
                    <Image
                        source={{ uri: icon }}
                        style={[styles.icon, active && styles.iconActive]}
                        resizeMode="contain"
                    />
                );
            }

            // emoji (ou texte court) => Text
            return <AppText style={[styles.emoji, active && styles.emojiActive]}>{icon}</AppText>;
        }

        // ✅ local image require()
        return (
            <Image
                source={icon}
                style={[styles.icon, active && styles.iconActive]}
                resizeMode="contain"
            />
        );
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            {...props}
            style={[styles.base, active ? styles.active : styles.inactive, style]}
        >
            <View style={styles.row}>
                {renderIcon()}
                <AppText style={[styles.text, active ? styles.textActive : styles.textInactive]}>
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

    emoji: { fontSize: 16, lineHeight: 18 },
    emojiActive: { color: "white" },

    text: { fontSize: 12, fontWeight: "600" },
    textActive: { color: "white" },
    textInactive: { color: "#0F172A" },

    active: { backgroundColor: "#00512C" },
    inactive: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
});
