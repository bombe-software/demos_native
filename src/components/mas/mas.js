import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { graphql } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem, List, ListItem, Left, Body, Spinner } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import { title_light, subtitle_light, image_background, primario, peligro } from './../../../assets/styles';

import logout from "../../mutations/logout";
import usuario from "../../queries/fetchUsuario";

class Mas extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        this.props.mutate({
            refetchQueries: [{ query: usuario }]
        });
    }

    render() {
        if(this.props.data.loading) return <Container><Spinner /></Container>;
        return (
            <Container>
                <ScrollView>
                    <Content>
                        <List>
                            {this.props.data.usuario_in ?
                                <ListItem icon onPress={() => { Actions.perfil_mas_root() }} >
                                    <Left>
                                        <Icon name="user" />
                                    </Left>
                                    <Body>
                                        <Text>Mi perfil</Text>
                                    </Body>
                                </ListItem>
                            : <Text/>}
                            <ListItem icon onPress={() => { Actions.busqueda_mas_root() }} >
                                <Left>
                                    <Icon name="search" />
                                </Left>
                                <Body>
                                    <Text>Buscar</Text>
                                </Body>
                            </ListItem>
                            {this.props.data.usuario_in ?
                                <ListItem icon onPress={() => { Actions.landing_before(); this.logout() }} >
                                    <Left>
                                        <Icon name="sign-out" />
                                    </Left>
                                    <Body>
                                        <Text>Cerrar Sesión</Text>
                                    </Body>
                                </ListItem>
                                : <Text/>}

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

export default graphql(logout)(graphql(usuario)(Mas));