import gql from 'graphql-tag';

export default gql`
query fetchPoliticoDetail($id: ID!) {
  politico(id: $id ){
    id,
    nombre,
    cargo,
    partido{
      id,
      nombre,
      color
    },
    estado {
      nombre,
      id
    }
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
