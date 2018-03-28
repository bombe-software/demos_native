import gql from 'graphql-tag';

export default gql`
query VotacionPorEstado($id_estado: ID){
  votacion(estado: $id_estado){
    id
    estado {
      id
    }
    preferencias{
      id
      politico {
        id
        nombre
      }
      usuarios{
        id
        nombre
      }
    }
  }
}
`;
/*

mutation Voto_Estado($id_usuario: ID, $id_politico: ID){
  voto_estado(
    id_usuario: $id_usuario,
    id_politico: $id_politico
  ){
    id
  }
}
*/