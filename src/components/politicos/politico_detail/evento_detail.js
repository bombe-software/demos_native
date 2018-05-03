import React, { Component } from 'react';
import { Alert, View, StyleSheet, ScrollView } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { graphql, compose } from 'react-apollo';
import fetchEventoDetail from './../../../queries/fetchEvento';

import {neutro} from './../../../../assets/styles';

class EventoDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>
        const evento = this.props.data.evento;
        return (

            <Container>
            <ScrollView>
                <Content>
                    <View style={styles.card}>

                        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 4}}>{evento.titulo}</Text>
                        <Badge style={{backgroundColor: neutro, marginBottom: 8}}><Text>{evento.fecha.substring(0,15)}</Text></Badge>

                        <Text style={{fontWeight: 'bold'}}>Descripción:</Text>
                        <Text>{evento.descripcion}</Text>

                        <Text style={{color: neutro, marginTop: 8}}>Referencia: {evento.referencia}</Text>

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


export default graphql(fetchEventoDetail, {
    options: (props) => { return { variables: { id: props.id_evento } } }
})(EventoDetail);