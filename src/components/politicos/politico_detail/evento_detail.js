import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { graphql, compose } from 'react-apollo';
import fetchEventoDetail from './../../../queries/fetchEvento';

class EventoDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>
        const evento = this.props.data.evento;
        return (
            <Container>
                <Content>
                    <Text>{evento.titulo}</Text>
                </Content>
            </Container>
        );
    }
}

export default graphql(fetchEventoDetail, {
    options: (props) => { return { variables: { id: props.id_evento } } }
})(EventoDetail);