import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem } from 'native-base';
import { graphql } from 'react-apollo';
import axios from 'axios';
import CryptoJS from 'crypto-js';

import GenericForm from './generics/generic_form';

import fetchUsuario from './../queries/fetchUsuario';
import confirmEmail from "./../mutations/confirmEmail";

import { title_light, subtitle_light, image_background, primario, peligro } from '../../assets/styles.js';

const background_image_url = "https://raw.githubusercontent.com/bombe-software/stock-images/master/demos_native_background_02.jpg";


class ConfirmEmail extends GenericForm {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(values) {
        this.props.mutate({
            variables: values
        })
            .then(data => Actions.login_before())
            .catch(({ graphQLErrors }) => this.setState({ error: graphQLErrors[0].message }))
    }


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
                            if (!values.firma) {
                                errors.email = "Ingrese la firma";
                            }
                            return errors;
                        }}

                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <View style={{marginTop: 12}}>
                            <Text style={title_light}>Verifica tu correo</Text>
                            <View style={{flex:1}}>
                                <View style={styles.card}>
                                    <View style={{padding: 16, paddingTop: 12}}>
                                    <Field name="email"
                                        component={this.renderTextField}
                                        label="Email"
                                    />
                                    <Field name="firma"
                                        component={this.renderTextField}
                                        label="Clave"
                                    />
                                    </View>
                                </View>
                                <Button block 
                                    onPress={handleSubmit}
                                    style={{backgroundColor: primario, marginTop: 10}}
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

export default graphql(fetchUsuario)(graphql(confirmEmail)(ConfirmEmail));