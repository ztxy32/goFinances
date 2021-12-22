import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Entrar } from "../screens/Entrar";

const { Navigator, Screen } = createStackNavigator();


export function AuthRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Entrar" component={Entrar}/>
        </Navigator>
    );
}