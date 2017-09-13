import gql from 'graphql-tag';

export default gql`
{
  projects {
    id,
    name,
    inthere {
      id,
      name
    },
    required {
      id,
      name,
      logo
    },
    coverage
  }
}
`;
