import React from 'react';
import PropTypes from 'prop-types';

const WarningParagraph = (props) => {
  return (
    <p>{props.message}</p>
  );
};

WarningParagraph.propTypes = {
  message: PropTypes.string
};

export default WarningParagraph;