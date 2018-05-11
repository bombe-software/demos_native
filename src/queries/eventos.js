import gql from 'graphql-tag';

export default gql`
{
    eventos {
      id
      titulo
      fecha
  }
} 
`;