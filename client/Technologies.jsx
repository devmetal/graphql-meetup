import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Typography from 'material-ui/Typography';
import TechnologyList from './components/TechnologyList';
import LoadingBar from './components/LoadingBar';
import query from './query/technologies';

class Technologies extends Component {
  render() {
    const { data } = this.props;

    if (data.loading) {
      return <LoadingBar show />;
    }

    return (
      <div>
        <Typography type="headline">
          Technologies
        </Typography>
        <TechnologyList
          technologies={data.technologies}
          assignable
        />
      </div>
    );
  }
}

Technologies.propTypes = {
  data: PropTypes.shape({
    technologies: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default graphql(query)(Technologies);
