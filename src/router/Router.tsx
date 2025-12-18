import { createStackNavigator } from '@react-navigation/stack';
import {SplashScreen,Home ,Profile ,Favorite , Cart} from "../componontes/pages";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
export type RootStackParamList = {
    SplashScreen: undefined;
    Home: undefined;
    MainApp : undefined;
};
const MainApp = () =>{
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorite" component={Favorite} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Profile" component={Profile} />

        </Tab.Navigator>
    )
}
const Router: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MainApp" component={MainApp} />


        </Stack.Navigator>
    );
};

export default Router;


