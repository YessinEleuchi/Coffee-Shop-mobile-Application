import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from '../components/pages/SplashScreen';
import Home from '../components/pages/Home';
import Profile from '../components/pages/Profile';
import Favorite from '../components/pages/Favorite';
import {Cart,LoginScreen} from '../components/pages';

import {BottomTab} from '../components/molecules';

// Définir les types pour le Stack principal
export type RootStackParamList = {
    SplashScreen: undefined;
    MainApp: undefined;
};

// Stack principal
const Stack = createStackNavigator<RootStackParamList>();

// Bottom Tabs
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <BottomTab {...props} />}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorite" component={Favorite} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

const Router: React.FC = () => {
    // @ts-ignore
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="MainApp" component={MainApp} />
        </Stack.Navigator>
    );
};

export default Router;