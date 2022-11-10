import React, { Component } from 'react';
import {auth} from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
         StyleSheet } from 'react-native';
//import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            pass:'',
            errors:{
                field:'', 
                message: ''
            }
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(
            user =>{
                if(user){
                    this.props.navigation.navigate('TabNavigator')
                }
            })
    }

    loginUser(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                this.props.navigation.navigate('TabNavigator')
            })
            .catch(error => {
                console.log(error)
                let errorField = '' 
                if (error.code === 'auth/invalid-email'){
                    errorField='email'
                }else if (error.code === 'auth/invalid-password'){
                    errorField='password'
                }
                this.setState({
                    errors:{
                        field: errorField, 
                        message: error.message
                    }
                })
            })
    }


    render(){
        return(
            <View style={style.container} >
                <Text style={style.textTitle}>Inciá sesión</Text>
                <View>
                   <TextInput  
                       placeholder='email'
                       keyboardType='email-address'
                       onChangeText={ text => this.setState({email:text}) }
                       value={this.state.email}
                    /> 
                    {this.state.errorField === 'email' && (
                        <Text>{this.state.errors.message}</Text>
                    )}
                    <TextInput  
                        placeholder='password'
                        keyboardType='default'
                        secureTextEntry={true}
                        onChangeText={ text => this.setState({pass:text}) }
                        value={this.state.pass}
                    />  
                    {this.state.errorField === 'password' && (
                        <Text>{this.state.errors.message}</Text>
                    )}

                    <TouchableOpacity onPress={()=>this.loginUser(this.state.email, this.state.pass)}>
                        <Text>Ingresar</Text>
                    </TouchableOpacity>
                    <Text onPress={ () => this.props.navigation.navigate('Register')} >Registrate</Text>
                </View>
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
       
    },


})


export default Login;