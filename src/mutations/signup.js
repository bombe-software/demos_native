import gql from 'graphql-tag';

export default gql`
mutation SignUp(
    $nombre: String!,
    $email: String!,
    $password: String!,
    $avatar: String!,
    $localidad: String!
) {
    signup(
        nombre: $nombre,
        email: $email,
        password: $password,
        avatar: $avatar,
        localidad: $localidad,
    ) {
        email
    }
}
`;