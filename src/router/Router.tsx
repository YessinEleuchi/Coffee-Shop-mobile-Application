import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SplashScreen from "../components/pages/SplashScreen";
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";
import Favorite from "../components/pages/Favorite";
import { Cart, LoginScreen } from "../components/pages";

import { BottomTab } from "../components/molecules";

export type RootStackParamList = {
    SplashScreen: undefined;
    Login: undefined;
    MainApp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainApp = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTab {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorite" component={Favorite} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
);

const Router: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainApp" component={MainApp} />
        </Stack.Navigator>
    );
};

export default Router;
