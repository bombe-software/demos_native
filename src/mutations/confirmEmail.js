import gql from 'graphql-tag';

export default gql`
mutation ConfirmEmail($email: String, $firma: String){
	confirm_email(email: $email, firma: $firma){
    id
  }
}
`;