import React from 'react';
import PropTypes from 'prop-types';

const WarningParagraph = (props) => {
  return (
    <p>{props.subject} не может быть пустым</p>
  );
};

WarningParagraph.propTypes = {
  subject: PropTypes.string
};

export default WarningParagraph;