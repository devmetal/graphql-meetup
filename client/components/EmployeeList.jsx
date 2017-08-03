import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

const EmployeeList = ({
  employees = [],
  onSelectEmployee,
  selectable,
}) => (
  <div>
    <Typography type="headline" gutterBottom>
      Employees
    </Typography>
    <List>
      {employees.map(employee => (
        <ListItem
          key={employee.id}
          onClick={selectable && (() => onSelectEmployee(employee.id))}
          button={selectable}
        >
          <ListItemText primary={employee.name} />
        </ListItem>
      ))}
    </List>
  </div>
);

EmployeeList.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelectEmployee: PropTypes.func,
  selectable: PropTypes.bool,
};

EmployeeList.defaultProps = {
  onSelectEmployee: () => {},
  selectable: false,
};

export default EmployeeList;
