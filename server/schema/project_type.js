const graphql = require('graphql');
const mongoose = require('mongoose');
const EmployeeType = require('./employee_type');
const TechnologyType = require('./technology_type');

const ProjectModel = mongoose.model('project');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    required: {
      type: new GraphQLList(TechnologyType),
      resolve({ _id }) {
        return ProjectModel.findRequirements(_id);
      },
    },
    inthere: {
      type: new GraphQLList(EmployeeType),
      resolve({ _id }) {
        return ProjectModel.findEmployees(_id);
      },
    },
    coverage: {
      type: GraphQLInt,
      resolve(project) {
        return project.coverage();
      },
    },
  }),
});

module.exports = ProjectType;
