import gql from 'graphql-tag';

export default gql`
mutation ConfirmEmail($email: String, $firma: String){
	confirmEmail(email: $email, firma: $firma){
    id
  }
}
`;