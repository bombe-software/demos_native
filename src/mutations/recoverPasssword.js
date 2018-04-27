import gql from 'graphql-tag';

export default gql`
mutation recoverPassword($email: String){
    recoverPassword(email: $email)
    }
`;