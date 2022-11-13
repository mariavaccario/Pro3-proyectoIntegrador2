import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-web';

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
            <>
                <Navbar />
               <Text>Tentate con BeFoodie</Text>

                <FlatList style={styles.fondo}
                    data={this.state.posts}
                    keyExtractor={onePost => onePost.id.toString()}
                    renderItem={({ item }) => <Posteo postData={item} irAComments={ () => this.irAComments()} />}
                />
                <TouchableOpacity onPress={() => this.logout()} >
                    <Text style={styles.logout}>Log out</Text>
                </TouchableOpacity> 


            </>

        )
    }

}
const styles = StyleSheet.create({
    fondo: {
        backgroundColor: 'white'

    },
    logout: {
        color: 'white',
        backgroundColor: 'black'

    },
    titulos: {
        color: 'white',
        backgroundColor: 'black',
        flex: 1


    }

})

export default Home;