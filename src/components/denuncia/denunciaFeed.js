import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label } from 'native-base';
import { graphql } from 'react-apollo';

import GenericForm from './../generics/generic_form';

import { title_light, subtitle_light, image_background, primario, peligro } from '../../../assets/styles.js';


class DenunciaFeed extends GenericForm {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            error: ''
        }
    }

    async onSubmit(values) {
      
    };


    render() {
        return (
            <Container>
                <ScrollView>
                <Content style={{padding: 10}}>
                    <Form
                        onSubmit={this.onSubmit}
                        validate={values => {
                            const errors = {};
                            if (!values.titulo) {
                                errors.titulo = "Ingrese un titulo";
                            }
                            if (!values.descripcion) {
                                errors.descripcion = "Ingrese su descripcion";
                            }
                            return errors;
                        }}

                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <View style={{marginTop: 12}}>
                            <Text style={title_light}>Denuncia</Text>
                            <View style={{flex:1}}>
                                <View style={styles.card}>
                                    <View style={{padding: 16}}>
                                    <Field name="titulo"
                                        component={this.renderTextField}
                                        label="Titulo"
                                    />
                                    <Field name="descripcion"
                                        component={this.renderTextArea}
                                        label='Descripcion'
                                    />
                                    </View>
                                </View>
                                <Button block 
                                    onPress={handleSubmit}
                                    style={{backgroundColor: primario, marginTop: 10}}
                                >
                                    <Text>Ingresar</Text>
                                </Button>
                            </View>
                        </View>
                        )}
                    />
                    <Label style={{color: peligro, fontSize: 15}}>{this.state.error}</Label>
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

export default DenunciaFeed;