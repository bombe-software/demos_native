import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem } from 'native-base';
import { graphql } from 'react-apollo';

import GenericForm from './../../../generics/generic_form';

import { title_light, subtitle_light, image_background, primario, peligro } from '../../../../../assets/styles.js';

class Avatar extends GenericForm {

    /**
     * Inicializa el state en donde se colocan
     * las clases activas de los avatares y 
     * el avatar seleccionado actual
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            avatar: 'jaiba',
            imgAvatar: ['selected', 'none', 'none', 'none'],
            error: '',
            toggled: false
        };
        this.updateJaiba = this.updateJaiba.bind(this);
        this.updateAnguila = this.updateAnguila.bind(this);
        this.updateChivo = this.updateChivo.bind(this);
        this.updateErizo = this.updateErizo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
    * Cambia el avatar actualmente seleccionado a Jaiba.jpg
    * @method updateJaiba
    * @const state.avatar Hace referencia al avatar actualmente seleccionado
    * @const state.imgAvatar Hace referencia a las clases(css) que tiene cada imagen
    */
    updateJaiba() {
        this.setState({
            avatar: "jaiba",
            imgAvatar: ['selected', 'none', 'none', 'none']
        })
    }

    /**
    * Cambia el avatar actualmente seleccionado a Anguila.jpg
    * @method updateAnguila
    * @const state.avatar Hace referencia al avatar actualmente seleccionado
    * @const state.imgAvatar Hace referencia a las clases(css) que tiene cada imagen
    */
    updateAnguila() {
        this.setState({
            avatar: "anguila",
            imgAvatar: ['none', 'selected', 'none', 'none']
        })
    }

    /**
    * Cambia el avatar actualmente seleccionado a Chivo.jpg
    * @method updateChivo
    * @const state.avatar Hace referencia al avatar actualmente seleccionado
    * @const state.imgAvatar Hace referencia a las clases(css) que tiene cada imagen
    */
    updateChivo() {
        this.setState({
            avatar: "chivo",
            imgAvatar: ['none', 'none', 'selected', 'none']
        })
    }

    /**
    * Cambia el avatar actualmente seleccionado a Erizo.jpg
    * @method updateErizo
    * @const state.avatar Hace referencia al avatar actualmente seleccionado
    * @const state.imgAvatar Hace referencia a las clases(css) que tiene cada imagen
    */
    updateErizo() {
        this.setState({
            avatar: "erizo",
            imgAvatar: ['none', 'none', 'none', 'selected']
        })
    }


    async onSubmit(values) {
        const id = this.props.usuario.id;
        const nombre = this.props.usuario.nombre;
        const password = this.props.usuario.password;
        const avatar = this.state.avatar;

        this.props.mutate({
            variables: {
                id, nombre, password, avatar
            }
        }).then(() => {
            Actions.perfil_mas_root();
        });
};

    compareAvatar(selectedAvatar) {
        if (this.state.avatar === selectedAvatar) return primario;
        return 'white';
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
    render() {
        const { handleSubmit } = this.props;
        return (
            <Container>
                    <ScrollView>
                        <Content style={{ padding: 10 }}>
                            <Form
                                onSubmit={this.onSubmit}
                                validate={values => {

                                

                                }}

                                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                    <View style={{ marginTop: 12 }}>
                                        <Text style={title_light}>Registro</Text>
                                        <View style={{ marginTop: 12 }}>

                                            <View style={{ flex: 1 }}>
                                                <View style={styles.card}>
    
                                                    <Text style={{ paddingHorizontal: 16, paddingVertical: 4 }}>Selecciona un avatar:</Text>
                                                    <View style={{ flex: 1, flexDirection: 'row', padding: 12 }}>
                                                        <View style={{
                                                            padding: 4,
                                                            backgroundColor: this.compareAvatar('jaiba'),
                                                            margin: 4,
                                                        }}>
                                                            <TouchableHighlight onPress={this.updateJaiba}>
                                                                <Image
                                                                    source={require('./../../../../../assets/images/jaiba.png')}
                                                                    style={styles.avatarImage}
                                                                />
                                                            </TouchableHighlight>
                                                        </View>
                                                        <View style={{
                                                            padding: 4,
                                                            backgroundColor: this.compareAvatar('anguila'),
                                                            margin: 4,
                                                        }}>
                                                            <TouchableHighlight onPress={this.updateAnguila}>
                                                                <Image
                                                                    source={require('./../../../../../assets/images/anguila.png')}
                                                                    style={styles.avatarImage}
                                                                />
                                                            </TouchableHighlight>
                                                        </View>
                                                        <View style={{
                                                            padding: 4,
                                                            backgroundColor: this.compareAvatar('chivo'),
                                                            margin: 4,
                                                        }}>
                                                            <TouchableHighlight onPress={this.updateChivo}>
                                                                <Image
                                                                    source={require('./../../../../../assets/images/chivo.png')}
                                                                    style={styles.avatarImage}
                                                                />
                                                            </TouchableHighlight>
                                                        </View>
                                                        <View style={{
                                                            padding: 4,
                                                            backgroundColor: this.compareAvatar('erizo'),
                                                            margin: 4,
                                                        }}>
                                                            <TouchableHighlight onPress={this.updateErizo}>
                                                                <Image
                                                                    source={require('./../../../../../assets/images/erizo.png')}
                                                                    style={styles.avatarImage}
                                                                />
                                                            </TouchableHighlight>
                                                        </View>
                                                    </View>

                                                </View>
                                                 <Button block onPress={handleSubmit}
                                                    style={{ backgroundColor: primario, marginTop: 10 }} >
                                                    <Text>Ingresar</Text>
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
    avatarImage: {
        width: (Dimensions.get('window').width / 4) - 28,
        height: (Dimensions.get('window').width / 4) - 28,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
    }
});

export default Avatar;