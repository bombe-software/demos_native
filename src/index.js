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

//Constantes
import {demos_gql_http} from './../deploy'

//Configuracion del cliente de apollo 
const link = createHttpLink({
    uri: `${demos_gql_http}/graphql`,
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
import RecoverPassword from './components/recover_password';

//Politicos
import Politicos from './components/politicos/politicos';
import PoliticosRegion from './components/politicos/politico_region';
import PoliticoDetail from "./components/politicos/politico_detail/politico_detail";
import EventoDetail from "./components/politicos/politico_detail/evento_detail";
import PropuestaDetail from "./components/politicos/politico_detail/propuesta_detail";

//Mas
import DenunciaFeed from "./components/denuncia/denunciaFeed";

//Importar modulos de mas
import Mas from "./components/mas/mas";
import PerfilUsuario from "./components/mas/usuario/perfilUsuario";
import Busqueda from './components/mas/busqueda/busqueda';

import { secundario, primario, peligro, neutro } from './../assets/styles.js';
//Elecciones
import Elecciones from './components/elecciones/elecciones';
import EleccionesGrafica from './components/elecciones/elecciones_grafica';
import ConfirmEmail from "./components/confirm_email";

//Configuracion del router
class Demos extends Component {


    renderTabIcon({ selected, title, iconName }) {
        var color = selected ? primario : neutro;

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
                            <Scene key="recover_pass" title="Recuperar Contraseña" hideNavBar>
                                <Scene key="recover_pass_before" component={RecoverPassword} />
                            </Scene>
                            <Scene key="confirm_email" title="Verificar Correo" hideNavBar>
                                <Scene key="confirm_email_before" component={ConfirmEmail} />
                            </Scene>
                        </Scene>


                        <Scene
                            key="root"
                            tabs={true}
                            tabBarPosition={'bottom'}
                            tabBarStyle={{ backgroundColor: '#FFFFFF', borderColor: '#ffffff' }} >
                            <Scene key="politicos_root" title="Politicos" iconName="user" icon={this.renderTabIcon}>
                                <Scene key="index_politicos_root" component={Politicos} />
                                <Scene key="region_politicos_root" component={PoliticosRegion} />
                                <Scene key="detail_politicos_root" component={PoliticoDetail} />
                                <Scene key="eventoDetail_politicos_root" component={EventoDetail} />
                                <Scene key="propuestaDetail_politicos_root" component={PropuestaDetail} />
                            </Scene>
                            <Scene key="elecciones_root" title="Elecciones" iconName="pie-chart" icon={this.renderTabIcon}>
                                <Scene key="index_elecciones_root" component={Elecciones} />
                                <Scene key="grafica_elecciones_root" component={EleccionesGrafica} />
                            </Scene>
                            <Scene key="denuncia_root" title="Denuncias" iconName="bullhorn" icon={this.renderTabIcon}>
                                <Scene key="denuncia_feed_root" component={DenunciaFeed} />
                            </Scene>
                            <Scene key="mas_root" title="Más Opciones" iconName="bars" icon={this.renderTabIcon}>
                                <Scene key="index_mas_root" title="Más Opciones" component={Mas} />
                                <Scene key="perfil_mas_root" title="Perfil de usuario" component={PerfilUsuario} />
                                <Scene key="busqueda_mas_root" title="Búsqueda" component={Busqueda} />
                            </Scene>
                        </Scene>
                    </Stack>
                </Router>
            </ApolloProvider >
        )
    }

}

export default Demos;
