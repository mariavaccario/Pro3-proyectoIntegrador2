import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';

import firebase from 'firebase';
import {auth, db} from '../../firebase/config';


class Posteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            numeroLikes: this.props.postData.data.likes.length,
            userLike: false
        }
    }

    componentDidMount(){
        if(this.props.postData.data.likes.includes(auth.currentUser.email)){
            this.setState({
                userLike: true
            })
        }
    }


render(){
    return(
       <View>
            <Image style={style.imagen}
                 source= {{uri: this.props.postData.data.photo}}
                 resizeMode='cover'   
            />
            <Text>
                {this.props.postData.data.userName}
            </Text>
            <Text>
                {this.props.postData.data.textoPost}
            </Text>
       </View>
    )
}
}

const style = StyleSheet.create({
    imagen:{
        height: 1200,
        width: 620,
        alignContent: 'center'

    }
})

export default Posteo;