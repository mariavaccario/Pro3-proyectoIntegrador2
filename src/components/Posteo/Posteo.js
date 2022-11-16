import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';

import firebase from 'firebase';
import {auth, db} from '../../firebase/config';
import { FontAwesome5, Feather } from '@expo/vector-icons'; 


class Posteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            numeroLikes: this.props.postData.data.likes.length,
            userLike: false, 
            comments: this.props.postData.data.comments
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
       <View style={style.contenedor}>
            <Image style={style.imagen}
                 source= {{uri: this.props.postData.data.photo}}
                 resizeMode='contain'   
            />
         <View style={style.contenedorUserBio}>
            <Text style={style.user}>
                {this.props.postData.data.userName}
            </Text>
            <Text>
                {this.props.postData.data.textoPost}
            </Text>
        </View>
            <View style={style.likes}>
            <Text style={style.nroLikes}>{this.state.numeroLikes.likes}10 <Feather name="heart" size={20} color="black" /></Text>
            {/* {this.state.userLike ?
                <TouchableOpacity onPress={()=> this.meGusta()}>
                    <Text>Me gusta</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.noMeGusta()}>
                    <Text>No me gusta</Text>
                </TouchableOpacity>

                    }   */}  
          </View>
        <View style={style.iconos}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments',{id:this.props.postData.id})}>
                <Text>Comentarios</Text>
            </TouchableOpacity>
            {this.state.isMyPost ? (
                    <TouchableOpacity onPress={() => this.borrarPosteo()}>
            <FontAwesome5 name="trash" size={18} color="black" style={style.borrar}/>
            </TouchableOpacity>
                ) : null}
        </View>
       </View>
       
    )
}
}

const style = StyleSheet.create({
    imagen:{
        height: 260,
        marginHorizontal: 10,
        marginVertical: 0
    }, 
    contenedor:{
        margin: 20, 
        borderRadius: 7, 
        backgroundColor: 'white'
    }, 
    user:{
        marginLeft: 10, 
        marginRight: 4,
        fontWeight: 'bold'
    }, 
    contenedorUserBio:{
        flexDirection: 'row',
    },
    iconos:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 10, 
        marginBottom: 10
    }, 
    likes:{
        marginHorizontal: 10,
        marginVertical: 5
    }
})

export default Posteo;