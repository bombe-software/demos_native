import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { graphql, compose } from 'react-apollo';
import fetchPropuestaDetail from './../../../queries/fetchPropuesta';

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
                <Content>
                    <Text>{propuesta.titulo}</Text>
                </Content>
            </Container>
        );
    }
}

export default graphql(fetchPropuestaDetail, {
    options: (props) => { return { variables: { id: props.id_propuesta } } }
})(PropuestaDetail);