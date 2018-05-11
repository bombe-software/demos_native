import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Tab, Tabs, Item, Input, Icon } from 'native-base';

import Eventos from './eventos';
import Propuestas from './propuestas';
import Politicos from './politicos';

import { primario, neutro } from '../../../../assets/styles'


class Busqueda extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        }
    }

    render() {
        console.log()
        return (
            <Container>
                <Item>
                    <Input placeholder='Realiza una busqueda' onChangeText={(text) => this.setState({text})}   value={this.state.text} />
                    <Icon active name='search' />
                </Item>
                <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: primario }} >
                    <Tab heading="Politicos" textStyle={{ color: primario }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'white' }} activeTabStyle={{ backgroundColor: primario }}>
                        <Politicos text={this.state.text} />
                    </Tab>
                    <Tab heading="Eventos" textStyle={{ color: primario }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'white' }} activeTabStyle={{ backgroundColor: primario }}>
                        <Eventos text={this.state.text} />
                    </Tab>
                    <Tab heading="Propuestas" textStyle={{ color: primario }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'white' }} activeTabStyle={{ backgroundColor: primario }}>
                        <Propuestas text={this.state.text} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default Busqueda;