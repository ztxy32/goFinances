import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components"
import { Dashboard } from "../screens/Dashboard";
import { Cadastro } from "../screens/Cadastro";
import { Resume } from "../screens/Resume";

const {Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes(){
    const tema = useTheme();
    return(
        <Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: tema.cores.secundaria,
            tabBarInactiveTintColor: tema.cores.texto,
            tabBarLabelPosition: "beside-icon",
            tabBarStyle:{
                height: 88,
            }
        }}>

            <Screen 
                name="Listagem" 
                component={Dashboard} 
                options={{
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name="format-list-bulleted" 
                            size={size}
                            color={color}
                        />)
                    }}
            />
            <Screen 
                name="Cadastrar" 
                component={Cadastro}
                options={{
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name="attach-money" 
                            size={size}
                            color={color}
                        />)
                    }}
            />
            <Screen 
                name="Resumo" 
                component={Resume}
                options={{
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name="pie-chart" 
                            size={size}
                            color={color}
                        />)
                    }}
            />

        </Navigator>
    );
}