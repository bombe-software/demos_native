import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Footer, FooterTab, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';

class LandingPage extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Title>
                        Bienvenido a Demos
                    </Title>
                    <Text>
                        Conoce a tus candidatos y vota informadamente
                    </Text>
                </Content>

                <Footer style={{ backgroundColor: 'transparent' }}>
                    <FooterTab style={{ backgroundColor: 'transparent' }}>
                        <Button transparent success full onPress={() => Actions.login_before()}>
                            <Text>Iniciar sesion </Text>
                        </Button>
                        <Button transparent dark full onPress={() => Actions.signup_before()}>
                            <Text>Registarse</Text>
                        </Button>
                    </ FooterTab>
                </Footer>
                <Button transparent info full onPress={() => Actions.root()}>
                    <Text>Continuar sin una cuenta</Text>
                </Button>
            </Container>
        );
    }
}
export default LandingPage;