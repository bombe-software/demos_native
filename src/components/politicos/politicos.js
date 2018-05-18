import React, { Component } from 'react';
import { Alert, View, StyleSheet, FlatList, Dimensions, TouchableOpacity, BackHandler} from 'react-native';
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
        return (
            <Container>
                <Content>
                    <View style={styles.twoColumnContainer}>
                        <Button 
                            active={this.state.is_candidato} 
                            style={this.state.is_candidato
                                ?
                                    styles.activeButton
                                :
                                    styles.inactiveButton
                            }
                            onPress={() => this.setState({ is_candidato: true })}>
                            <Text
                                style={this.state.is_candidato
                                    ?
                                        styles.activeText
                                    :
                                        styles.inactiveText
                                }
                            >Candidato</Text>
                        </Button>
                        <Button 
                            active={!this.state.is_candidato} 
                            style={!this.state.is_candidato
                                ?
                                    styles.activeButton
                                :
                                    styles.inactiveButton
                            }
                            onPress={() => this.setState({ is_candidato: false })}>
                            <Text
                                style={!this.state.is_candidato
                                    ?
                                        styles.activeText
                                    :
                                        styles.inactiveText
                                }
                            >Funcionario</Text>
                        </Button>
                    </View>
                    <List dataArray={this.props.data.estados}
                        renderRow={(estado) =>
                            <TouchableOpacity key={estado.id}  onPress={()=>{Actions.region_politicos_root({id_estado: estado.id, is_candidato: this.state.is_candidato})}}  >
                                <View style={styles.listCard}>
                                    <Text>{estado.nombre}</Text>
                                </View>
                            </ TouchableOpacity>
                        }>
                    </List>
                </Content>
            </Container>
        );
    }
}

let styles = StyleSheet.create({
    segmentButton: {
        backgroundColor: '#4E4E4E'
    },
    backgroundColor: {
        backgroundColor: '#F9F9F9',
    },
    twoColumnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    activeButton: {
        backgroundColor: primario,
        width: Dimensions.get('window').width/2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        borderColor: primario,
    },
    inactiveButton: {
        backgroundColor: white,
        width: Dimensions.get('window').width/2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        borderColor: primario,
    },
    inactiveText: {
        color: primario,
        textAlign: 'center'
    },
    activeText: {
        color: white,
        textAlign: 'center'
    },
    listCard: {
        backgroundColor: white,
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 8,
        marginVertical: 4,
        width: Dimensions.get('window').width-12,
    },
    listCardText: {
        fontSize: 11
    }
});

export default graphql(fetch_estados)(Politicos);