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
            field:'', 
            message: ''
            
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
                if (error.code == 'auth/invalid-email'){
                    this.setState({
                        field: 'email', 
                        message: 'Email incorrecto'
                
                    })
                }else if (error.code == 'auth/wrong-password'){
                    this.setState({
                        field: 'password', 
                        message: 'Contraseña incorrecta'
                
                    })
                }
                
            })
    }


    render(){
        console.log(this.state.message + this.state.field)
        return(
            <View style={style.contenedor} >
                 <Image style = {style.logo} 
                source={require("../../assets/Artboard1.png")}
                resizeMode='contain'/>
            
                
                
                <View>
                {this.state.field == 'email' ?
                <>
                <TextInput style={style.boxM} 
                    placeholder='email'
                    keyboardType='email-address'
                    onChangeText={ text => this.setState({email:text, field: ''}) }
                    value={this.state.email}
                 /> 
                    <Text style={style.msjE}>{this.state.message}</Text>
                 </>
                 :
                 <TextInput style={style.box} 
                       placeholder='email'
                       keyboardType='email-address'
                       onChangeText={ text => this.setState({email:text}) }
                       value={this.state.email}
                    /> 
                }

                {this.state.field == 'password'?
                <>
                <TextInput style={style.boxM}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({pass:text, field: ''}) }
                    value={this.state.pass}
                />  
                <Text style={style.msjE}>{this.state.message}</Text>
                </>
                :
                <TextInput style={style.box}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({pass:text}) }
                    value={this.state.pass}
                />  
                }
                
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
        borderWidth: 1,
        padding: 15,
        margin: 3,
        backgroundColor: 'rgb(243,245,243)',
        borderRadius: 7,
        borderColor: 'black',
    },

    boxM:{
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 15,
        margin: 3,
        backgroundColor: 'rgb(243,245,243)',
        borderRadius: 7,
        borderColor: 'red',
        color: 'red'
    },

    msjE:{
        padding: 7,
        margin: 3,
        color: 'red', 

    },

    textTitle:{
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
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
        borderRadius: 7,

    },
    logo:{
        height:100, 
        margin: 15
    },


})


export default Login;