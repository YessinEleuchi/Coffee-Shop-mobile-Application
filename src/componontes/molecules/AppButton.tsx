import React from "react";
import {
    TouchableOpacity,
    TouchableOpacityProps,
    TextStyle
} from "react-native";
import AppText from "../atoms/AppText";

export interface IButton extends TouchableOpacityProps {
    title: string;
    textStyle?: TextStyle;
}

const AppButton: React.FC<IButton> = ({ title, style, textStyle, ...props }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            {...props}
            style={style}
        >
            <AppText variant="button" style={textStyle}>
                {title}
            </AppText>
        </TouchableOpacity>
    );
};

export default AppButton;
