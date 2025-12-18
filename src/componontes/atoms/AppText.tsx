import React from "react";
import { Text, TextProps } from "react-native";


type Props = TextProps & {
    variant?: "title" | "body" | "button";
};

export default function AppText({ style, ...props }: Props) {
    return <Text {...props} style={style} />;
}
