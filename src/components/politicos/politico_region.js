import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner } from 'native-base';
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
                                    <ListItem key={politico.id} onPress={() => { Actions.detail_politicos_root({ id_politico: politico.id }) }}  >
                                        <Text>{politico.nombre}</Text>
                                    </ ListItem>
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