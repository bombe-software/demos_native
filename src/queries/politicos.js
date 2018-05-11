import gql from 'graphql-tag';

export default gql`
{
    politicos{
      id
      nombre
      partido{
        id
        nombre
      }
    }
  }
`;