import React from "react";
import {View, Image, StyleSheet, ImageSourcePropType, Text, TextInput} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type Props = {
    avatar: ImageSourcePropType;
    location: string;
    onPressNotif?: () => void;
};

export default function HomeHeader({ avatar, location, onPressNotif }: Props) {
    return (
        <>
        <View style={styles.container}>
            <Image source={avatar} style={styles.avatar} />
            <View style={styles.locationPill}>
                <FontAwesome5 name="map-marker-alt" size={12} color="#0A7C3A" />
                <Text style={styles.locationText}>{location}</Text>
            </View>

            <FontAwesome5
                name="bell"
                size={18}
                color="#00512C"
                onPress={onPressNotif}
                style={styles.bell}
            />
        </View>

        </>


    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 14,
    },
    avatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
    },
    locationPill: {
        flexDirection: "row",
        alignItems: "center",

        borderColor: "#00512C",
        paddingHorizontal: 10,
        paddingVertical: 4,
        gap: 6,
    },
    locationText: {
        color: "#00512C",
        fontSize: 12,
        fontWeight: "600",
    },
    bell: {
        padding: 6,
    },
});
