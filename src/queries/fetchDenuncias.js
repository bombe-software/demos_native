import gql from 'graphql-tag';

export default gql`
{
    denuncias{
      id
      titulo,
      descripcion,
      usuario{
        id
        nombre,
        avatar
      }
      ubicacion
    }
  }
`;