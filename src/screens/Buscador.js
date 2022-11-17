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

        <View style={style.contenedor}>
            
            <View>
                <Text style={style.titulo} >Encontrá a la persona que quieras</Text>
                <TextInput style={style.formulario}
                        placeholder= 'Nombre de usuario'
                        keyboardType= 'default'
                        onChangeText= {text => this.filtrar(text)}
                        value = {this.state.input}
                />
                
            </View>

            {
                this.state.results.length === 0 ?
                <Text style={style.resultados}>No existe el usuario que estas buscando</Text>
                :
                <FlatList style={style.fondo}
                        data={this.state.results}
                        keyExtractor={oneUser => oneUser.id.toString()}
                        renderItem={({ item }) => 
                            <Text onPress={() => this.otroProfile(item)} style={style.resultados}>{item.data.userName}</Text>
                        }
                />
            }
        </View>

    )
}
}

const style = StyleSheet.create({
    titulo: {
        marginLeft: 30, 
        marginRight: 4,
        marginTop: 16,
        fontWeight: 'bold'
    },
    contenedor:{
        margin: 20, 
        borderRadius: 7, 
        backgroundColor: 'white'
    }, 
    formulario:{
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 9,
        marginTop: 15, 
        marginBottom: 15,
        margin: 15,
        backgroundColor: 'rgb(243,245,243)',
        borderRadius: 7,
        borderColor: 'black',
    },
    resultados:{
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 10
    }
})


export default Buscador;