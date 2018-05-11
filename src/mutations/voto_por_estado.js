import gql from 'graphql-tag';

export default gql`
mutation Voto_estado($id_usuario: ID, $id_preferencia:ID, $id_votacion: ID, $id_estado: ID){
  voto_estado(
    id_usuario: $id_usuario,
    id_preferencia: $id_preferencia,
    id_votacion: $id_votacion,
    id_estado: $id_estado
  ){
    id
    estado {
      id
    }
    preferencias{
      id
      politico {
        id
      }
      usuarios{
        id
      }
    }
  } 
}
`;