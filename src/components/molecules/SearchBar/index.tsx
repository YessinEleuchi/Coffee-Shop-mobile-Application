import React from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { AppTextInput } from "../../atoms";

type Props = {
    value: string;
    onChangeText: (t: string) => void;
    placeholder?: string;

    leftIcon: ImageSourcePropType;   // search icon
    rightIcon: ImageSourcePropType;  // filter icon
    onPressFilter?: () => void;

    containerStyle?: any;
};

export default function SearchBar({
                                      value,
                                      onChangeText,
                                      placeholder = "Search coffee...",
                                      leftIcon,
                                      rightIcon,
                                      onPressFilter,
                                      containerStyle,
                                  }: Props) {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.left}>
                <Image source={leftIcon} style={styles.icon} resizeMode="contain" />
                <AppTextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#80A896"
                    inputStyle={styles.input}
                />
            </View>

            <Image
                source={rightIcon}
                style={styles.icon}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#ece9e9",
        borderRadius: 999,
        marginHorizontal: 30,
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "space-between",
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
    },
    icon: {
        width: 18,
        height: 18,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#111827",
        paddingVertical: 0,
    },
});
