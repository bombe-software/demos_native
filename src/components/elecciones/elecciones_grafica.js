import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { graphql, compose } from 'react-apollo';
import fetchVotacionEstado from './../../queries/fetchVotacionEstado';
import Pie from './pie';

class EleccionesGrafica extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>
        const votacion = this.props.data.votacion;
        console.log(votacion);
        
        return (
            <Container>
                <Content>
                    {(votacion != null) ?(
                        <Text>Hay votacion</Text>
                        ) : (
                        <View>
                            <Text>No hay resultados para mostrar</Text>
                        </View>
                    )}
                </Content>
            </Container>
        );
        /*
       return <Pie />;
       */
    }
}

export default graphql(fetchVotacionEstado, {
    options: (props) => { return { variables: { id_estado: props.id_estado } } }
})(EleccionesGrafica);