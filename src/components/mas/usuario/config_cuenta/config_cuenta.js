import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, Dimensions, Image, TouchableHighlight, BackHandler} from 'react-native';

import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem,Header, Tab, Tabs } from 'native-base';
import { graphql, compose } from 'react-apollo';

import fetchUsuario from '../../../../queries/fetchUsuario';
import update_usuario$nombre from '../../../../mutations/usuario.config_cuenta.nombre';
import update_usuario$password from '../../../../mutations/usuario.config_cuenta.password';
import update_usuario$avatar from '../../../../mutations/usuario.config_cuenta.avatar';

import Password from './password';
import Usuario from './usuario';
import Avatar from './avatar';
import GenericForm from '../../../generics/generic_form';
import { title_light, subtitle_light, image_background, primario, peligro } from '../../../../../assets/styles.js';


class ConfigCuenta extends Component {
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
                                    mutate = {this.props.update_usuario}
                                    />
                                </Tab>
                                <Tab heading="Password">
                                    <Password 
                                    mutate = {this.props.update_password}
                                    />
                                </Tab>
                                <Tab heading="Avatar">
                                    <Avatar 
                                    mutate = {this.props.update_avatar}
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

export default compose(
    graphql(fetchUsuario, {
      name: 'data'
    }),
    graphql(update_usuario$nombre, {
      name: 'update_usuario',
    }),
    graphql(update_usuario$avatar, {
        name: 'update_avatar'
    }),
    graphql(update_usuario$password, {
        name: 'update_password'
    })
)(ConfigCuenta);