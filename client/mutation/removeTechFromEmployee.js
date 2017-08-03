import gql from 'graphql-tag';

export default gql`
mutation UnassignTechnology($eId: ID!, $tId: ID!) {
  unassignTechnology(employeeId: $eId, technologyId: $tId) {
    id,
    stack {
      id,
      name,
      logo
    }
  }
}
`;
