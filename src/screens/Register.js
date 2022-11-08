import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
         StyleSheet } from 'react-native';

class Register extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            pass: '',
            userName: '',
            bio: '',
            errors: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(
            user => {
             if(user){
                this.props.navigation.navigate('Home')
        }})
    }

    registerUser(email, pass, userName, bio){
        auth.createUserWithEmailAndPassword(email, pass)
        .then( res => {
            db.collection('users').add({
                owner: email,
                userName: userName,
                bio: bio,
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

    render(){
        return(
            <View> 
                <Text>Registro</Text>
                <View>
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
                    <TextInput  
                        placeholder='user name'
                        keyboardType='default'
                        onChangeText={ text => this.setState({userName:text}) }
                        value={this.state.userName}
                    />
                    <TextInput  
                        placeholder='Mini Bio'
                        keyboardType='default'
                        onChangeText={ text => this.setState({bio:text}) }
                        value={this.state.bio}
                    />   

                    <TouchableOpacity onPress={()=>this.registerUser(this.state.email, this.state.pass, this.state.userName, this.state.bio)}>
                        <Text>Registrarme</Text>
                    </TouchableOpacity>

                    <Text onPress={()=> this.props.navigation.navigate('Login')}>ir a login</Text>

                </View>
            </View>

        )

        }

                    
}

export default Register;