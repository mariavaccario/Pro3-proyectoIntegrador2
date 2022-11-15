import React, { Component } from 'react';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';
import Posteo from '../components/Posteo/Posteo';

class Profile extends Component{
    constructor(){
        super()
        this.state={
            posteosUser: [],
            userName: '',
            contra: '',
            contraNueva: '',
            photo: '',
            bio: '',
            idUsuario: '',
            editProfile: false,
            error: '',
            email: '',

        }
    }

    componentDidMount(){
        //this.traerPosteosUser.bind(this);
        this.traerInfoUser();
        this.trarPosteosUser();

    }

    traerInfoUser(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach( doc=> {
                    const usuario = doc.data();
                    this.setState({
                        idUsuario: doc.id,
                        userName: usuario.usrrName,
                        email: usuario.owner,
                        bio: usuario.bio,
                        photo: usuario.foto
                    })
                });
            }
        )
    }

    traertPosteosUser(){
        db.collection('users').where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
            docs =>{
                let posteos = [];
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posteosUser:posteos
                    })
                })
            }
        )
    }

    updateInfoProfile(){
        db.collection('users')
            .doc(this.state.idUsuario)
            .update({
                userName: this.state.userName,
                bio: this.state.bio
            })
            .then(
                this.traerInfoUser()

            )
            .catch(error => console.log(error))
    }

    editarPerfil(){
        if(this.state.contraNueva !==''){
            auth.signInWithEmailAndPassword(auth.currentUser.email, this.state.contra)

            .then(res =>   {
                const usuario = auth.currentUser;
                usuario.updatePassword(
                    this.state.contraNueva
                )
                .then(res => {
                    this.updateInfoProfile();

                })

                .catch(error => console.log(error))

            })
            .catch(error => this.setState({
                error: error.message
            }))
    } else {
        this.updateInfoProfile();
    }
}

render(){
    return(
        <View>
            <Image 
                source={this.state.photo}
                resizeMode='cover'
            />
            <Text>{this.state.userName}</Text>
            <Text>{this.state.email}</Text>
            <Text>{this.state.bio}</Text>
            <Text>Cantidad de posteos:{this.state.posteosUser.length}</Text>

            <FlatList
                data= {this.state.posteosUser}
                keyExtractor={onePost => onePost.id.toString()}
                renderItem= {({item})=> <Posteo postData={item} refrescarPosts={this.traertPosteosUser}/>}
            

            />

        </View>
    )
}

}
export default Profile;