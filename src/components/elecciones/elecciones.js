import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { graphql, compose } from 'react-apollo';
import fetch_estados from './../../queries/fetchEstados';

class Elecciones extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>
        return (
            <Container>
                <Content>
                    <List dataArray={this.props.data.estados}
                        renderRow={(estado) =>
                            <ListItem key={estado.id}  onPress={()=>{Actions.grafica_elecciones_root({id_estado: estado.id})}}  >
                                <Text>{estado.nombre}</Text>
                            </ ListItem>
                        }>
                    </List>
                </Content>
            </Container>
        );
    }
}



export default graphql(fetch_estados)(Elecciones);