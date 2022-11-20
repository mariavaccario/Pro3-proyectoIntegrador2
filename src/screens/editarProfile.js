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
    Image,

} from 'react-native';
import MyCamera from '../components/Camera/Camera';
import { AntDesign } from '@expo/vector-icons';

class EditarProfile extends Component{
    constructor(){
        super()
        this.state={
            userName: '',
            bio: '',
            fotoDePerfil: '',
            showCamera: false,
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
                        fotoDePerfil: usuario.photo
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
                            photo: this.state.fotoDePerfil
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
                            photo: this.state.fotoDePerfil
                        })
   
                    
        }
    }

    onImageUpload(url){
        this.setState({
            fotoDePerfil: url,
            showCamera: false,
        })

    }

    camara (){
        this.setState ({
            showCamera: true
        })
    }

render(){
    return(
        <View style={style.contenedor}> 

            <Text style={style.arrow} onPress={()=> this.props.navigation.navigate('Profile')}> 
                <AntDesign  name="arrowleft" size={24} color="black" />
            </Text>
           
                {this.state.showCamera ?
                <MyCamera onImageUpload={url => this.onImageUpload(url)}/>
                :
                <View>
                    {this.state.fotoDePerfil !== ''?
                    <>
                        <Image style = {style.logo} 
                        source={require("../../assets/editarperfil.png")}
                        resizeMode='contain'
                        />
                        <Image
                        style={style.image}
                        source={{uri: this.state.fotoDePerfil}}
                        />
                        <TouchableOpacity  style={style.button} onPress={() => this.camara()}>
                            <Text style={style.buttonText}> <AntDesign name="camerao" size={24} color="white" /> Cambiar foto de perfil </Text>
                        </TouchableOpacity>
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
                    </>
                    :
                    <>
                        <Image style = {style.logo} 
                        source={require("../../assets/editarperfil.png")}
                        resizeMode='contain'
                        />
                        <TouchableOpacity  style={style.button} onPress={() => this.camara()}>
                            <Text style={style.buttonText}> <AntDesign name="camerao" size={24} color="white" /> Agregar foto de perfil </Text>
                        </TouchableOpacity>
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
                    </>

                }
                </View>
                }
                   
                    

        </View>

    )
}
}

const style =StyleSheet.create({
    // contenedor:{
    //     flex: 1,
    //     backgroundColor: 'white',
    //     justifyContent: 'center',
    //     padding: 15,
    //     color: 'black'
    // },
    image: {
        height: 400,
        marginVertical: 10,
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
    }, 
    button:{
        padding: 15,
        margin: 5,
        borderColor: '#444',
        borderWidth: 1,
        paddingVertical:8,
        borderRadius: 4,
        backgroundColor:'rgb(49,47,53)'
        
    },
    buttonText:{
        fontSize:20,
        color: '#fff',
        textAlign: 'center',

    },
    arrow: {
        marginHorizontal: 10, 
        paddingVertical: 10, 
    }


})




export default EditarProfile;

