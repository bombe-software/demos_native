import React, { Component } from 'react';
import { View, StyleSheet, ScrollView,Dimensions, BackHandler, Image } from 'react-native';
import { Container, Content, List, ListItem, Text, Segment, Button, Spinner, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { graphql } from 'react-apollo';
import fetchDenuncias from './../../queries/fetchDenuncias';
import {primario} from '../../../assets/styles'

const white = 'white';
class DenunciaFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipo_vista: true
        };
    }
    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>
        this.props.data.refetch();
        const denuncia = this.props.data.denuncias;
        return (
            <Container>
                <ScrollView>
                    <Content>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <List dataArray={denuncia}
                                renderRow={(denuncia) =>
                                    <View style={{backgroundColor: 'white', padding: 20}}>
                                    <View style={{paddingBottom: 0, paddingTop: 0}}>
                                        <Text>Nombre de usuario: {denuncia.usuario.nombre}</Text>
                                    </View>
                                    <View style={{paddingBottom: 0, paddingTop: 0}}>
                                    </View>
                                    <View style={{paddingBottom: 0, paddingTop: 0}}>
                                        <Text>Titulo: {denuncia.titulo}</Text>
                                    </View>
                                    <View style={{paddingBottom: 0, paddingTop: 0}}>
                                        <Text>Descripcion: {denuncia.descripcion} </Text>
                                    </View>
                                </View>
                                }>
                            </List>

                            <Button onPress={() => Actions.denuncia_form_root()}>
                                <Text> + </Text>
                                </Button>
                        </View>
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
    },
    avatarImage: {
        width: (Dimensions.get('window').width / 4) - 20,
        height: (Dimensions.get('window').width / 4) - 20,
        padding: 24,
    }
});

export default graphql(fetchDenuncias)(DenunciaFeed);