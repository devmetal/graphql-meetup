import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import TechnologyList from './components/TechnologyList';

class Technologies extends Component {
  render() {
    const { technologies } = this.props;

    return (
      <div>
        <Typography type="headline">
          Technologies
        </Typography>
        <TechnologyList
          technologies={technologies}
          removable={false}
          assignable
        />
      </div>
    );
  }
}

Technologies.propTypes = {
  technologies: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Technologies;
