import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, TextInput} from 'react-native';

import firebase from 'firebase';
import {auth, db} from '../../firebase/config';

class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            newComment: '',
            id: '',
            data: {}
        }
    }

componentDidMount(){
    db.collection('posts')
    .doc(this.props.route.paramas.id)
    .onSnapshot(doc => {
        this.setState({
            id: doc.id,
            data: doc.data()
        })
    }) // onSnapshot() entregará un array de documentos que deberemos recorrer para extraer los datos de cada documento con el método data()
}

addComment(idDoc, text){
    db.collection('posts')
    .doc(idDoc)
    .update({
        comments: firebase.firestore.FieldValue.arrayUnion ({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            comment: text
        })
    })
}


}

export default Comments