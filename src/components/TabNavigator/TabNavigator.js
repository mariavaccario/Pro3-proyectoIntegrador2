import { grey } from "kleur";
import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native"
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../screens/Home';
import NewPost from '../../screens/NewPost';
import Profile from '../../screens/Profile';
import Buscador from '../../screens/Buscador';

function TabNavigator(){
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen
                name='Home'
                component = {Home}
                options={
                    {tabBarIcon: ()=> <Entypo name="home" size={24} color="black" />, headerShown: false}
                }/>

             <Tab.Screen
                name='NewPost'
                component = {NewPost}
                options={
                    {tabBarIcon: ()=> <AntDesign name="pluscircle" size={24} color="black" />, headerShown: false }
                }/>
            <Tab.Screen
                name='Profile'
                component = {Profile}
                options={
                    {tabBarIcon: ()=> <FontAwesome name="user" size={24} color="black" />, headerShown: false }
                }/>
            
            <Tab.Screen 
                name="Buscador" 
                component={ Buscador } 
                options={ 
                    {tabBarIcon: ()=> <FontAwesome name="search" size={24} color="black" />, headerShown: false }
                }/>
        
        </Tab.Navigator>
    )
}

export default TabNavigator;