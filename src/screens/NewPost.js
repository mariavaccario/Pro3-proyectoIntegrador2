import React, {Component} from 'react'
import {Text, TextInput, TouchableOpacity,View} from 'react-native';
import {auth, db} from '../firebase/config';
import MyCamera from '../components/Camera/Camera';
import {StyleSheet} from 'react-native-web';


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
            {
                this.state.showCamera ?
                <MyCamera onImageUpload={url => this.onImageUpload(url)}/>
                :
                <View>
                    <Text> Mostra la comida que comiste hoy</Text>
                    <View>
                        <TextInput  
                            placeholder='texto post'
                            keyboardType='default'
                            onChangeText={ text => this.setState({textoPost:text}) }
                            value={this.state.textoPost}
                        /> 
                        <TouchableOpacity onPress={()=>this.createPost(this.state.textoPost, this.state.photo)}>
                            <Text>Subir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            </View>
        )
    }
}

export default NewPost;