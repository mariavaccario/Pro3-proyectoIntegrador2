import React, {Component} from 'react'
import {Text, TextInput, TouchableOpacity,View, Image} from 'react-native';
import {auth, db} from '../firebase/config';
import { FontAwesome, Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import MyCamera from '../components/Camera/Camera';
import {StyleSheet} from 'react-native-web';

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
            
            <View>
                <Navbar/>
            {this.state.showCamera ?
                <MyCamera onImageUpload={url => this.onImageUpload(url)}/>
                :
                <View style={style.contenedor}>
                    <Image style={style.logo}
                    source={require("../../assets/tentate.png")}
                    resizeMode='contain'/>
                       
                        {this.state.photo !== '' ? 
                        <>
                            <Image
                                style={style.image}
                                source={{uri: this.state.photo}}
                            />
                            <View style={style.contenedor}>
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
                        <TouchableOpacity onPress={() => this.camara()}>
                            <Text><AntDesign name="camerao" size={24} color="white" /> Agregar foto</Text>
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
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 15,
        color: 'black'
    },
    logo:{
        height:100, 
        margin: 15
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
        width: 400,
        height: 400,
        marginVertical: 10,
        
    }
})

export default NewPost;