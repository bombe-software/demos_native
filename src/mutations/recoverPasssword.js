import gql from 'graphql-tag';

export default gql`
mutation recoverPassword($email: String){
    recover_password(email: $email)
     }
`;