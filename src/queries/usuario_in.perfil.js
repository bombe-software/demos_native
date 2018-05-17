import gql from 'graphql-tag';

export default gql`
{
  usuario_in {
    id,
    nombre,
    email,
    localidad {
      id,
      nombre
    }
    puntos,
    fecha_registro,
    avatar,
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