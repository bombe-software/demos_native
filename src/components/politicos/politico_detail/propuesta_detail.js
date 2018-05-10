import React, { Component } from 'react';
import { Alert, View, ScrollView, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { graphql, compose } from 'react-apollo';
import fetchPropuestaDetail from './../../../queries/fetchPropuesta';

import {neutro} from './../../../../assets/styles';

class PropuestaDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>
        const propuesta = this.props.data.propuesta;
        console.log(propuesta)
        return (
            <Container>
                <ScrollView>
                    <Content>
                        <View style={styles.card}>

                            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 4}}>{propuesta.titulo}</Text>
                            <Badge style={{backgroundColor: neutro, marginBottom: 8}}><Text>{propuesta.tipo_propuesta.tipo}</Text></Badge>

                            <Text style={{fontWeight: 'bold'}}>Descripción:</Text>
                            <Text>{propuesta.descripcion}</Text>

                            <Text style={{color: neutro, marginTop: 8}}>Referencia: {propuesta.referencia}</Text>

                        </View>
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
        padding: 20,
        margin: 8
    }
});

export default graphql(fetchPropuestaDetail, {
    options: (props) => { return { variables: { id: props.id_propuesta } } }
})(PropuestaDetail);