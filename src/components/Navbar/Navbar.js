import { grey } from "kleur";
import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


function Navbar(){
    return (
        <SafeAreaView>
            <View style={styles.nav}>
                <Image style = {styles.logo} 
                    source={require("../../../assets/logoBeFoodie.png")}
                    resizeMode='contain'/>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    logo:{
        height:100,
        width:'100%' 
    }, 
    nav: {  
        backgroundColor:'rgb(49,47,53)'
    }

})

export default Navbar