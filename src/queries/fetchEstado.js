import gql from 'graphql-tag';

export default gql`
query Estado($id:ID){
    estado(id: $id){
      id
      nombre
    }
}
`;