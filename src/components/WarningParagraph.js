import React from 'react';
import PropTypes from 'prop-types';

const WarningParagraph = React.memo(function Field(props) {
  return (
    <p>{props.message}</p>
  );
});

WarningParagraph.propTypes = {
  message: PropTypes.string
};

export default WarningParagraph;