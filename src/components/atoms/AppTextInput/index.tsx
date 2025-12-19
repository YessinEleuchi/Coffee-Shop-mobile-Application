import React from "react";
import { TextInput, TextInputProps, StyleProp, TextStyle } from "react-native";

type Props = TextInputProps & {
    inputStyle?: StyleProp<TextStyle>;
};

export default function AppTextInput({ inputStyle, style, ...props }: Props) {
    return (
        <TextInput
            {...props}
            style={[style, inputStyle]}   // ✅ merge
            placeholderTextColor={props.placeholderTextColor ?? "#94A3B8"}
        />
    );
}
