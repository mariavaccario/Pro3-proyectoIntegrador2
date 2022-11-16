import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, TextInput, FlatList} from 'react-native';

import { auth, db } from '../firebase/config';


class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.route.params.id,
            comment:"",
            comments: []
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
        <Text> Comentarios del posteo</Text>

        {this.state.comments == 0 ?
        
        <View> 
        <Text  > Esta publicación aun no tiene comentarios. ¡Sé el primero! </Text>
        </View>
        :
        <FlatList 
            data={this.state.comments}
            keyExtractor={ oneComment => oneComment.createdAt.toString()}
            renderItem={ ({item}) => <Text>{item.creador} : {item.comment}</Text>}
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