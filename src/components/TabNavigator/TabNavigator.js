import { grey } from "kleur";
import react, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native"
import { Button } from "react-native-web";
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../screens/Home';
import NewPost from '../../screens/NewPost';
import Profile from '../../screens/Profile';

function TabNavigator(){
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen
                name='Home'
                component = {Home}
                options={
                    {tabBarIcon: ()=> <Entypo name="home" size={24} color="black" />}
                }/>

             <Tab.Screen
                name='NewPost'
                component = {NewPost}
                options={
                    {tabBarIcon: ()=> <AntDesign name="pluscircleo" size={24} color="black" /> }
                }/>
            <Tab.Screen
                name='Profile'
                component = {Profile}
                options={
                    {tabBarIcon: ()=> <AntDesign name="user" size={24} color="black" /> }
                }/>
        
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    iconos:{
        height:50,
        //flexDirection: 'row',

    }, 
    //view: {
        //display: 'flex',
        //backgroundColor:'rgb(49,47,53)',
        //flex: 1,
    //},
    nav: {
        diplay: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor:'rgb(49,47,53)',
        justifyContent:'space-between',

    }

})

export default TabNavigator;