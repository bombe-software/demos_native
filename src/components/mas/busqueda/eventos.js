import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import { Container, Content, Card, CardItem, Text, Icon, Right, Spinner } from 'native-base';
import eventos from './../../../queries/eventos';
import { validadoAcentos } from './buscar';

class Eventos extends Component {

    renderList() {
        var re = new RegExp(this.props.text.toUpperCase());
        let list = _.filter(this.props.data.eventos, (o) =>{
            return re.test(validadoAcentos(o.titulo.toLowerCase()));
        });
        if(list.length===0){
            return(<Text>Sin resultados</Text>);
        }

        return list.map(o => {
            return (
                <TouchableOpacity key={o.id} onPress={() => { Actions.eventoDetail_politicos_root({ id_evento: o.id }) }}>
                    <CardItem >
                        <Icon active name="time" />
                        <Text>{o.titulo.substr(0, 35)}</Text>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </CardItem>
                </TouchableOpacity>
            );
        });
    }

    render() {
        if (this.props.data.loading) return <Container><Spinner /></Container>;
        return (
            <ScrollView>
                <Content>
                    <Card>
                        {this.renderList()}
                    </Card>
                </Content>
            </ScrollView>
        );
    }
}
export default graphql(eventos)(Eventos);