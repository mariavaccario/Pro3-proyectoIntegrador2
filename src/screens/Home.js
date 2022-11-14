import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet} from 'react-native';

import Posteo from '../components/Posteo/Posteo'
import Navbar from '../components/Navbar/Navbar'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

   

    componentDidMount() {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => { 
                    posts.push({
                        id: doc.id, 
                        data: doc.data() 
                    }) //aca queremos pushear en users de un objeto literal 
                    this.setState({
                        posts: posts
                    }) //con cada vuelta del forEach le decimos que actualiza el estado para que aunque se actualice, sigan apareciendo los posts
                })
            }
        )
    }

    logout() {
        auth.signOut()
            .then(() => this.props.navigation.navigate("Login"))
    }

    irAComments() {
        this.props.navigation.navigate("Comments")
    }

    render() {
        console.log(this.state.posts);
        return (
            <View style={style.contenedor}>
                <Navbar />

                
                <Image style = {style.logo} 
                    source={require("../../assets/tentate.png")}
                    resizeMode='contain'/>

                <FlatList style={style.fondo}
                    data={this.state.posts}
                    keyExtractor={onePost => onePost.id.toString()}
                    renderItem={({ item }) => <Posteo postData={item} irAComments={ () => this.irAComments()} />}
                />
                <TouchableOpacity onPress={() => this.logout()} >
                    <Text style={style.logout}>Log out</Text>
                </TouchableOpacity> 

            </View>

        )
    }

}
const style = StyleSheet.create({
    fondo: {
        backgroundColor: 'white'

    },
    logout: {
        color: 'black',
        backgroundColor: 'white'

    },
    titulos: {
        color: 'white',
        backgroundColor: 'black',
        flex: 1

    },
    logo:{
        height:100,
        width:'100%', 
        backgroundColor: 'white'
    },

    contenedor: {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            color: 'black'
        
    }




})

export default Home;