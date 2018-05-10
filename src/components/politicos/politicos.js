import React, { Component } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner, Header} from 'native-base';
import { Actions } from 'react-native-router-flux';

import { graphql, compose } from 'react-apollo';
import fetch_estados from './../../queries/fetchEstados';

import {primario} from '../../../assets/styles'

const white = 'white';

class Politicos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_candidato: true
        };
    }

    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>
        console.log(this.props.data);
        return (
            <View>
            
            <Button 
                active={this.state.is_candidato} 
                style={this.state.is_candidato
                    ?
                        {backgroundColor: primario}
                    :
                        {backgroundColor: white}
                }
                onPress={() => this.setState({ is_candidato: true })}>
                <Text
                    style={!this.state.is_candidato
                        ?
                            {color: primario}
                        :
                            {color: white}
                    }
                >Candidato</Text>
            </Button>
            <Button 
                active={!this.state.is_candidato} 
                style={!this.state.is_candidato
                    ?
                        {backgroundColor: primario}
                    :
                        {backgroundColor: white}
                }
                onPress={() => this.setState({ is_candidato: false })}>
                <Text
                    style={this.state.is_candidato
                        ?
                            {color: primario}
                        :
                            {color: white}
                    }
                >Funcionario</Text>
            </Button>
            
            <Container style={{backgroundColor: 'white'}}>
                <Content>
                    <List dataArray={this.props.data.estados}
                        renderRow={(estado) =>
                            <ListItem key={estado.id}  onPress={()=>{Actions.region_politicos_root({id_estado: estado.id, is_candidato: this.state.is_candidato})}}  >
                                <Text>{estado.nombre}</Text>
                            </ ListItem>
                        }>
                    </List>
                </Content>
            </Container>
            </View>
        );
    }
}



export default graphql(fetch_estados)(Politicos);