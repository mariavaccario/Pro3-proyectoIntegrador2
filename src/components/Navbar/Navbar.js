import { grey } from "kleur";
import react, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native"
import { Button } from "react-native-web";

function Navbar(){
    return (
        <View>
        <nav className="headerDesktop" style = {styles.nav}>
            <div className="logoBeFoodie">
            <Image style = {styles.logo} 
                source={require("../../../assets/logoBeFoodie.png")}
                resizeMode='contain'/>
            </div>

            {/* <div className="perfilLogo">
            <Image style = {styles.perfil} 
                source={require("../../../assets/user.png")}
                resizeMode='contain'/>
            </div> */}
        </nav>
        </View>
    )
}
const styles = StyleSheet.create({
    logo:{
        height:100, 
    },
    perfil:{
        height:50
    }, 
    nav: {
        
        backgroundColor:'rgb(49,47,53)'
    }

})

export default Navbar