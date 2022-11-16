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
    constructor(props){
        super(props)
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
            
            <View style={style.contenedor2}>
                <Text style={style.user}><AntDesign name="adduser" size={70} color="black" /></Text>
                <View style={style.info}>            
                    <Text>{this.state.userName}</Text>
                    <Text>{this.state.email}</Text>
                    <Text>{this.state.bio}</Text>
                    <Text>Cantidad de posteos: {this.state.posteosUser.length}</Text> 
                    <View style={ style.icons}>
                        <Text style={style.logout}><Fontisto name="player-settings" size={20} color="black" /></Text>
                        <TouchableOpacity onPress={() => this.logout()} >   
                            <Text style={style.logout}><MaterialIcons name="logout" size={20} color="black" /></Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>

            
            {/* <Text style={style.misPosteos}>Mis posteos:</Text> */}
            {/* <Image style = {style.logo} 
                    source={require("../../assets/posts.png")}
                    resizeMode='contain'
            /> */}

            <FlatList
                data= {this.state.posteosUser}
                keyExtractor={onePost => onePost.id.toString()}
                renderItem= {({item})=> <Posteo postData={item} />}
                // refrescarPosts={this.traerPosteosUser}

            />
        </View>
    )
}}
const style = StyleSheet.create({
    contenedor:{
        flex:1,
    },
    contenedor2:{
        flexDirection: 'row',
        marginTop:20
    },
    info:{
        textAlign: 'center',
        marginTop: 5
    }, 
    user:{
        textAlign: 'center', 
        marginTop: 10,
        marginBottom: 30,
        marginHorizontal: 50,  
        borderRadius: 40, 
        borderColor: 'black', 
        borderWidth: 2, 
        paddingHorizontal: 10, 
        alignItems: 'center', 
        backgroundColor: 'white'
    }, 
    icons: {
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    logout:{
        margin: 10, 
    }, 
    logo: {
        height:100,
        width:'50%',
        padding: 10,
        marginTop: 20,
        marginHorizontal: '5%',
    }, 
    misPosteos:{
        marginHorizontal: 22
    }
})
export default Profile;