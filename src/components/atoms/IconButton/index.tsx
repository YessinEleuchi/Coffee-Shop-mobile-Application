import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    children: React.ReactNode;
};

export default function IconButton({ children, activeOpacity = 0.7, ...props }: Props) {
    return (
        <TouchableOpacity activeOpacity={activeOpacity} {...props}>
            {children}
        </TouchableOpacity>
    );
}
