import gql from 'graphql-tag';

export default gql`
mutation update_usuario($avatar:String){
    update_usuario(avatar: $avatar){
        id
    }
}
`;