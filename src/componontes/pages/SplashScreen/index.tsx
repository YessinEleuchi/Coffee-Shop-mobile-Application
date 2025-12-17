import React from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../router/Router";

import { background, debute } from "../../../assets";
import SplashTemplate from "../../templates/SplashTemplate";
import SplashHero from "../../organismes/SplashHero";
import SplashHeadline from "../../molecules/SplashHeadline";
import SplashCTA from "../../organismes/SplashCTA";

type Props = StackScreenProps<RootStackParamList, "SplashScreen">;

export default function SplashScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1 }}>
            <SplashTemplate backgroundSource={background}>
                <SplashHero source={debute} />
                <SplashHeadline
                    title="Coffee so good, your taste buds will love it."
                    subtitle="The best grain, the finest roast, the most powerful flavor."
                />
                <SplashCTA onPress={() => navigation.navigate("Home")} />
            </SplashTemplate>
        </View>
    );
}
