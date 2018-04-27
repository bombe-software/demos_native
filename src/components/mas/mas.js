import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Text, List, ListItem, Left, Body } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import { title_light, subtitle_light, image_background, primario, peligro } from './../../../assets/styles';


class Mas extends Component {

    render() {
        return (
            <Container>
                <ScrollView>
                <Content>
                    
                    <List>
                        <ListItem icon onPress={()=>{Actions.perfil_mas_root()}} >
                        <Left>
                            <Icon name="user" />
                        </Left>
                        <Body>
                            <Text>Mi perfil</Text>
                        </Body>
                        </ListItem>

                        <ListItem icon onPress={()=>{Actions.busqueda_mas_root()}} >
                        <Left>
                            <Icon name="search" />
                        </Left>
                        <Body>
                            <Text>Buscar</Text>
                        </Body>
                        </ListItem>
                    </List>
                    
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