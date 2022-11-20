import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
         StyleSheet,
        Image } from 'react-native';

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            props:props,
            email: '',
            pass: '',
            userName: '',
            bio: '',
            photo: '',
            field: '', 
            message: ''
        }
    }

    //  componentDidMount(){
    //      auth.onAuthStateChanged(
    //          user => {
    //           if(user){
    //              this.props.navigation.navigate('Login')
    //      }})
    //  }

    registerUser(){
        auth.createUserWithEmailAndPassword(this.state.email, this.state.pass)
        .then( res => {
            db.collection('users').add({
                owner: this.state.email,
                userName: this.state.userName,
                bio: this.state.bio,
                photo: this.state.photo,
                createdAt: Date.now()
            })

        .then(()=>{
            this.setState({
                email: '',
                pass:'',
                userName: '',
                bio: '',
                photo: '',
                field: '',
                message: ''
            })

            this.props.navigation.navigate('Login')
        })

        .catch(error => {
            console.log(error)
            if (error.code === 'auth/invalid-email'){
                this.setState({
                    field: 'email', 
                    message: 'Email incompleto'
            
                })
            }else if (error.code === 'auth/weak-password'){
                this.setState({
                    field: 'password', 
                    message: 'Contraseña incorrecta'
            
                })
            }
            
        })
    })}


    render(){
        return(
            <View style={style.contenedor}> 

                <Image style = {style.logo} 
                source={require("../../assets/register.com.png")}
                resizeMode='contain'/>
                
                <View>
                {this.state.field == 'email' ?
                <>
                <TextInput style={style.boxM} 
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={ text => this.setState({email:text}) }
                        value={this.state.email}
                    /> 
                <Text style={style.msjE}>{this.state.message}</Text>
                </>
                : 
                <TextInput style={style.box} 
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={ text => this.setState({email:text}) }
                        value={this.state.email}
                    /> 
                }

                {this.state.field == 'password'?
                    <>
                    <TextInput style={style.boxM} 
                            placeholder='Password'
                            keyboardType='default'
                            onChangeText={ text => this.setState({pass:text}) }
                            value={this.state.pass}
                        /> 
                        <Text style={style.msjE}>{this.state.message}</Text>
                    </>
                    :
                    <TextInput style={style.box} 
                            placeholder='Password'
                            keyboardType='default'
                            secureTextEntry={true}
                            onChangeText={ text => this.setState({pass:text}) }
                            value={this.state.pass}
                        />
                }
                    
                    <TextInput style={style.box}   
                        placeholder='Username'
                        keyboardType='default'
                        onChangeText={ text => this.setState({userName:text}) }
                        value={this.state.userName}
                    />
                    <TextInput style={style.box}  
                        placeholder='Bio'
                        keyboardType='default'
                        onChangeText={ text => this.setState({bio:text}) }
                        value={this.state.bio}
                    />   

                    </View>

                    <TouchableOpacity onPress={()=>this.registerUser()}>
                        <Text style={style.botonIngresar}>Registrarme</Text>
                    </TouchableOpacity>

                    <Text style={style.textTitle} onPress={()=> this.props.navigation.navigate('Login')}>Si ya tenes cuenta, logueate aca</Text>

                
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
        margin: 15
    }


})

export default Register;