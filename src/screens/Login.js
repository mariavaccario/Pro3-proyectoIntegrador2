import React, { Component } from 'react';
import {auth} from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
         StyleSheet,
        Image, 
        ActivityIndicator} from 'react-native';
//import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            pass:'',
            field:'', 
            message: '',
            user: true,

            
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(
            user =>{
                if(user){
                    this.props.navigation.navigate('TabNavigator')
                
                } else {
                    this.setState({
                        user:false
                    })
                }
            })
    }

    loginUser(){
        auth.signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then( res => {
                this.props.navigation.navigate('TabNavigator')
            })
            .catch(error => {
                console.log(error)
                if (error.code == 'auth/invalid-email' || error.code =='auth/user-not-found'){
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
           <View style={style.contenedor}>
            {this.state.user ?
                <ActivityIndicator style={style.loader} size='large' color='blue'/> :
           
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

                    <TouchableOpacity onPress={()=>this.loginUser()}>
                        <Text style={style.botonIngresar}>Ingresar</Text>
                    </TouchableOpacity>

                    <Text style={style.textTitle}onPress={ () => this.props.navigation.navigate('Register')} >Si no tenes cuenta, registrate aca</Text>
     
            </View>

        }   

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
        borderColor: 'black',
        backgroundColor: 'rgb(243,245,243)',
        borderRadius: 7

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
        borderWidth: 1,
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
        margin: 15,
        
    }

})


export default Login;