import gql from 'graphql-tag';

export default gql`
mutation SignUp(
    $nombre: String!,
    $email: String!,
    $password: String!,
    $curp: String!,
    $avatar: String!,
    $localidad: String!
) {
    signup(
        nombre: $nombre,
        email: $email,
        password: $password,
        curp: $curp,
        avatar: $avatar,
        localidad: $localidad,
    ) {
        email
    }
}
`;