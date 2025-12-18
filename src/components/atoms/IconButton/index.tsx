import React from "react";
import {StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle} from "react-native";

type Props = TouchableOpacityProps & {
    children: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
};

export default function IconButton({ children, activeOpacity = 0.7, ...props }: Props) {
    return (
        <TouchableOpacity activeOpacity={activeOpacity} {...props}>
            {children}
        </TouchableOpacity>
    );
}
