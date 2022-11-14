import React, {Component} from 'react'
import {Text, TextInput, TouchableOpacity,View, Image, StyleSheet} from 'react-native';
import {auth, db} from '../firebase/config';
import { FontAwesome, Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import MyCamera from '../components/Camera/Camera';

import Navbar from '../components/Navbar/Navbar'


class NewPost extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            createdAt:'',
            photo:'',
            showCamera: false,
        }
    }

    createPost(texto, photo){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(users => {
            db.collection('posts').add({
                owner: auth.currentUser.email, 
                userName: users.docs[0].data().userName,
                textoPost: texto,
                photo: photo,
                likes:[],
                comments:[],
                createdAt: Date.now()
            })
            .then(() => {
                this.setState({
                    textoPost:'',
                    showCamera: true,
                })
                this.props.navigation.navigate('Home')
            })
            .catch( error => console.log(error))
        })
    }

    onImageUpload(url){
        this.setState({
            photo: url,
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
                <Navbar/>
            {this.state.showCamera ?
                <MyCamera onImageUpload={url => this.onImageUpload(url)}/>
                :
                <View>
                       
                        {this.state.photo !== '' ? 
                        <>
                            <Image
                                style={style.image}
                                source={{uri: this.state.photo}}
                            />
                            <View >
                                <TextInput style={style.box} 
                                    placeholder='Que estas comiendo?'
                                    keyboardType='default'
                                    onChangeText={ text => this.setState({textoPost:text}) }
                                    value={this.state.textoPost}
                                /> 
                                <TouchableOpacity onPress={()=>this.createPost(this.state.textoPost, this.state.photo)}>
                                    <Text style={style.botonIngresar}>Subir</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        : 
                        <TouchableOpacity  style={style.button} onPress={() => this.camara()}>
                            <Text style={style.buttonText}> <AntDesign name="camerao" size={24} color="white" /> Agregar foto </Text>
                        </TouchableOpacity>
                        }
                </View>
            
            }
            </View>
        )
    }

}

const style = StyleSheet.create({
    
    contenedor:{
        backgroundColor: 'white',
        padding: 15,
        color: 'black'
    },
    logo:{
        height:100,
        width:'100%', 
        backgroundColor: 'white'
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
    image: {
        height: 400,
        marginVertical: 10,
        
    },
    button:{
        marginTop: 40,
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

    }
})

export default NewPost;