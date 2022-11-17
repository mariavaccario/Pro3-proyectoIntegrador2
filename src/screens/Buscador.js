import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet} from 'react-native';

import { auth, db } from '../firebase/config';
import firebase from 'firebase';

// import { FontAwesome } from '@expo/vector-icons';



class Buscador extends Component{
    constructor(props){
        super(props);
        this.state = {
            input: "",
            users: [],
            results: []
        }
    }

componentDidMount() {
    db.collection('users').onSnapshot(
        docs =>{
            let info = [];
            docs.forEach (doc => {
                info.push({
                    id: doc.id,
                    data: doc.data()
                })
                this.setState({
                    users: info
                })
            })})
}

filtrar(texto) {
    let filtrado = this.state.users.filter((user) => user.data.userName.toLowerCase().includes(texto.toLowerCase()))
    console.log(filtrado);
        this.setState({
            results: filtrado,
            input: texto
        })
}

render(){
    return(

        <View>
            
            <View>
                <Text>Encontrá a la persona que quieras</Text>
                <TextInput 
                        placeholder= 'Nombre de usuario'
                        keyboardType= 'default'
                        onChangeText= {text => this.filtrar(text)}
                        value = {this.state.input}
                />
                
            </View>

            {
                this.state.results.length === 0 ?
                <Text>No existe el usuario que estas buscando</Text>
                :
                <FlatList style={style.fondo}
                        data={this.state.results}
                        keyExtractor={oneUser => oneUser.id.toString()}
                        renderItem={({ item }) => 
                            <Text onPress={() => this.irAPerfil(item)} >{item.data.userName}</Text>
                        }
                />
            }
        </View>

    )
}
}

const style = StyleSheet.create({
    fondo: {
        backgroundColor: 'rgb(242,242,242)'

    },
    logout: {
        color: 'black',
        backgroundColor: 'white'

    },
    titulos: {
        color: 'white',
        backgroundColor: 'black',
        flex: 1

    },
    logo:{
        height:100,
        width:'100%', 
        backgroundColor: 'white'
    },

    contenedor: {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            color: 'black'
        
    }




})


export default Buscador;