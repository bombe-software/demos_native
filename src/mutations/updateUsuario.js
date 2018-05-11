import gql from 'graphql-tag';

export default gql`
mutation updateUsuario($id:ID!, $nombre:String,$password:String, $avatar:String){
    updateUsuario(id: $id, nombre: $nombre, password: $password, avatar: $avatar){
        id,
        nombre,
        password,
        avatar
    }
}
`;