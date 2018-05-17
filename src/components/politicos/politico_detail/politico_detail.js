import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner, Badge } from 'native-base';

import { graphql } from 'react-apollo';
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
        const politico = this.props.data.politico;

        return (
            <Container>
                <ScrollView>
                <Content>
                    <View style={{backgroundColor: 'white', padding: 20}}>
                        <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 10}}>{politico.nombre}</Text>
                        <View style={{paddingBottom: 0, paddingTop: 0}}>
                            <Text>Partido: </Text>
                            <Badge style={{backgroundColor: `rgb(${politico.partido.color})`}}>
                                <Text>
                                {politico.partido.nombre}
                                </Text>
                            </Badge>
                        </View>
                        <View style={{paddingBottom: 0, paddingTop: 0}}>
                            <Text>Cargo: {politico.cargo} </Text>
                        </View>
                        <View style={{paddingBottom: 0, paddingTop: 0}}>
                            <Text>Estado: {politico.estado.nombre} </Text>
                        </View>
                    </View>
                    <View style={styles.segmentButton}> 
                    <Segment>
                        <Button first active={this.state.tipo_vista} onPress={() => this.setState({ tipo_vista: true })}><Text>Propuestas</Text></Button>
                        <Button last active={!this.state.tipo_vista} onPress={() => this.setState({ tipo_vista: false })}><Text>Historial</Text></Button>
                    </Segment>
                    </View>
                    {(this.state.tipo_vista) ? (
                            (politico.propuestas.length != 0) ? (
                                <View style={{minHeight: 30}}>
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
                                </View>
                            ) : (
                                    <View style={styles.centerText}>
                                        <Text>No hay resultados para mostrar</Text>
                                    </View>
                                )
                        ) : (
                            (politico.eventos.length != 0) ? (
                                <View style={{minHeight: 30}}>
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
                                </View>
                            ) : (
                                    <View style={styles.centerText}>
                                        <Text>No hay resultados para mostrar</Text>
                                    </View>
                                )
                        )}
                </Content>
                </ScrollView>
            </Container>
        );
    }
}

let styles = StyleSheet.create({
    segmentButton: {
        backgroundColor: '#4E4E4E'
    },
    centerText: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default graphql(fetchPoliticoDetail, {
    options: (props) => { return { variables: { id: props.id_politico } } }
})(PoliticoDetail);