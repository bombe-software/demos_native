import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem, Spinner } from 'native-base';
import { graphql } from 'react-apollo';

import fetchUsuario from './../../../queries/fetchUsuario';

import { title_light, subtitle_light, image_background, primario, peligro } from '../../../../assets/styles';


class PerfilUsuario extends Component {

    render() {
        if (this.props.data.loading) 
            return <Container><Spinner /></Container>
        let {usuario} = this.props.data;
        if (JSON.stringify(usuario) == undefined) {
            return (
                <Container>
                    <Text>
                        Necesitas iniciar sesión para ingresar a este módulo
                    </Text>
                </Container>
            );
        } 

        var urlImage = `./../../../../assets/images/jaiba.png`;

        return (
            <Container>
                <ScrollView>
                <Content>
                    
                    <View style={{
                        backgroundColor: '#3DC098',
                        flex: 1,
                        padding: 16,
                        paddingTop: 20,
                        paddingBottom: 20,
                        width: (Dimensions.get('window').width)
                    }}>

                    <Text style={{fontSize: 20, color: 'white'}}>
                        @{usuario.nombre}
                    </Text>                        

                    </View>

                    <View style={styles.card}>
                    <View style={{flex: 1, flexDirection: 'row', padding: 12, alignItems: 'center',}}>
                        
                        <Image
                            source={require(urlImage)}
                            style={styles.avatarImage}
                        />

                        <View style={{marginLeft: 16}}>
                        <Text style={{marginBottom: 8}}>
                            Correo Electrónico: {usuario.email}
                        </Text>
                        <Text style={{marginBottom: 8}}>
                            Localidad: {usuario.localidad.nombre}
                        </Text>
                        <Text style={{marginBottom: 8}}>
                            Puntuación: {usuario.puntos}
                        </Text>
                        <Text style={{marginBottom: 8}}>
                            Tipo Usuario: {usuario.tipo_usuario.tipo}
                        </Text>
                        </View> 
                    </View>
                    </View>
                    
                </Content>
                </ScrollView>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
    }, 
    avatarImage: {
        width: (Dimensions.get('window').width/4)-20,
        height: (Dimensions.get('window').width/4)-20,
        padding: 24,
    },
});

export default graphql(fetchUsuario)(PerfilUsuario);