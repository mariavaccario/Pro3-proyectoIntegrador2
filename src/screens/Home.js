import react, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native"
import { Button } from "react-native-web";

import Navbar from '../components/Navbar/Navbar'

class Home extends Component{
    constructor(){
        super()
        this.state={

        }
    }


    render(){
        return(
            <View>
            <Navbar/>
            </View>
        )
    }
}

export default Home;