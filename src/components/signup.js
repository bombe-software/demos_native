import React, { Component } from 'react';
import { View, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input } from 'native-base';
import { graphql } from 'react-apollo';

import signup from "./../mutations/signup";

import GenericForm from './generics/generic_form';

class SignUp extends GenericForm {

    /**
     * Inicializa el state en donde se colocan
     * las clases activas de los avatares y 
     * el avatar seleccionado actual
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            open: true,
            localidad: '',
            imgAvatar: ['none', 'none', 'none', 'none'],
            error: '',
            toggled: false,
            address: ''
        };
        this.updateJaiba = this.updateJaiba.bind(this);
        this.loadPosition = this.loadPosition.bind(this);
        this.updateAnguila = this.updateAnguila.bind(this);
        this.updateChivo = this.updateChivo.bind(this);
        this.updateErizo = this.updateErizo.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
        this.loadPosition();
    };

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
            avatar: "bussines",
            imgAvatar: ['none', 'none', 'none', 'selected']
        })
    }

    loadPosition() {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                let crd = pos.coords;
                createClient({ key: 'AIzaSyCRi0T7zpYssizFATxh2n0LovJQtvVDNSY' }).reverseGeocode({
                    latlng: (crd.latitude + "," + crd.longitude)
                }, (err, response) => {
                    let estado = '';
                    if (!err) {
                        response.json.results[0].address_components.map((o) => {
                            for (let i = 0; i < o.types.length; i++) {
                                const element = o.types[i];
                                if (element == "administrative_area_level_1") {
                                    estado = o.long_name;
                                }
                            }
                            return true;
                        });
                    }
                    this.setState({ localidad: estado });
                });
                this.setState({ toggled: true });
            },
            (err) => {
                this.setState({ error: "Se necesita la ubicación para proceder con el registro" });
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
    }

    async onSubmit(values) {
        if (this.state.avatar == '') {
            this.setState({ error: 'Selecciona un avatar' })
        } else {
            const { avatar, localidad } = this.state;
            console.log(localidad);
            const {
                nombre, email, password,
                curp
            } = values;
            console.log(localidad);
            this.props.mutate({
                variables: {
                    nombre, email, password, localidad,
                    curp, avatar
                }
            }).then(() => {
                console.log("Casi signup");
            });
        }
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
        Alert.alert(
            'Error',
            'Password o email incorrectos',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
        return (
            <Container>
                <Content>
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
                            if (!values.curp) {
                              errors.curp = "Escriba su curp";
                            }
                            if (values.curp != undefined) {
                              var ri = /^([A-Z]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[A-Z]{3}[0-9A-Z]\d)$/i
                              if (!ri.test(values.curp)) {
                                errors.curp = "CURP invalido";
                              }
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
                            <View>
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
                                <Field name="curp"
                                    component={this.renderTextField}
                                    label="Curp"
                                />
                                <Button onPress={handleSubmit} block >
                                    <Text>Click Me! </Text>
                                </Button>
                            </View>
                        )}
                    />
                    <Label style={{ color: 'red', fontSize: 15 }}>{this.state.error}</Label>
                </Content>
            </Container>
        );
    }
}

export default graphql(signup)(SignUp);