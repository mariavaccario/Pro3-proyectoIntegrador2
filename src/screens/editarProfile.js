import React, { Component } from 'react';
import firebase from 'firebase';
import { auth, db, updatePassword } from '../firebase/config';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';

class EditarProfile extends Component{
    constructor(){
        super()
        this.state={
            userName: '',
            bio: '',
            fotoDePerfil: '',
            pass: '',
            passVieja: ''
        }
    }

    componentDidMount(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach( doc=> {
                    const usuario = doc.data();
                    this.setState({
                        idUsuario: doc.id,
                        userName: usuario.userName,
                        email: usuario.owner,
                        bio: usuario.bio,
                        photo: usuario.foto
                    })
                });
            }
        )
        }
   
       editarPerfil(){
            console.log(this.state.pass)

            this.props.navigation.navigate('TabNavigator')

           if(this.state.passVieja !==''&& this.state.pass!==''){
                auth.signInWithEmailAndPassword(auth.currentUser.email, this.state.passVieja)
   
             .then(res =>   {
                    const usuario = auth.currentUser;
                    usuario.updatePassword(
                        this.state.pass
                    )
                    db.collection('users')
                        .doc(this.state.idUsuario)
                        .update({
                            userName: this.state.userName,
                            bio: this.state.bio,
                        })
   
                    })
                
               .catch(error => {
                console.log(error)
               this.setState({
                    error: error.message
               })})
        } else {
            db.collection('users')
                        .doc(this.state.idUsuario)
                        .update({
                            userName: this.state.userName,
                            bio: this.state.bio,
                        })
   
                    
        }
    }

render(){
    return(
        <View style={style.contenedor}> 
            <Image style = {style.logo} 
                source={require("../../assets/editarperfil.png")}
                resizeMode='contain'/>
                
                <TextInput style={style.box} 
                        placeholder='Contraseña anterior'
                        keyboardType='default'
                        onChangeText={ text => this.setState({passVieja:text}) }
                        value={this.state.passVieja}
                    /> 
                    <TextInput style={style.box} 
                        placeholder='Nueva contraseña'
                        keyboardType='default'
                        onChangeText={ text => this.setState({pass:text}) }
                        value={this.state.pass}
                    /> 
                    <TextInput style={style.box}   
                        placeholder='Nuevo nombre de usuario'
                        keyboardType='default'
                        onChangeText={ text => this.setState({userName:text}) }
                        value={this.state.userName}
                    />
                    <TextInput style={style.box}  
                        placeholder='Modificá tu bio'
                        keyboardType='default'
                        onChangeText={ text => this.setState({bio:text}) }
                        value={this.state.bio}
                    />   



                    <TouchableOpacity onPress={()=>this.editarPerfil()}>
                        <Text style={style.botonIngresar}>Aceptar</Text>
                    </TouchableOpacity>

        </View>

    )
}
}

const style =StyleSheet.create({
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
        borderRadius: 7, 
        color: 'grey'

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




export default EditarProfile;

