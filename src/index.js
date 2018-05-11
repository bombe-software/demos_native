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
    uri: 'https://demos-gql.herokuapp.com/graphql',
    credentials: 'include'
});

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    dataIdFromObject: o => o.id
});

//Importar componentes

//Componentes sencillos
import LandingPage from './components/landing_page';
import SignUp from './components/signup';
import Login from './components/login';

//Politicos
import Politicos from './components/politicos/politicos';
import PoliticosRegion from './components/politicos/politico_region';
import PoliticoDetail from "./components/politicos/politico_detail/politico_detail";
import EventoDetail from "./components/politicos/politico_detail/evento_detail";
import PropuestaDetail from "./components/politicos/politico_detail/propuesta_detail";


//Elecciones
import Elecciones from './components/elecciones/elecciones';
import EleccionesGrafica from './components/elecciones/elecciones_grafica';

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
                        <Scene key="landing" title="landing" hideNavBar>
                                <Scene key="landing_before" component={LandingPage} />
                            </Scene>
                            <Scene key="signup" title="Signup" hideNavBar>
                                <Scene key="signup_before" component={SignUp} />
                            </Scene>
                            <Scene key="login" title="Login" hideNavBar>
                                <Scene key="login_before" component={Login} />
                            </Scene>
                        </Scene>

                        <Scene
                            key="root"
                            tabs={true}
                            tabBarPosition={'bottom'}
                            tabBarStyle={{ backgroundColor: '#FFFFFF' }} >
                            <Scene key="inicio_root" title="Inicio" iconName="home" icon={this.renderTabIcon}>
                                <Scene key="index_inicio_root" component={() => { return (<Text>Inicio</Text>) }} />
                            </Scene>
                            <Scene key="politicos_root" title="Politicos" iconName="save" icon={this.renderTabIcon}>
                                <Scene key="index_politicos_root" component={Politicos} />
                                <Scene key="region_politicos_root" component={PoliticosRegion} />
                                <Scene key="detail_politicos_root" component={PoliticoDetail} />
                                <Scene key="eventoDetail_politicos_root" component={EventoDetail} />
                                <Scene key="propuestaDetail_politicos_root" component={PropuestaDetail} />
                            </Scene>
                            <Scene key="elecciones_root" title="Elecciones" iconName="sort" icon={this.renderTabIcon}>
                                <Scene key="index_elecciones_root" component={Elecciones} />
                                <Scene key="grafica_elecciones_root" component={EleccionesGrafica} />
                            </Scene>
                            <Scene key="mas_root" title="Mas" iconName="plus-square-o" icon={this.renderTabIcon}>
                                <Scene key="index_mas_root" component={() => { return (<Text>Mas</Text>) }} />
                            </Scene>
                        </Scene>
                    </Stack>
                </Router>
            </ApolloProvider >
        )
    }

}

export default Demos;
