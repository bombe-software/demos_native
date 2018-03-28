import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { graphql, compose } from 'react-apollo';
import fetch_estados from './../../queries/fetchEstados';

class Politicos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_candidato: true
        };
    }

    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>
        return (
            <Container>
                <Content>
                    <Segment>
                        <Button first active={this.state.is_candidato} onPress={() => this.setState({ is_candidato: true })}><Text>Candidato</Text></Button>
                        <Button last active={!this.state.is_candidato} onPress={() => this.setState({ is_candidato: false })}><Text>Funcionario</Text></Button>
                    </Segment>
                    <List dataArray={this.props.data.estados}
                        renderRow={(estado) =>
                            <ListItem key={estado.id}  onPress={()=>{Actions.region_politicos_root({id_estado: estado.id, is_candidato: this.state.is_candidato})}}  >
                                <Text>{estado.nombre}</Text>
                            </ ListItem>
                        }>
                    </List>
                </Content>
            </Container>
        );
    }
}



export default graphql(fetch_estados)(Politicos);