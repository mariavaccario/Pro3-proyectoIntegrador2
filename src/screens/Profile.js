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
import { AntDesign, MaterialIcons, Fontisto } from '@expo/vector-icons';
import Posteo from '../components/Posteo/Posteo';
import Navbar from '../components/Navbar/Navbar'

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
        this.traerPosteosUser();

    }

    traerInfoUser(){
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

    traerPosteosUser(){
        db.collection('posts').where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
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
    logout() {
        auth.signOut()
            .then(() => this.props.navigation.navigate("Login"))
    }

    // updateInfoProfile(){
    //     db.collection('users')
    //         .doc(this.state.idUsuario)
    //         .update({
    //             userName: this.state.userName,
    //             bio: this.state.bio
    //         })
    //         .then(
    //             this.traerInfoUser()

    //         )
    //         .catch(error => console.log(error))
    // }

//     editarPerfil(){
//         if(this.state.contraNueva !==''){
//             auth.signInWithEmailAndPassword(auth.currentUser.email, this.state.contra)

//             .then(res =>   {
//                 const usuario = auth.currentUser;
//                 usuario.updatePassword(
//                     this.state.contraNueva
//                 )
//                 .then(res => {
//                     this.updateInfoProfile();

//                 })

//                 .catch(error => console.log(error))

//             })
//             .catch(error => this.setState({
//                 error: error.message
//             }))
//     } else {
//         this.updateInfoProfile();
//     }
// }

render(){
    return(
        <View style={style.contenedor}>
            <Navbar/>
            {/* <TouchableOpacity onPress={() => this.logout()} >   
                <Text style={style.logout}><MaterialIcons name="logout" size={24} color="black" /></Text>
            </TouchableOpacity>  */}
            
            <Text style={style.user}><AntDesign name="adduser" size={70} color="black" /></Text>
            <View style={style.info}>            
                <Text>{this.state.userName}</Text>
                <Text>{this.state.email}</Text>
                <Text>{this.state.bio}</Text>
                <Text>Cantidad de posteos: {this.state.posteosUser.length}</Text>

                <Text><Fontisto name="player-settings" size={24} color="black" /></Text>
            </View>

            <Image style = {style.logo} 
                    source={require("../../assets/posts.png")}
                    resizeMode='contain'
            />

            <FlatList
                data= {this.state.posteosUser}
                keyExtractor={onePost => onePost.id.toString()}
                renderItem= {({item})=> <Posteo postData={item} />}
                // refrescarPosts={this.traerPosteosUser}

            />
            
            <TouchableOpacity onPress={() => this.logout()} >   
                <Text style={style.logout}><MaterialIcons name="logout" size={24} color="black" /></Text>
            </TouchableOpacity> 

            

        </View>
    )
}}
const style = StyleSheet.create({
    contenedor:{
        flex:1,
    },
    info:{
        textAlign: 'center',

    }, 
    user:{
        textAlign: 'center', 
        marginBottom: 20,
        marginTop: 10, 
        marginHorizontal: 145,  
        borderRadius: 40, 
        borderColor: 'black', 
        borderWidth: 2, 
    }, 
    logout:{
        margin: 10, 
        textAlign: 'right'
    }, 
    logo: {
        height:100,
        width:'50%',
        padding: 10,
        marginTop: 20,
        marginHorizontal: '5%',
        
        
    }
})
export default Profile;