import gql from 'graphql-tag';

export default gql`
{
    usuario_in{
        id,
        nombre,
        email
        puntos,
        fecha_registro,
        password,
        avatar,
        localidad {
            id
            nombre
        }
        tipo_usuario{
            tipo
        }
    } 
}
`;