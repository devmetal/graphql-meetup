const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

const TechnologyType = new GraphQLObjectType({
  name: 'Technology',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    logo: { type: GraphQLString },
    usedIn: {
      type: new GraphQLList(require('./project_type')), // eslint-disable-line global-require
      resolve(technology) {
        return technology.getProjects();
      },
    },
    usedBy: {
      type: new GraphQLList(require('./employee_type')), // eslint-disable-line global-require
      resolve(technology) {
        return technology.getUsers();
      },
    },
  }),
});

module.exports = TechnologyType;
