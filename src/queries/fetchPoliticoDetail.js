import gql from 'graphql-tag';

export default gql`
query fetchPoliticoDetail($id: ID!) {
  politicosPorId(id: $id ){
    id,
    nombre,
    cargo,
    partido{
      id,
      nombre
    },
    eventos{
      id,
      fecha,
      titulo,
      descripcion
    },
    propuestas{
      id,
      fecha,
      titulo,
      descripcion,
      tipo_propuesta{ tipo },
      likes {id}
    },
    estudios{
      id,
      titulo,
      grado_academico {
        id,
        grado
      },
      lugar_estudio {
        id,
        nombre
      }
      
    }
}
} 
`;
