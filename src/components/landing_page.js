import React, { Component } from 'react';
import {
    AppRegistry,
    ImageBackground,
  } from 'react-native';
import { Container, Header, Content, Button, Text, Footer, FooterTab, Title, H1 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { title_light, subtitle_light, image_background, primario } from '../../assets/styles.js';

const background_image_url = "https://raw.githubusercontent.com/bombe-software/stock-images/master/demos_native_background_02.jpg";
class LandingPage extends Component {

    render() {
        return (
            <Container>
                <ImageBackground
                    style={image_background}
                    source={{ uri: background_image_url }}
                >
                <Content style={{height: 32}}></Content>
                <Content>
                    <Text style={title_light}>
                        Bienvenido a Demos
                    </Text>
                    <Text style={subtitle_light}>
                        Conoce a tus candidatos y vota informadamente
                    </Text>
                </Content>

                <Footer style={{ backgroundColor: 'transparent' }}>
                    <FooterTab style={{ backgroundColor: 'transparent' }}>
                        <Button transparent light large full onPress={() => Actions.login_before()}>
                            <Text style={{color: primario, fontSize: 16}}>Iniciar sesión </Text>
                        </Button>
                        <Button transparent light large full onPress={() => Actions.signup_before()}>
                            <Text style={{fontSize: 16}}>Registarse</Text>
                        </Button>
                    </ FooterTab>
                </Footer>
                
                <Button transparent light full onPress={() => Actions.root()}>
                    <Text style={{fontSize: 14}}>Continuar sin una cuenta</Text>
                </Button>
                
                </ImageBackground>
            </Container>
        );
    }
}
export default LandingPage;