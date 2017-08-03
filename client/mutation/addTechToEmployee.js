import gql from 'graphql-tag';

export default gql`
mutation AssignTechnology($eId: ID!, $tId: ID!) {
  assignTechnology(employeeId: $eId, technologyId: $tId) {
    id,
    stack {
      id,
      logo,
      name
    }
  }
}
`;
