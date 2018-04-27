import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem } from 'native-base';

import { title_light, subtitle_light, image_background, primario, peligro } from './../../../assets/styles';


class Mas extends Component {

    render() {
        return (
            <Container>
                <ScrollView>
                <Content>
                    
                    <TouchableHighlight onPress={()=>{Actions.perfil_mas_root()}}  >
                        <Text>Perfil de usuario</Text>
                    </ TouchableHighlight>
                    
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
    }
});

export default Mas;