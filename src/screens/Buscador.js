import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet} from 'react-native';

import { auth, db } from '../firebase/config';
import firebase from 'firebase';

import Navbar from '../components/Navbar/Navbar'

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

goToProfile(item){
    if (item.data.owner === auth.currentUser.email) {
        this.props.navigation.navigate('Profile')
    } else {
        this.props.navigation.navigate('otroProfile', { email: item.data.owner })
    }
}

render(){
    return(

        <View>
            <Navbar/>

            <View style={style.contenedor}>
                <Text style={style.titulo} >Encontrá a la persona que quieras</Text>
                <TextInput style={style.formulario}
                        placeholder= 'Nombre de usuario'
                        keyboardType= 'default'
                        onChangeText= {text => this.filtrar(text)}
                        value = {this.state.input}
                />
                
            </View>
            <View >
            {
                this.state.results.length === 0 ?
                <Text style={style.noExiste}>No existe el usuario que estas buscando</Text>
                :
                <FlatList style={style.resultados}
                        data={this.state.results}
                        keyExtractor={oneUser => oneUser.id.toString()}
                        renderItem={({ item }) => 
                            <Text onPress={() => this.goToProfile(item)} style={style.textoResultados}>{item.data.userName}</Text>
                        }
                />
            }
            </View>
        </View>

    )
}
}

const style = StyleSheet.create({
    titulo: {
        marginLeft: 26, 
        marginRight: 4,
        marginTop: 16,
        fontWeight: 'bold'
    },
    contenedor:{
        margin: 20,
        borderRadius: 7, 
        backgroundColor: 'white',
        marginBottom: 6
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
    noExiste:{
        borderRadius: 7, 
        backgroundColor: 'white',
        marginTop: 6,
        margin: 20,
        padding: 10
    },
    resultados:{
        borderRadius: 7, 
        backgroundColor: 'white',
        marginTop: 1,
        margin: 20,
    },
    textoResultados:{
        paddingLeft: 10,
        margin: 4
    }

    
})


export default Buscador;