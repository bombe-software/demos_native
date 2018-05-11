import gql from 'graphql-tag';

export default gql`
{
    propuestas {
      id
      titulo
      fecha
    }
  }
  
`;