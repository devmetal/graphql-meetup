import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const style = {
  root: {
    width: '100%',
    position: 'fixed',
    zIndex: 2,
    left: 0,
    top: 0,
  },
  prg: {
    backgroundColor: '#90CAF9',
  },
};

const styleSheet = createStyleSheet('progress', style);

const LoadingBar = ({ show, classes }) => {
  if (!show) return null;
  return (
    <div className={classes.root}>
      <LinearProgress className={classes.prg} />
    </div>
  );
};

LoadingBar.propTypes = {
  show: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

LoadingBar.defaultProps = {
  show: false,
};

export default withStyles(styleSheet)(LoadingBar);
