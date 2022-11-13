import React, { Component } from 'react';
import {auth} from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
         StyleSheet,
        Image } from 'react-native';
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
            <View style={style.contenedor} >
                 <Image style = {style.logo} 
                source={require("../../assets/Artboard 1.png")}
                resizeMode='contain'/>
            
                
                
                <View>

                   <TextInput style={style.box} 
                       placeholder='email'
                       keyboardType='email-address'
                       onChangeText={ text => this.setState({email:text}) }
                       value={this.state.email}
                    /> 
                    {this.state.errorField === 'email' && (
                        <Text>{this.state.errors.message}</Text>
                    )}
                    <TextInput style={style.box}
                        placeholder='password'
                        keyboardType='default'
                        secureTextEntry={true}
                        onChangeText={ text => this.setState({pass:text}) }
                        value={this.state.pass}
                    />  
                    {this.state.errorField === 'password' && (
                        <Text>{this.state.errors.message}</Text>
                    )}

            </View> 

                    <TouchableOpacity onPress={()=>this.loginUser(this.state.email, this.state.pass)}>
                        <Text style={style.botonIngresar}>Ingresar</Text>
                    </TouchableOpacity>
                    <Text style={style.textTitle}onPress={ () => this.props.navigation.navigate('Register')} >Si no tenes cuenta, registrate aca</Text>
                
            </View>
        )
    }
    
};

const style= StyleSheet.create({
    contenedor:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 15,
        color: 'black'
    },

    box:{
        borderStyle: 'solid',
        borderWith: 3,
        padding: 15,
        margin: 3,
        backgroundColor: 'rgb(243,245,243)',
        borderRadius: 7,
        borderColor: 'black',
        

    },

    textTitle:{
        fontWeight: 500,
        color: 'black',
        fontSize: '200',
        textAlign: 'center',
        marginVertical: 50,
       
    },

    botonIngresar: {
        borderStyle: 'solid',
        borderWith: 1,
        borderColor: 'black',
        backgroundColor: 'rgb(49,47,53)',
        marginHorizontal: 100,
        marginVertical: 50,
        padding: 15,
        textAlign: 'center',
        color: 'white',
        borderRadius: 3,

    },
    logo:{
        height:100, 
        margin: 15
    },


})


export default Login;