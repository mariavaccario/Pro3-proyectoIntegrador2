import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, TextInput, FlatList} from 'react-native';

import { auth, db } from '../firebase/config';
import firebase from 'firebase';

import Navbar from '../components/Navbar/Navbar'

class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.route.params.id,
            comment:"",
            comments: [],
        }
    }

componentDidMount(){
    db.collection('posts').doc(this.state.id).onSnapshot(docs => {
        this.setState({
            comments: docs.data().comments
        })
    })
} 

addComment(comment){
    db.collection('posts').doc(this.state.id).update({
        comments: firebase.firestore.FieldValue.arrayUnion ({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            comment: comment
        })
    })
    .then(() => {
        this.setState({
            comment: ""
        })
    })
}

render(){
    console.log(this.state.comments)
    return(
        <View> 
        <Navbar/>
        <View style={style.contenedor}>
        <Text> Comentarios del posteo</Text>

        {this.state.comments == 0 ?
        
        <View> 
        <Text  > Esta publicación aun no tiene comentarios. ¡Sé el primero! </Text>
        </View>
        :
        <FlatList 
            data={this.state.comments}
            keyExtractor={ oneComment => oneComment.createdAt.toString()}
            renderItem={ ({item}) => <Text>{item.owner} : {item.comment}</Text>}
        /> 
        }
        <TextInput style={style.formulario}
            placeholder='Agregue un comentario'
            keyboardType='default'
            onChangeText={text=> this.setState({comment:text})}
            value={this.state.comment}
        />
        {this.state.comment == "" ?
            <Text></Text>
            :
            <TouchableOpacity onPress={()=>this.addComment(this.state.comment)}>
            <Text style={style.botonComentar}>Comentar</Text>
            </TouchableOpacity> 

    

}
</View>
        </View>
    )
}


}

const style = StyleSheet.create({
    formulario:{
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 9,
        marginTop: 15, 
        marginBottom: 15,
        margin: 15,
        backgroundColor: 'rgb(243,245,243)',
        borderRadius: 7,
        borderColor: 'black',
    },
    botonComentar: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'rgb(49,47,53)',
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        textAlign: 'center',
        color: 'white',
        borderRadius: 7,
    },
    contenedor:{
        margin: 20,
        borderRadius: 7, 
        backgroundColor: 'white',
        marginBottom: 6
    }
})

export default Comments