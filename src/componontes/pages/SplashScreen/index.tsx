import React from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../router/Router";

import { background, debute } from "../../../assets";
import {SplashTemplate} from "../../templates";
import {SplashHero} from "../../organismes";
import {HeadSplash} from "../../molecules";
import {SplashCTA} from "../../organismes";

type Props = StackScreenProps<RootStackParamList, "SplashScreen">;

export default function SplashScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1 }}>
            <SplashTemplate backgroundSource={background}>
                <SplashHero source={debute} />
                <HeadSplash
                    title="Coffee so good, your taste buds will love it."
                    subtitle="The best grain, the finest roast, the most powerful flavor."
                />
                <SplashCTA onPress={() => navigation.navigate("MainApp")} />
            </SplashTemplate>
        </View>
    );
}
