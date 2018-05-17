import gql from 'graphql-tag';

export default gql`
mutation update_usuario($nombre: String){
    update_usuario(nombre: $nombre){
        id
    }
}
`;