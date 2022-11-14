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
    
}
}