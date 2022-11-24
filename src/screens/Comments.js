import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, TextInput, FlatList} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
            comment: comment,
            
        })
    })
    .then(() => {
        this.setState({
            comment: ""
        })
    })
}

render(){
    
    return(
        <View> 
        <Navbar/>
            <Text style={style.arrow} onPress={()=> this.props.navigation.navigate('Home')}> 
                <AntDesign name="arrowleft" size={24} color="black" />
            </Text>
        <View style={style.contenedor}>
            
        <Text style={style.titulo}>Comentarios del posteo</Text>

        {this.state.comments == 0 ?
        
        <View> 
        <Text style={style.sinComentarios}>Esta publicación aun no tiene comentarios. ¡Sé el primero! </Text>
        </View>
        :
        <FlatList style={style.resultados}
            data={this.state.comments.sort((a,b)=> b.createdAt - a.createdAt)}
            keyExtractor={ oneComment => oneComment.createdAt.toString()}
            renderItem={ ({item}) => <Text>{item.owner}: {item.comment}</Text>}
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
        marginTop: 7, 
        marginBottom: 10,
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
        marginBottom: 10
    },
    contenedor:{
        margin: 20,
        borderRadius: 7, 
        backgroundColor: 'white',
        marginBottom: 6
    },
    resultados:{
        borderRadius: 7, 
        backgroundColor: 'white',
        marginTop: 3,
        margin: 20,
        
        
    },
    titulo: {
        marginLeft: 20,
        marginTop: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 20
    },
    sinComentarios: {
        marginLeft: 20, 
        marginBottom: 5
    }, 
    arrow: {
        marginHorizontal: 10, 
        paddingVertical: 10, 
    }
})

export default Comments