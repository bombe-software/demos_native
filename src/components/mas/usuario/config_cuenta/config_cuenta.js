import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, Dimensions, Image, TouchableHighlight } from 'react-native';

import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem,Header, Tab, Tabs } from 'native-base';
import { graphql } from 'react-apollo';

import fetchUsuario from '../../../../queries/fetchUsuario';
import updateUsuario from '../../../../mutations/updateUsuario';
import Password from './password';
import Usuario from './usuario';
import Avatar from './avatar';
import GenericForm from '../../../generics/generic_form';
import { title_light, subtitle_light, image_background, primario, peligro } from '../../../../../assets/styles.js';


class ConfigCuenta extends Component {
    constructor(props) {
        super(props);

    }

    /**
    * Es una forma de capturar cualquier error en la clase 
    * y que este no crashe el programa, ayuda con la depuracion
    * de errores
    * @method componentDidCatch
    * @const info Es más informacion acerca del error
    * @const error Es el titulo del error
    */
    componentDidCatch(error, info) {
        console.log("Error: " + error);
        console.log("Info: " + info);
    }

    /**
    * Realiza el renderizado de la aplicacion 
    * en base a la informacion anterior
    * @returns La cadena HTML que sera mostrada al usuario
    * @method render
    */
   componentWillReceiveProps(nextProps){
    if(nextProps.fetchUsuario)
    {
    nextProps.fetchUsuario.refetch();
    return true;
    }
}
    render() {
        if(this.props.data.loading){return (<View> </View>);}
        let { usuario } = this.props.data;
        const { handleSubmit } = this.props;
        return (
            <Container>
                    <ScrollView>
                        <Content>
                            <Header hasTabs />
                            <Tabs initialPage={0}>
                                <Tab heading="Nombre de usuario">
                                    <Usuario 
                                    mutate = {this.props.mutate}
                                    usuario = { usuario }
                                    />
                                </Tab>
                                <Tab heading="Password">
                                    <Password 
                                    mutate = {this.props.mutate}
                                    usuario = { usuario }
                                    />
                                </Tab>
                                <Tab heading="Avatar">
                                    <Avatar 
                                    mutate = {this.props.mutate}
                                    usuario = { usuario }
                                    />
                                </Tab>
                            </Tabs>
                        </Content>
                    </ScrollView>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    card: {
        backgroundColor: 'white'
    }
});

export default graphql(updateUsuario)(graphql(fetchUsuario)(ConfigCuenta))