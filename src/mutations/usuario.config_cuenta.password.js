import gql from 'graphql-tag';

export default gql`
mutation update_usuario($password: String){
    update_usuario(password: $password){
        id
    }
}
`;