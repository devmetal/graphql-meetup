import gql from 'graphql-tag';

export default gql`
query Employee($id: ID!) {
  employee(id: $id) {
    id,
    name,
    stack {
      id,
      name,
      logo
    }
  }
}
`;
