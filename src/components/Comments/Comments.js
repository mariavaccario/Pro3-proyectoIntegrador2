import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, TextInput, FlatList} from 'react-native';

import firebase from 'firebase';
import {auth, db} from '../../firebase/config';

class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.route.params.id,
            comment:"",
            comments: []
        }
    }

componentDidMount(){
    db.collection('posts').doc(this.state.id).onSnapshot(doc => {
        this.setState({
            comments: doc.data().comments
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
        <Text> Comentarios del posteo</Text>

        {this.state.comentarios == 0 ?
        
        <View> 
        <Text  > Esta publicación no tiene comentarios. ¡Sé el primero! </Text>
        </View>
        :
        <FlatList 
            data={this.state.comments}
            keyExtractor={ oneComment => oneComment.createdAt.toString()}
            renderItem={ ({item}) => <Text>{item.creador} comentó: {item.comment}</Text>}
        /> 
        }
        <TextInput 
            placeholder='Agregue un comentario'
            keyboardType='default'
            onChangeText={text=> this.setState({comment:text})}
            value={this.state.comment}
        />
        {this.state.comment == "" ?
            <Text></Text>
            :
            <TouchableOpacity onPress={()=> this.addComment(this.state.comment) }>
                <Text>Subir comentario</Text>
            </TouchableOpacity> 

    

}
        </View>
    )
}


}

export default Comments