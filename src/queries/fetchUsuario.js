import gql from 'graphql-tag';

export default gql`
{
    usuario{
        id,
        nombre,
        email,
        localidad{
            id,
            nombre
        },
        puntos,
        fecha_registro,
        password,
        avatar,
        tipo_usuario{
            tipo
        }
    } 
}
`;