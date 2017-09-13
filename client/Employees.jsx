import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Employee from './Employee';
import EmployeeList from './components/EmployeeList';
import LoadingBar from './components/LoadingBar';
import addMutation from './mutation/addTechToEmployee';
import removeMutation from './mutation/removeTechFromEmployee';
import query from './query/employees';
import projectsQuery from './query/projects';

class Employees extends Component {

  state = { selectedId: null };

  handleSelect = selectedId =>
    this.setState({ selectedId });

  handleClose = () =>
    this.setState({ selectedId: null });

  handleAssignTechnology = (techId, empId) => {
    this.props.assign({
      variables: {
        tId: techId,
        eId: empId,
      },
      refetchQueries: [{ query: projectsQuery }],
    });
  }

  handleUnassignTechnology = (techId, empId) => {
    this.props.unassign({
      variables: {
        tId: techId,
        eId: empId,
      },
      refetchQueries: [{ query: projectsQuery }],
    });
  }

  render() {
    const { data } = this.props;
    const { selectedId } = this.state;

    if (data.loading) {
      return <LoadingBar show />;
    }

    return (
      <div>
        {!selectedId && <EmployeeList
          employees={data.employees}
          onSelectEmployee={this.handleSelect}
          selectable
        />}
        {selectedId && <Employee
          id={selectedId}
          onClose={this.handleClose}
          onAssignTechnology={this.handleAssignTechnology}
          onUnassignTechnology={this.handleUnassignTechnology}
        />}
      </div>
    );
  }
}

Employees.propTypes = {
  assign: PropTypes.func.isRequired,
  unassign: PropTypes.func.isRequired,
  data: PropTypes.shape({
    employees: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default compose(
  graphql(query, { name: 'data' }),
  graphql(addMutation, { name: 'assign' }),
  graphql(removeMutation, { name: 'unassign' })
)(Employees);
