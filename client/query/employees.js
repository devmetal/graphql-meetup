import gql from 'graphql-tag';

export default gql`
{
  employees {
    id,
    name
  }
}
`;
