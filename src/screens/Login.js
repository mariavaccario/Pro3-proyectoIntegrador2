import React, { Component } from 'react';
import {auth} from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
         StyleSheet } from 'react-native';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            pass:'',
            errors:''
        }
    }

    loginUser(email, pass){
        //Registrar en firebase y si el reigstro sale bien redireccionar a Home
        auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                //equivalente a res.redirect
                this.props.navigation.navigate('TabNavigator')
            })
            .catch(error => console.log(error))
    }


    render(){
        return(
            <View style={style.container} >
                <Text style={style.textTitle}>Inciá sesión</Text>
                
                   <TextInput  
                       placeholder='email'
                       keyboardType='email-address'
                       onChangeText={ text => this.setState({email:text}) }
                       value={this.state.email}
                    /> 
                    <TextInput  
                        placeholder='password'
                        keyboardType='default'
                        onChangeText={ text => this.setState({pass:text}) }
                        value={this.state.pass}
                    />  

                    <TouchableOpacity onPress={()=>this.loginUser(this.state.email, this.state.pass)}>
                        <Text>Ingresar</Text>
                    </TouchableOpacity>
                    <Text onPress={ () => this.props.navigation.navigate('Register')} >Registrate</Text>
                
            </View>
        )
    }
    
};

const style= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 15,
        color: 'black'
    },

    textTitle:{
        fontWeight: 700,
        color: 'black',
        fontSize: '30',
        textAlign: 'center',
        padding: 5
    },
    

})


export default Login;