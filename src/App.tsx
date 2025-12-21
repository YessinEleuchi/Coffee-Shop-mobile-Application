import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Router from "./router/Router";
import { useAuthStore } from "./stores/useAuthStore";

export default function App() {
    const hydrate = useAuthStore((s) => s.hydrate);

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    return (
        <NavigationContainer>
            <Router />
        </NavigationContainer>
    );
}
