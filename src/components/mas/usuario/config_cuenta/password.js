import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, Dimensions, Image, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem } from 'native-base';
import { graphql } from 'react-apollo';

import update_usuario from "./../../../../mutations/usuario.config_cuenta.password";

import GenericForm from './../../../generics/generic_form';

import { title_light, subtitle_light, image_background, primario, peligro } from '../../../../../assets/styles.js';


//const urlImage = '../../assets/images/';

class Password extends GenericForm {

    /**
     * Inicializa el state en donde se colocan
     * las clases activas de los avatares y 
     * el avatar seleccionado actual
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            toggled: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(values) {
        const password = values.password;
            this.props.mutate({
                variables: {
                    password
                }
            }).then(() => {
                Actions.perfil_mas_root();
            });
    };


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
    render() {
        const { handleSubmit } = this.props;
        return (
            <Container>
                    <ScrollView>
                        <Content style={{ padding: 10 }}>
                            <Form
                                onSubmit={this.onSubmit}
                                validate={values => {

                                    const errors = {};
                                    if (!values.password) {
                                        errors.password = "Escriba su nueva password";
                                    }

                                    return errors;

                                }}

                                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                    <View style={{ marginTop: 12 }}>
                                        <Text style={title_light}>Registro</Text>
                                        <View style={{ marginTop: 12 }}>

                                            <View style={{ flex: 1 }}>
                                                <View style={styles.card}>
                                                    <View style={{ padding: 16, paddingTop: 12 }}>
                                                        <Field name="password"
                                                            component={this.renderPasswordField}
                                                            label="password"
                                                        />
                                                    </View>
                                                    
                                                </View>
                                                <Button block onPress={handleSubmit} onPress={handleSubmit}
                                                    style={{ backgroundColor: primario, marginTop: 10 }} >
                                                    <Text>Cambiar</Text>
                                                </Button>
                                                <Button block light small transparent
                                                    onPress={() => Actions.perfil_mas_root()}
                                                    style={{ marginTop: 8 }}
                                                >
                                                    <Text>Regresar</Text>
                                                </Button>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
                            <Label style={{ color: 'red', fontSize: 15 }}>{this.state.error}</Label>
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

export default Password;