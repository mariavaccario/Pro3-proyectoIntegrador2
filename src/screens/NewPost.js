import React, {Component} from 'react'
import {Text, TextInput, TouchableOpacity,View, Image} from 'react-native';
import {auth, db} from '../firebase/config';
import MyCamera from '../components/Camera/Camera';
import {StyleSheet} from 'react-native-web';

import Navbar from '../components/Navbar/Navbar'


class NewPost extends Component{
    constructor(){
        super()
        this.state={
            textoPost:'',
            createdAt:'',
            photo:'',
            showCamera: true,
        }
    }

    createPost(texto, photo){
        db.collection('users'
        
        //.where('owner', '==', auth.currentUser.email)
        )
        .onSnapshot(users => {

        if(users.docs.length > 0 ){
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
                    textoPost:'', //limpio el texto para que si quiero volver sa subir una foto, no me aparezca la anterior
                    showCamera: true,
                })
                this.props.navigation.navigate('Home')
            })
            .catch( error => console.log(error))
        }
        

        })
    }

    onImageUpload(url){
        this.setState({
            photo: url,
            showCamera: false,
        })
    }

    render(){
        return(
            
            <View>
                <Navbar/>
            {
                this.state.showCamera ?
                <MyCamera onImageUpload={url => this.onImageUpload(url)}/>
                :
                <View style={style.contenedor}>
                    <Image style={style.logo}
                    source={require("../../assets/tentate.png")}
                    resizeMode='contain'/>
                   
``
                    
                    <View style={style.contenedor}>
                        <TextInput style={style.box} 
                            placeholder='Escribi lo que pensas'
                            keyboardType='default'
                            onChangeText={ text => this.setState({textoPost:text}) }
                            value={this.state.textoPost}
                        /> 
                        <TouchableOpacity onPress={()=>this.createPost(this.state.textoPost, this.state.photo)}>
                            <Text style={style.botonIngresar}>Subir</Text>
                        </TouchableOpacity>
                    </View>
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
})

export default NewPost;