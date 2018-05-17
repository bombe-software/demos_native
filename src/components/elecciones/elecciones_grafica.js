import React, { Component } from 'react';
import { Alert, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { VictoryPie, VictoryChart } from 'victory-native'

import { graphql, compose } from 'react-apollo';
import fetchVotacionEstado from './../../queries/fetchVotacionEstado';
import fetchUsuario from "./../../queries/fetchUsuario";

import { primario } from '../../../assets/styles';

class EleccionesGrafica extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data.loading || this.props.fetchUsuario.loading)  return <Container><Spinner /></Container>
        const votacion = this.props.data.votacion;

        if (this.props.data.votacion == null) {
            return (
                <View>
                    <Text>No hay elecciones en este estado</Text>
                </View>
            )
        }

        if (this.props.data.votacion.preferencias.length <= 0) {
            return (
                <View>
                    <Text>No hay votos aún</Text>
                </View>
            )
        }

        let chartData = [];
        let colors = [];
        var pref;

        var p = this.props.data.votacion.preferencias;
        _.mapValues(p, function (o) {
            pref = JSON.stringify(p);
            chartData.push({
                x: ' ',
                y: o.usuarios.length + 3
            });
            colors.push(`rgb(${o.politico.partido.color})`);
        });

        return (

            <Container style={{ backgroundColor: 'white' }}>
                <Content>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 16 }}>
                        Encuesta de {this.props.data.votacion.estado.nombre}
                    </Text>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <VictoryPie
                            data={chartData}
                            colorScale={colors}
                            width={Dimensions.get('window').width - 20}
                            height={240} />
                    </View>
                    <List dataArray={this.props.data.votacion.preferencias}
                        renderRow={(p) =>
                            <ListItem key={p.id} style={{ flex: 1, flexDirection: 'row', padding: 4 }} >
                                <View style={{ height: 12, width: 12, marginRight: 10, backgroundColor: `rgb(${p.politico.partido.color})` }}></View>
                                <Text>{p.politico.nombre}: {p.usuarios.length + 3}</Text>
                            </ ListItem>
                        }>
                    </List>
                    <View style={{ height: 10, width: Dimensions.get('window').width }}></View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        {this.props.fetchUsuario.usuario_in ?
                            <Button style={{ backgroundColor: primario }} onPress={() => {
                                Actions.encuesta_elecciones_root(
                                    {
                                        id_estado: votacion.estado.id,
                                        id_votacion: votacion.id,
                                    })
                            }}>
                                <Text>Contestar encuesta</Text>
                            </Button>
                            : <Text />}

                    </View>
                    <View style={{ height: 10, width: Dimensions.get('window').width }}></View>
                </Content>
            </Container>
        );
    }
}
export default compose(
    graphql(fetchVotacionEstado, {
        options: (props) => { return { variables: { id_estado: props.id_estado } } }
    }),
    graphql(fetchUsuario, {
      name: 'fetchUsuario',
    })
)(EleccionesGrafica);