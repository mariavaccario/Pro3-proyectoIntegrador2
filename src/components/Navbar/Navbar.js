import react, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native"
import { Button } from "react-native-web";

function Navbar(){
    return (
        <View>
        <nav className="headerDesktop">
            <div className="logoBeFoodie">
            <Image style = {styles.image} 
                source={require("/assets/logoBeFoodie.png")}
                resizeMode='contain'/>
            </div>

            <div className="perfilLogo">
                
            </div>
        </nav>
        </View>
    )
}
const styles = StyleSheet.create({
    image:{
        height:400
    },

})

export default Navbar