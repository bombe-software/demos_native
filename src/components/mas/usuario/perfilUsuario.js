import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem } from 'native-base';
import { graphql } from 'react-apollo';

import fetchUsuario from './../../../queries/fetchUsuario';

import { title_light, subtitle_light, image_background, primario, peligro } from '../../../../assets/styles';


class PerfilUsuario extends GenericForm {

    render() {
        return (
            <Container>
                <ScrollView>
                <Content>
                    
                    <View style={{
                        backgroundColor: '#74002D',
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
                    <View style={{flex: 1, flexDirection: 'row', padding: 12}}>
                        
                        <Image
                            source={require('./../../../../assets/images/jaiba.png')}
                            style={styles.avatarImage}
                        />

                        <View>
                        <Text>
                            CorreoElectrónico
                        </Text>
                        <Text>
                            Localidad
                        </Text>
                        <Text>
                            Puntuación
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
        width: (Dimensions.get('window').width/4)-28,
        height: (Dimensions.get('window').width/4)-28,
    },
});

export default PerfilUsuario;