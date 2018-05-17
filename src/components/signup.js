import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet, Dimensions, Image, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem } from 'native-base';
import { graphql } from 'react-apollo';

import signup from "./../mutations/signup";

import GenericForm from './generics/generic_form';

import { title_light, subtitle_light, image_background, primario, peligro } from '../../assets/styles.js';

const background_image_url = "https://raw.githubusercontent.com/bombe-software/stock-images/master/demos_native_background_02.jpg";

import { PermissionsAndroid } from 'react-native';

class SignUp extends GenericForm {

    async permiso() {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                { 'title': 'Ubicacion de la camara', 'message': 'Necesitamos conocer tu ubicacion' });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("location")
            } else {
                console.log("no location")
            }
        } catch (err) {
            console.warn(err)
        }
    }
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
            open: true,
            localidad: '',
            imgAvatar: ['selected', 'none', 'none', 'none'],
            error: '',
            toggled: false,
            address: ''
        };
        this.updateJaiba = this.updateJaiba.bind(this);
        this.loadPosition = this.loadPosition.bind(this);
        this.updateAnguila = this.updateAnguila.bind(this);
        this.updateChivo = this.updateChivo.bind(this);
        this.updateErizo = this.updateErizo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.permiso().then(this.loadPosition);
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

    loadPosition() {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude + "," + pos.coords.longitude}&key=AIzaSyCRi0T7zpYssizFATxh2n0LovJQtvVDNSY`;
                fetch(url)
                    .then(res => res.json())
                    .then((json) => {
                        if (json.status !== 'OK') {
                            throw new Error(`Geocode error: ${json.status}`);
                        }
                        return json;
                    }).then(value => {
                        let estado = '';
                        value.results[0].address_components.map((o) => {
                            for (let i = 0; i < o.types.length; i++) {
                                const element = o.types[i];
                                if (element == "administrative_area_level_1") {
                                    estado = o.long_name;
                                }
                            }
                        });
                        this.setState({ localidad: estado });
                    });
            },
            (err) => {
                console.log(err);
            },
            {
                enableHighAccuracy: true,
                timeout: 100000,
                maximumAge: 0
            });
    }

    async onSubmit(values) {
        if (this.state.avatar == '') {
            this.setState({ error: 'Selecciona un avatar' })
        } else {
            const { avatar } = this.state;
            const {
                nombre, email, password
            } = values;

            this.props.mutate({
                variables: {
                    nombre, email, password, avatar, localidad: "Veracruz", 
                }
            }).then(() => {
                Actions.confirm_email_before();
                console.log("Casi signup");
            });
        }
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
                <ImageBackground
                    style={image_background}
                    source={{ uri: background_image_url }}
                >
                    <ScrollView>
                        <Content style={{ padding: 10 }}>
                            <Form
                                onSubmit={this.onSubmit}
                                validate={values => {

                                    const errors = {};
                                    if (!values.nombre) {
                                        errors.nombre = "Escriba su nombre de usuario";
                                    }
                                    if (values.nombre != undefined) {
                                        var ra = /^[a-z0-9]+$/i;
                                        if (!ra.test(values.nombre)) {
                                            errors.nombre = "Solo puede contener alfa numericos y sin espacios";
                                        }
                                    }
                                    if (!values.email) {
                                        errors.email = "Escriba su email";
                                    }
                                    if (!values.password) {
                                        errors.password = "Escriba su contraseña";
                                    }
                                    if (values.password != undefined) {
                                        var re = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,}$/;
                                        if (!re.test(values.password)) {
                                            errors.password = "Min. 6 caractéres, 1 mayuscula, 1 minuscula y sin espacios";
                                        }
                                    }
                                    if (!values.Rpassword) {
                                        errors.Rpassword = "Escriba su contraseña";
                                    }
                                    if (values.password != values.Rpassword) {
                                        errors.Rpassword = "Asegurese que las contraseñas coincidan";
                                    }
                                    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                        errors.email = 'Correo inválido';
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
                                                        <Field name="nombre"
                                                            component={this.renderTextField}
                                                            label="Nombre"
                                                        />
                                                        <Field name="email"
                                                            component={this.renderTextField}
                                                            label="Email"
                                                        />
                                                        <Field name="password"
                                                            component={this.renderPasswordField}
                                                            label="Password"
                                                        />
                                                        <Field name="Rpassword"
                                                            component={this.renderPasswordField}
                                                            label="Confirmar password"
                                                        />

                                                    </View>
                                                    <Text style={{ paddingHorizontal: 16, paddingVertical: 4 }}>Selecciona un avatar:</Text>
                                                    <View style={{ flex: 1, flexDirection: 'row', padding: 12 }}>
                                                        <View style={{
                                                            padding: 4,
                                                            backgroundColor: this.compareAvatar('jaiba'),
                                                            margin: 4,
                                                        }}>
                                                            <TouchableHighlight onPress={this.updateJaiba}>
                                                                <Image
                                                                    source={require('./../../assets/images/jaiba.png')}
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
                                                                    source={require('./../../assets/images/anguila.png')}
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
                                                                    source={require('./../../assets/images/chivo.png')}
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
                                                                    source={require('./../../assets/images/erizo.png')}
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
                                                    onPress={() => Actions.confirm_email_before()}
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
                </ImageBackground>
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

export default graphql(signup)(SignUp);