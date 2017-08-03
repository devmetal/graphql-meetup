const graphql = require('graphql');
const mongoose = require('mongoose');
const _ = require('lodash');
const co = require('co');
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
      resolve({ _id }) {
        return co(function* coverage() {
          const requirements = yield ProjectModel.findRequirements(_id);
          const requirementIds = _.map(requirements, '_id');

          const employees = yield ProjectModel.findEmployees(_id);
          const stackIds = _.chain(employees)
            .map('stack')
            .flatten()
            .uniq()
            .value();

          const matched = _.intersectionWith(
            stackIds,
            requirementIds,
            _.isEqual
          );

          return Math.floor((matched.length / requirementIds.length) * 100.0);
        });
      },
    },
  }),
});

module.exports = ProjectType;
