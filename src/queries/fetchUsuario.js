import gql from 'graphql-tag';

export default gql`
{
    usuario{
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