import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { graphql, compose } from 'react-apollo';
import fetchPoliticoDetail from './../../../queries/fetchPoliticoDetail';

class PoliticoDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipo_vista: true
        };
    }

    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>
        const politico = this.props.data.politicosPorId;

        return (
            <Container>
                <Content>
                    <Text>{politico.nombre}</Text>
                    <Segment>
                        <Button first active={this.state.tipo_vista} onPress={() => this.setState({ tipo_vista: true })}><Text>Propuestas</Text></Button>
                        <Button last active={!this.state.tipo_vista} onPress={() => this.setState({ tipo_vista: false })}><Text>Historial</Text></Button>
                    </Segment>
                    {(this.state.tipo_vista) ? (
                        (politico.eventos.length != 0) ? (
                            <List dataArray={politico.eventos}
                                renderRow={(evento) => {
                                    return (
                                        <ListItem key={evento.id} onPress={() => { Actions.eventoDetail_politicos_root({ id_evento: evento.id }) }}  >
                                            <Text>{evento.titulo}</Text>
                                        </ ListItem>
                                    );
                                }
                                }>
                            </List>
                        ) : (
                                <View>
                                    <Text>No hay resultados para mostrar</Text>
                                </View>
                            )
                    ) : (
                            (politico.propuestas.length != 0) ? (
                                <List dataArray={politico.propuestas}
                                    renderRow={(propuesta) => {
                                        return (
                                            <ListItem key={propuesta.id} onPress={() => { Actions.propuestaDetail_politicos_root({ id_propuesta: propuesta.id }) }}  >
                                                <Text>{propuesta.titulo}</Text>
                                            </ ListItem>
                                        );
                                    }
                                    }>
                                </List>
                            ) : (
                                    <View>
                                        <Text>No hay resultados para mostrar</Text>
                                    </View>
                                )
                        )}
                </Content>
            </Container>
        );
    }
}

export default graphql(fetchPoliticoDetail, {
    options: (props) => { return { variables: { id: props.id_politico } } }
})(PoliticoDetail);