import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Typography from 'material-ui/Typography';
import ProjectList from './components/ProjectList';
import LoadingBar from './components/LoadingBar';
import query from './query/projects';

class Projects extends Component {
  render() {
    const { data } = this.props;

    if (data.loading) {
      return <LoadingBar show />;
    }

    return (
      <div>
        <Typography type="headline" gutterBottom>
          Projects
        </Typography>
        <ProjectList
          projects={data.projects}
          onSelectProject={this.handleSelect}
        />
      </div>
    );
  }
}

Projects.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default graphql(query)(Projects);
