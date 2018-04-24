import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner, CardItem, Card, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';

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
            <Container>
                <Content>
                    {(politicos.length != 0) ?(
                        <List dataArray={politicos}
                            renderRow={(politico) => {
                                return (
                                    <ListItem 
                                        key={politico.id} 
                                        onPress={() => { Actions.detail_politicos_root({ id_politico: politico.id }) }} 
                                        style={{padding: 0, margin: 0}}>
                                    <Card style={{ margin: 0}}>
                                        <CardItem style={{marginBottom: 0, paddingBottom: 2}}>
                                            <Text style ={{fontWeight: 'bold'}}>{politico.nombre}</Text>
                                        </CardItem>
                                        <CardItem style={{marginTop: 0, paddingTop: 2}}>
                                            <Badge style={{backgroundColor: `rgb(${politico.partido.color})`}}>
                                                <Text>{politico.partido.nombre}</Text>
                                            </Badge>
                                        </CardItem>
                                    </Card>
                                    </ListItem>
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



export default graphql(fetch_politicos, {
    options: (props) => { return { variables: { id: props.id_estado } } }
})(PoliticosRegion);