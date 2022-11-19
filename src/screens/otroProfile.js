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
import { AntDesign, MaterialIcons, Fontisto } from '@expo/vector-icons';
import Posteo from '../components/Posteo/Posteo';
import Navbar from '../components/Navbar/Navbar'

class OtroProfile extends Component{
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
        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
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
        db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
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
    

    

render(){
    return(
        <View style={style.contenedor}>
            <Navbar/>
            

                <Text onPress={()=> this.props.navigation.navigate('Home')}> 
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Text>
            
            <View style={style.contenedor2}>
                <Text style={style.user}><AntDesign name="adduser" size={70} color="black" /></Text>
                <View style={style.info}>            
                    <Text>{this.state.userName}</Text>
                    <Text>{this.state.email}</Text>
                    <Text>{this.state.bio}</Text>
                    <Text>Cantidad de posteos: {this.state.posteosUser.length}</Text> 
                    
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
export default OtroProfile;