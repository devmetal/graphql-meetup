import gql from 'graphql-tag';

export default gql`
{
  projects {
    id,
    name,
    coverage,
    required {
      id,
      name,
      logo
    },
    inthere {
      id,
      name
    }
  },
  employees {
    id,
    name
  },
  technologies {
    id,
    name,
    logo
  }
}
`;
