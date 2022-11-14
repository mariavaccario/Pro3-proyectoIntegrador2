import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';

import firebase from 'firebase';
import {auth, db} from '../../firebase/config';


class Posteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            numeroLikes: this.props.postData.data.likes.length,
            userLike: false //checkea si el loguado esta en el array de likes o no. si mi email 
        }
    }




    componentDidMount(){
        if(this.props.postData.data.likes.includes(auth.currentUser.email)){
            this.setState({
                userLike: true
            })
        }
    }

    meGusta(){
        db.collection('posts')
            .doc(this.props.postData.id) //identifico el documento
            .update(
                {
                    likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //es el array que quiero modificar  y falta traer el usuario que esta logueado
                }
            ) //lo que quiero agregar
            .then(()=> this.setState({
                numeroLikes: this.state.numeroLikes + 1, userLike: true
                })
            ) //lo que quiero hacer despues de modificar un array
            .catch(error => console.log(error))
    }
        
    
    noMeGusta(){
        
    }


render(){
    return(
       <View>
            <Image style={style.imagen}
                 source= {{uri: this.props.postData.data.photo}}
                 resizeMode='contain'   
            />
        {this.state.userLike ?
             <TouchableOpacity onPress={()=> this.meGusta()}>
                <Text>Me gusta</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=> this.noMeGusta()}>
                <Text>No me gusta</Text>
            </TouchableOpacity>


        }

           
            
            <Text>{this.state.numeroLikes.likes} me gusta</Text>
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
        height: 500,
        
        alignContent: 'center'


    }
})

export default Posteo;