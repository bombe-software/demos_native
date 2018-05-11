import React, { Component } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner, CardItem, Card, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';

import {gray} from './../../../assets/styles';

import { graphql, compose } from 'react-apollo';
import fetch_politicos from './../../queries/fetchPoliticosPorEstado';

class PoliticosRegion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_candidato: true
        };
    }

    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>;

        let politicos = [];
        if (this.props.is_candidato) {
            politicos = this.props.data.politicosPorEstado.filter(politico => {
                return politico.cargo == 'Candidato';
            });
        } else if (!this.props.is_candidato) {
            politicos = this.props.data.politicosPorEstado.filter(politico => {
                return politico.cargo == 'Funcionario';
            });
        }
        return (
            <Container style={{backgroundColor: 'white'}}>
                <Content>
                    {(politicos.length != 0) ?(
                        <List style={{margin: 0, padding: 0}} dataArray={politicos}
                            renderRow={(politico) => {
                                var {nombre}=politico.partido
                                return (
                                    <TouchableOpacity 
                                        key={politico.id} 
                                        onPress={() => { Actions.detail_politicos_root({ id_politico: politico.id }) }} 
                                        style={{padding: 0, margin: 0}}>
                                    <View style={styles.listCard}>
                                        <View style={{marginBottom: 0, paddingBottom: 2}}>
                                            <Text style ={{fontWeight: 'bold'}}>{politico.nombre}</Text>
                                        </View>
                                        <View style={{marginTop: 0, paddingTop: 2}}>
                                            <Badge style={{
                                                backgroundColor: `rgb(${politico.partido.color})`,
                                            }}>
                                                <Text style={{color: 'white'}}>{
                                                    nombre
                                                }</Text>
                                            </Badge>
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                );
                            }
                            }>
                        </List>
                        ) : (
                        <View>
                            <Text>No hay resultados para mostrar</Text>
                        </View>
                    )}


                </Content>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    listCard: {
        padding: 8,
        marginHorizontal: 8,
        marginVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        width: Dimensions.get('window').width,
    },
    listCardText: {
        fontSize: 11
    }
})

export default graphql(fetch_politicos, {
    options: (props) => { return { variables: { id: props.id_estado } } }
})(PoliticosRegion);