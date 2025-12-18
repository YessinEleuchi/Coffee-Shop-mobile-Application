import React from "react";
import { StyleSheet, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { IconButton } from "../../atoms";

const BottomTab: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // @ts-ignore
                        navigation.navigate(route.name as never, { ...(route.params || {}) } as never);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({ type: "tabLongPress", target: route.key });
                };

                let iconName: string;
                switch (route.name) {
                    case "Home": iconName = "home"; break;
                    case "Favorite": iconName = "heart"; break;
                    case "Cart": iconName = "shopping-cart"; break;
                    case "Profile": iconName = "user"; break;
                    default: iconName = "circle";
                }

                return (
                    <IconButton
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabButton}
                        activeOpacity={0.7} // identique
                    >
                        <FontAwesome5
                            name={iconName}
                            size={24}
                            color={isFocused ? "#00512C" : "#80A896"}
                        />
                    </IconButton>
                );
            })}
        </View>
    );
};

export default BottomTab;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 10,
        paddingBottom: 30,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    tabButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
