import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, Platform } from 'react-native';
import { Container, Content, Button, Right, Radio, ListItem, Spinner } from 'native-base';
import _ from 'lodash';

//Queries
import usuario from './../../queries/fetchUsuario';
import eleccion from "./../../queries/fetchVotacionEstado";
import voto_por_estado from "./../../mutations/voto_por_estado";
import { Actions } from 'react-native-router-flux';
import { graphql, compose } from 'react-apollo';

import { primario } from './../../../assets/styles';

class Encuesta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_preferencia: 0,
            mensaje: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handlePolitico = this.handlePolitico.bind(this);
        this.renderListPoliticos = this.renderListPoliticos.bind(this);
    }

    /**
    * Es una forma de capturar cualquier error en la clase 
    * y que este no crashe el programa, ayuda con la depuracion
    * de errores
    * @method componentDidCatch
    * @const info Es más informacion acerca del error
    * @const error Es el titulo del error
    */
    componentDidCatch(error, info) {
        console.log("Error: " + error);
        console.log("Info: " + info);
    }

    handlePolitico(id) {
        this.setState({ id_preferencia: id });
    }
    componentWillReceiveProps(nextProps) {
        nextProps.fetchEleccion.refetch();
    }
    handleClick() {
        if (this.state.id_preferencia.length == 0) {
            this.setState({ mensaje: "Selecciona a alguien" })
        } else {
            this.props.updateVoto({
                variables: {
                    id_votacion: this.props.fetchEleccion.votacion.id,
                    id_usuario: this.props.fetchUsuario.usuario_in.id,
                    id_preferencia: this.state.id_preferencia,
                    id_estado: this.props.fetchEleccion.votacion.estado.id
                }
            }).then(() => Actions.pop({id_estado: this.props.id_estado}));
        }
    }

    renderListPoliticos() {
        const preferencias = this.props.fetchEleccion.votacion.preferencias;
        return _.map(preferencias, preferencia => {
            return (
                <ListItem key={preferencia.id} onPress={() => this.handlePolitico(preferencia.id)}>
                    <Text>{preferencia.politico.nombre}</Text>
                    <Right>
                        <Radio
                            selected={this.state.id_preferencia == preferencia.id} />
                    </Right>
                </ListItem>
            );
        })
    }

    render() {
        if (this.props.fetchEleccion.loading || this.props.fetchUsuario.loading) return <Container><Spinner /></Container>;
        return (
            <Container>
                <Content>
                    <View style={styles.card}>
                        <Text style={{ paddingTop: 10, fontWeight: 'bold',fontSize: 20, color: 'black', textAlign: "center" }}>
                            Candidatos
                            </Text>

                        {this.renderListPoliticos()}
                        <View style={{ height: 10, width: Dimensions.get('window').width }}></View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            {this.props.fetchUsuario.usuario_in ?
                                <Button style={{ backgroundColor: primario }} onPress={this.handleClick}>
                                    <Text style={{color: 'white'}}>Contestar encuesta</Text>
                                </Button>
                                : <Text />}

                        </View>
                        <View style={{ height: 10, width: Dimensions.get('window').width }}></View>
                    </View>
                </Content>
            </Container>
        );
    }
}
var styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
    }
});
export default compose(
    graphql(usuario, {
        name: 'fetchUsuario'
    }),
    graphql(eleccion, {
        name: 'fetchEleccion',
        options: ({ id_estado }) => ({ variables: { id_estado } }),
    }),
    graphql(voto_por_estado, {
        name: 'updateVoto'
    })
)(Encuesta);