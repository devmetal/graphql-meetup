import React from 'react';
import PropTypes from 'prop-types';
import IconButtton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Clear';

const CloseButton = ({ show, onClick }) => {
  if (!show) return null;

  return (
    <IconButtton
      aria-label="Close"
      style={{ float: 'right', marginTop: '-8px' }}
      onClick={onClick}
    >
      <CloseIcon />
    </IconButtton>
  );
};

CloseButton.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CloseButton.defaultProps = {
  show: false,
};

export default CloseButton;
