import gql from 'graphql-tag';

export default gql`
{
  usuario_in {
    id,
    tipo_usuario {
      id
      tipo
    }
  }
}
`;
/**
 * RefetchQueries Component:
 * -ConfigForm
 * -Login
 */