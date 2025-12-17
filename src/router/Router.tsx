import { createStackNavigator } from '@react-navigation/stack';
import Home from "../componontes/pages/Home";
import SplashScreen from "../componontes/pages/SplashScreen";

const Stack = createStackNavigator();

const Router: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />

        </Stack.Navigator>
    );
};

export default Router;


