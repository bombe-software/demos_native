import React, { Component } from 'react';
import { View, Alert, ImageBackground, ScrollView, StyleSheet } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, Text, Item, Label, Input, Card, CardItem } from 'native-base';


class DenunciaFeed extends Component {

    render() {
        return (
            <Container>
                <ScrollView>
                <Content>
                    
                   <Text>Denuncia Feed</Text>
                    
                </Content>
                </ScrollView>
            </Container>
        );
    }
}

export default DenunciaFeed;