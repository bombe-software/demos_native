//Dependencias de react
import "core-js/es6/symbol";
import "core-js/fn/symbol/iterator";
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


//Dependencias de Apollo
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

//Configuracion del cliente de apollo 
const link = createHttpLink({
    uri: 'http://192.168.0.17:3000/graphql',
    credentials: 'include'
});

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    dataIdFromObject: o => o.id
});

//Importar componentes
import Login from './components/login';

//Configuracion del router
class Demos extends Component {


    renderTabIcon({ selected, title, iconName }) {
        var color = selected ? '#FFF' : '#000';

        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                <Icon style={{ color: color }} name={iconName || "circle"} size={18} />
                {/*<Text style={{ color: color, fontSize: 12 }}>{title}</Text>*/}
            </View>
        );
    }


    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <Stack hideNavBar>
                        <Scene key="before" hideNavBar>
                            <Scene key="inicio" title="Inicio"  hideNavBar>
                                <Scene key="inicio_1" component={Login} />
                            </Scene>
                        </Scene>

                        <Scene
                            key="root"
                            tabs={true}
                            tabBarPosition={'bottom'}
                            tabBarStyle={{ backgroundColor: '#FFFFFF' }} >
                            <Scene key="inicio" title="Inicio" iconName="home" icon={this.renderTabIcon}>
                                <Scene key="inicio_1" component={() => { return (<Text>Inicio</Text>) }} />
                            </Scene>
                            <Scene key="politicos" title="Politicos" iconName="save" icon={this.renderTabIcon}>
                                <Scene key="politicos_1" component={() => { return (<Text>Poli</Text>) }} />
                            </Scene>
                            <Scene key="elecciones" title="Elecciones" iconName="sort" icon={this.renderTabIcon}>
                                <Scene key="elecciones_1" component={() => { return (<Text>Elecciones</Text>) }} />
                            </Scene>
                            <Scene key="mas" title="Mas" iconName="plus-square-o" icon={this.renderTabIcon}>
                                <Scene key="mas_1" component={() => { return (<Text>Mas</Text>) }} />
                            </Scene>
                        </Scene>
                    </Stack>
                </Router>
            </ApolloProvider >
        )
    }

}

export default Demos;
