import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';

import firebase from 'firebase';
import {auth, db} from '../../firebase/config';
import { FontAwesome5 } from '@expo/vector-icons'; 


class Posteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            numeroLikes: this.props.postData.data.likes.length,
            userLike: false, 
            isMyPost: false
        }
    }




    componentDidMount(){
        if(this.props.postData.data.likes.includes(auth.currentUser.email)){
            this.setState({
                userLike: true
            })
        }
        this.Verificar();
    }

    meGusta(){
        db.collection('posts')
            .doc(this.props.postData.id) 
            .update(
                {
                    likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) 
                }
            ) 
            .then(()=> this.setState({
                numeroLikes: this.state.numeroLikes + 1, userLike: true
                })
            ) 
            .catch(error => console.log(error))
    }
        
    
    noMeGusta(){
        
    }

    borrarPosteo() {
        db.collection("posts").doc(this.props.postData.id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    Verificar(){
        this.setState({
            isMyPost: this.props.postData.data.owner === auth.currentUser.email
        })
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

            <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Comments',
            {id:this.props.id}
            )}>
            <Text>Agregar comentario</Text>

            {this.state.isMyPost ? (
                    <TouchableOpacity onPress={() => this.borrarPosteo()}>
            <FontAwesome5 name="trash" size={24} color="black" />
            </TouchableOpacity>
                ) : null}
          </TouchableOpacity>
       </View>
       
    )
}
}

const style = StyleSheet.create({
    imagen:{
        height: 300,
    }
})

export default Posteo;