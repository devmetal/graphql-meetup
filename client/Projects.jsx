import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import ProjectList from './components/ProjectList';

class Projects extends Component {
  render() {
    const { projects } = this.props;

    return (
      <div>
        <Typography type="headline" gutterBottom>
          Projects
        </Typography>
        <ProjectList
          projects={projects}
          onSelectProject={this.handleSelect}
        />
      </div>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Projects;
