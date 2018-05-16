import gql from 'graphql-tag';

export default gql`
query politico($id_estado: ID!){
    politicos_by_id_estado(id_estado:$id_estado){
      id
      nombre
      cargo
      partido{
          id
          nombre
          color
      }
    }
  }
`;