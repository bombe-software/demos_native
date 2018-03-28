import gql from 'graphql-tag';

export default gql`
query PoliticosPorEstado($id: ID!){
    politicosPorEstado(id: $id){
        id,
        nombre,
        cargo,
        partido {
            nombre
        }
  }
}
`;