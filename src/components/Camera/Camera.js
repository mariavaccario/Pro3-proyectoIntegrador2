import React, {Component} from 'react';
import {Camera } from 'expo-camera';
import {storage} from '../../firebase/config';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permissions: false,
            showCamera: true,
            urlTemporal:''
       }

        this.metodosDeCamara = ''
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( () => this.setState({
                permissions: true
            }))
            .catch( e => console.log(e))
    }

    sacarFoto(){
        this.metodosDeCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    urlTemporal: photo.uri,
                    showCamera: false
                })
            })
            .catch( e => console.log(e))
    }

    guardarFoto(){
        fetch(this.state.urlTemporal)
            .then(res => res.blob()) 
            .then( image => { 
                const refStorage = storage.ref(`photos/${Date.now()}.jpg`);
                refStorage.put(image)
                    .then(()=>{
                        refStorage.getDownloadURL()
                        .then( url => this.props.onImageUpload(url))
                    })
            })
            .catch(e => console.log(e))
    }

    cancel(){
        this.setState({
            urlTemporal: '',
            showCamera: true
        })
    }


    render(){
        return(
            <View style={styles.todo}>
            {
                this.state.permissions ? 
                    this.state.showCamera ?
                    <View style={styles.cameraBody}>
                        <Camera
                            style={styles.cameraBody}
                            type = {Camera.Constants.Type.front}
                            ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara }
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.sacarFoto()}>
                            <Entypo style={styles.sacarFoto}name="circle" size={50} color="black" />
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <Image 
                            style={styles.preview}
                            source={{uri: this.state.urlTemporal}}
                            resizeMode='cover'
                        />
                        <TouchableOpacity  style={styles.subir}onPress={()=>this.guardarFoto()}>
                            <Text style={styles.subirText}><Feather name="upload" size={24} color="white" /> Subir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.subir}onPress={()=>this.cancel()}>
                            <Text style={styles.subirText}><Entypo name="cross" size={24} color="white" /> Sacar foto otra vez</Text>
                        </TouchableOpacity>
                        
                    </View>

                :
                    <Text>No tengo permisos</Text>
            }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    todo:{
        backgroundColor: 'white'
    },
    
    cameraBody: {
        height: 400,
    },
    button:{
        height: '20%',
        padding: 5,
        marginTop: 20
    },
    preview:{
        height:350,
        marginTop: 30,
        marginBottom: 3
    },
    subir:{
        marginTop: 30,
        borderColor: '#444',
        borderWidth: 1,
        paddingVertical:6,
        borderRadius: 4,
        backgroundColor:'rgb(49,47,53)'
    },
    subirText:{
        fontSize:20,
        color: '#fff',
        textAlign: 'center',
    },
    
    sacarFoto:{
        marginHorizontal: 100,
        marginVertical:5,
        padding: 15,
        textAlign: 'center',
        
    }

}) 

export default MyCamera;