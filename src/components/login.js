import React, { Component } from 'react';
import { View } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Form, Field } from 'react-final-form'
import { Container, Content, Button, Text, Item, Label, Input } from 'native-base';
import { graphql } from 'react-apollo';
import axios from 'axios';


import login from "./../mutations/login";
import query from "./../queries/fetchUsuario";

import GenericForm from './generics/generic_form';

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
            date: (new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear())
        };

        const request = axios.post("http://192.168.0.1:5000/ticket_controller", ticket);
        request.then(({ data }) => {
            if (data.message != 404) {
                let bytes = CryptoJS.AES.decrypt(data.message, values.password);
                if (bytes.words[0] == 2065855593) {
                    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    console.log(email);
                    this.props.mutate({
                        variables: {
                            email,
                            password: decryptedData.ticket
                        },
                        refetchQueries: [{ query }]
                    })
                    .then(Actions.root)
                    .catch(res => {
                        const errors = res.graphQLErrors.map(error => error.message);
                        const error = errors[0]
                        this.setState({ error });
                    });  
                } else {
                    this.setState({ error: "Password o email incorrecto." });
                }
            } else {
                this.setState({ error: "Password o email incorrecto." });
            }
        }).catch((error)=>{
            console.log(error);
        });
    };
    render() {
        return (
            <Container>
                <Content>
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
                            <View>
                                <Field name="email"
                                    component={this.renderTextField}
                                    label="Email"
                                />
                                <Field name="password"
                                    component={this.renderPasswordField}
                                    label="Password"
                                />
                                <Button onPress={handleSubmit} block >
                                    <Text>Click Me! </Text>
                                </Button>
                            </View>
                        )}
                    />
                    <Label style={{color: 'red', fontSize: 15}}>{this.error}</Label>
                </Content>
            </Container>
        );
    }
}
export default graphql(query)(graphql(login)(Login));