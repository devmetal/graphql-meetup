import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Typography from 'material-ui/Typography';
import TechnologyList from './TechnologyList';
import CloseButton from './CloseButton';
import query from '../query/employee';

class Employee extends Component {
  constructor(props) {
    super(props);

    this.handleDropTechnology = this.handleDropTechnology.bind(this);
    this.handleRemoveTechnology = this.handleRemoveTechnology.bind(this);
  }

  handleDropTechnology(event) {
    const { data: { employee } } = this.props;
    const dataTransfer = event.dataTransfer.getData('application/json');
    const { techId } = JSON.parse(dataTransfer);
    this.props.onAssignTechnology(techId, employee.id);
  }

  handleRemoveTechnology(techId) {
    const { data: { employee } } = this.props;
    this.props.onUnassignTechnology(techId, employee.id);
  }

  render() {
    const {
      data,
      onClose,
    } = this.props;

    if (data.loading) {
      return null;
    }

    return (
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={this.handleDropTechnology}
      >
        <CloseButton show onClick={onClose} />
        <Typography type="headline" gutterBottom>
          {data.employee.name}
        </Typography>
        <TechnologyList
          onRemoveTechnology={this.handleRemoveTechnology}
          technologies={data.employee.stack}
          assignable={false}
          removable
        />
      </div>
    );
  }
}

Employee.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onAssignTechnology: PropTypes.func.isRequired,
  onUnassignTechnology: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default graphql(query, {
  options: ({ id }) => ({ variables: { id } }),
})(Employee);
