import { grey } from "kleur";
import react, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native"
import { Button } from "react-native-web";

function Footer(){
    return (
        <View>
        <nav className="headerDesktop" style = {styles.nav}>
            <div className="perfilLogo">
            <Image style = {styles.iconos} 
                source={require("../../../assets/home.png")}
                resizeMode='contain'/>
            </div>
            
            <div className="perfilLogo">
            <Image style = {styles.iconos} 
                source={require("../../../assets/plus.png")}
                resizeMode='contain'/>
            </div>

            <div className="perfilLogo">
            <Image style = {styles.iconos} 
                source={require("../../../assets/user.png")}
                resizeMode='contain'/>
            </div>
        </nav>
        </View>
    )
}
const styles = StyleSheet.create({
    iconos:{
        height:50
    }, 
    nav : {
        backgroundColor:'rgb(49,47,53)'
    }

})

export default Footer