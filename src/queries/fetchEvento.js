import gql from 'graphql-tag';

export default gql`
query fetchEvento($id: ID!){
    evento(id: $id){
      id
      titulo
      descripcion
      referencia
      politico {
        id
      }
      fecha
      usuario {
        id
        nombre
      }
    }
  }
`;