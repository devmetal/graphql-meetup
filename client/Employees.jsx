import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Employee from './components/Employee';
import EmployeeList from './components/EmployeeList';
import addMutation from './mutation/addTechToEmployee';
import removeMutation from './mutation/removeTechFromEmployee';
import query from './query/dashboard';

class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAssignTechnology = this.handleAssignTechnology.bind(this);
    this.handleUnassignTechnology = this.handleUnassignTechnology.bind(this);
  }

  handleSelect(employeeId) {
    this.setState({ selectedId: employeeId });
  }

  handleClose() {
    this.setState({ selectedId: null });
  }

  handleAssignTechnology(techId, empId) {
    this.props.assign({
      variables: {
        tId: techId,
        eId: empId,
      },
      refetchQueries: [{ query }],
    });
  }

  handleUnassignTechnology(techId, empId) {
    this.props.unassign({
      variables: {
        tId: techId,
        eId: empId,
      },
      refetchQueries: [{ query }],
    });
  }

  render() {
    const { employees } = this.props;
    const { selectedId } = this.state;

    return (
      <div>
        {!selectedId && <EmployeeList
          employees={employees}
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
  employees: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default compose(
  graphql(addMutation, { name: 'assign' }),
  graphql(removeMutation, { name: 'unassign' })
)(Employees);
