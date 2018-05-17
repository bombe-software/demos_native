import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem } from 'native-base';
import { graphql } from 'react-apollo';
import axios from 'axios';
import CryptoJS from 'crypto-js';

//Queries y mutations
import { demos_krb_http } from './../../deploy';
import login from "./..//mutations/login";
import usuario_in from "./../queries/fetchUsuario";
import usuario_in$perfil from "./../queries/usuario_in.perfil";

import GenericForm from './generics/generic_form';

import { title_light, subtitle_light, image_background, primario, peligro } from '../../assets/styles.js';

const background_image_url = "https://raw.githubusercontent.com/bombe-software/stock-images/master/demos_native_background_02.jpg";

class Login extends GenericForm {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            error: ''
        }
    }

    async onSubmit(values) {
        const { email, password } = values;

        const ticket = {
            email,
            date: (new Date().getMonth() + "/" + new Date().getFullYear())
        };

        const request = axios.post(`${demos_krb_http}/ticket_controller`, ticket);

        request.then(({ data }) => {
            if (data.message != 404) {
                let bytes = CryptoJS.AES.decrypt(data.message, values.password);
                if (bytes.words[0] == 2065855593) {
                    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    this.props.mutate({
                        variables: {
                            email,
                            password: decryptedData.ticket
                        },
                        refetchQueries: [
                            { query: usuario_in },
                            { query: usuario_in$perfil}
                        ]
                    })
                    .then(data => Actions.root())
                    .catch(res => {
                        const errors = res.graphQLErrors.map(error => error.message);
                        const error = errors[0]
                        this.setState({ error });
                    });    
                } else {
                    Alert.alert(
                        'Error',
                        'Password o email incorrectos',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')}
                        ],
                        { cancelable: false }
                      )
                }
            } else {
                Alert.alert(
                    'Error',
                    'Password o email incorrectos',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')}
                    ],
                    { cancelable: false }
                  )
            }
        });
    };
    render() {
        return (
            <Container>
            <ImageBackground
                    style={image_background}
                    source={{ uri: background_image_url }}
                >
                <ScrollView>
                <Content style={{padding: 10}}>
                    <Form
                        onSubmit={this.onSubmit}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = "Ingrese su email";
                            }
                            if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                errors.email = 'Correo inválido';
                            }
                            if (!values.password) {
                                errors.password = "Ingrese su password";
                            }
                            return errors;
                        }}

                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <View style={{marginTop: 12}}>
                            <Text style={title_light}>Inicio de Sesión</Text>
                            <View style={{flex:1}}>
                                <View style={styles.card}>
                                    <View style={{padding: 16}}>
                                    <Field name="email"
                                        component={this.renderTextField}
                                        label="Email"
                                    />
                                    <Field name="password"
                                        component={this.renderPasswordField}
                                        label='Contraseña'
                                    />
                                    </View>
                                </View>
                                <Button block 
                                    onPress={handleSubmit}
                                    style={{backgroundColor: primario, marginTop: 10}}
                                >
                                    <Text>Ingresar</Text>
                                </Button>

                                <Button block light small transparent
                                    onPress={() => Actions.recover_pass_before()}
                                    style={{marginTop: 8}}
                                >
                                    <Text>Olvidé mi contraseña</Text>
                                </Button>

                                <Button block light small transparent
                                    onPress={() => Actions.landing_before()}
                                    style={{marginTop: 8}}
                                >
                                    <Text>Regresar</Text>
                                </Button>
                                <Text style={{textAlign: 'center', fontSize: 10, color: 'white', marginTop: 30}}>¿No has confirmado tu correo?</Text>
                                <Button block light small transparent
                                    onPress={() => Actions.confirm_email_before()}
                                    style={{ marginTop: 8 }}
                                >
                                    <Text>Confirmar correo</Text>
                                </Button>
                            </View>
                        </View>
                        )}
                    />
                    <Label style={{color: peligro, fontSize: 15}}>{this.state.error}</Label>
                </Content>
                </ScrollView>
            </ImageBackground>
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

export default graphql(login)(Login);