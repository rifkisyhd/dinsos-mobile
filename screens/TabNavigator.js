import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  HomeScreen from './Homepage/HomeScreen';
import  ChatAI from './chat/chat';
import  ProfilDinsosScreen from './profil/profil';
import DataTable from "./sapa-bansos/sapa-bansos";


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Chat" component={ChatAI} />
            <Tab.Screen name="Profil" component={ProfilDinsosScreen} />
            <Tab.Screen name="Sapa-Bansos" component={DataTable} />
        </Tab.Navigator>
    );
}