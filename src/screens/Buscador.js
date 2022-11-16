import React, { Component } from 'react';
import { View, Text, FlatList, TextInput} from 'react-native';

import { auth, db } from '../firebase/config';
import firebase from 'firebase';



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
                    data: doc.data
                })
                this.setState({
                    users: info
                })
            })})
}

filtrar(texto) {
    let filtrado = this.state.users.filter((users) => users.data.userName.toLowerCase().includes(texto.toLowerCase()))
        this.setState({
            results: filtrado,
            input: texto
        })
}

render(){
    return(

        <View>
            <View>
                <TextInput 
                        placeholder= 'Email'
                        keyboardType= 'default'
                        onChangeText= {texto => this.filtrar(texto)}
                        value = {this.state.input}
                />
            </View>

            {
                this.state.results.length === 0 ?
                <Text>No existe el usuario que estas buscando</Text>
                :
                <FlatList
                        data={this.state.results}
                        keyExtractor={oneUser => oneUser.id.toString()}
                        renderItem={({ item }) => 
                            <Text onPress={() => this.irAPerfil(item)} ></Text>
                        }
                />
            }
        </View>

    )
}
}


export default Buscador;