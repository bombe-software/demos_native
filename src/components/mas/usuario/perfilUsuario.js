import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem } from 'native-base';
import { graphql } from 'react-apollo';

import fetchUsuario from './../../../queries/fetchUsuario';

import { title_light, subtitle_light, image_background, primario, peligro } from '../../../../assets/styles';


class PerfilUsuario extends Component {

    render() {
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
                        NombreDeUsuario
                    </Text>                        

                    </View>

                    <View style={styles.card}>
                    <View style={{flex: 1, flexDirection: 'row', padding: 12, alignItems: 'center',}}>
                        
                        <Image
                            source={require('./../../../../assets/images/jaiba.png')}
                            style={styles.avatarImage}
                        />

                        <View style={{marginLeft: 16}}>
                        <Text style={{marginBottom: 8}}>
                            Correo Electrónico:
                        </Text>
                        <Text style={{marginBottom: 8}}>
                            Localidad: 
                        </Text>
                        <Text style={{marginBottom: 8}}>
                            Puntuación:
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

export default PerfilUsuario;