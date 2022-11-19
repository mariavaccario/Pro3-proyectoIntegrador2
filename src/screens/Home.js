import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator} from 'react-native';

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
        db.collection('posts').onSnapshot(
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
   // irAComments() {
     //   this.props.navigation.navigate("Comments")
    //}

    render() {
        
        return (
            <View style={style.contenedor}>
                <Navbar />

                

                <FlatList style={style.fondo}
                    data={this.state.posts}
                    keyExtractor={onePost => onePost.id.toString()}
                    renderItem={({ item }) => <Posteo postData={item} irAComments={ () => this.irAComments()} navigation={this.props.navigation} />}
                />
                

            </View>

        )
    }

}
const style = StyleSheet.create({
    fondo: {
        backgroundColor: 'rgb(242,242,242)'

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