import gql from 'graphql-tag';

export default gql`
mutation denuncia(
    $titulo: String,
    $descripcion: String,
    $usuario: ID,
    $ubicacion: String){
      denuncia(titulo: $titulo, descripcion: $descripcion,usuario: $usuario, ubicacion: $ubicacion ){
        id     
      }
    }
`;
