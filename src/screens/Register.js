import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
         StyleSheet,
        Image } from 'react-native';

import Camera from '../components/Camera/Camera'

class Register extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            pass: '',
            userName: '',
            bio: '',
            errors: '', 
            foto: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(
            user => {
             if(user){
                this.props.navigation.navigate('Home')
        }})
    }

    registerUser(email, pass, userName, bio, foto){
        auth.createUserWithEmailAndPassword(email, pass)
        .then( res => {
            db.collection('users').add({
                owner: email,
                userName: userName,
                bio: bio,
                foto: foto,
                createdAt: Date.now()
            })

        .then(()=>{
            this.setState({
                email: '',
                pass:'',
                userName: '',
                bio: '',
                errors:''
            })

            this.props.navigation.navigate('Login')
        })

        .catch(error=> console.log(error))
        })

        .catch(error=> console.log(error))
    }

    onImageUpload(url) {
        console.log(url)
        this.setState({
            foto: url,
            showCamera: false,
        })
    }

    render(){
        return(
            <View style={style.contenedor}> 

                <Image style = {style.logo} 
                source={require("../../assets/register.com.png")}
                resizeMode='contain'/>
                
                
                    <TextInput style={style.box} 
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={ text => this.setState({email:text}) }
                        value={this.state.email}
                    /> 
                    <TextInput style={style.box} 
                        placeholder='Password'
                        keyboardType='default'
                        onChangeText={ text => this.setState({pass:text}) }
                        value={this.state.pass}
                    /> 
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

                    {
                        this.state.showCamera ?
                        <View style={{width: '80vw', heigth: '80vh'}}>
                            <Camera onImageUpload={url => this.onImageUpload(url)}/> 
                        </View> 
                        :
                        <TouchableOpacity onPress={()=> this.setState({showCamera:true})}>
                            <Text style={style.camera}>Subir foto de perfil</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={()=>this.registerUser(this.state.email, this.state.pass, this.state.userName, this.state.bio)}>
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
        borderWith: 3,
        padding: 15,
        margin: 3,
        borderColor: 'black',
        backgroundColor: 'rgb(243,245,243)',
        borderRadius: 7

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
        borderRadius: 3,

    },
    logo:{
        height:100, 
        margin: 15
    }


})

export default Register;