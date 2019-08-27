import React from "react";
import PropTypes from 'prop-types';

const FieldTitle = React.memo(function FieldTitle(props) {
  return <span className={props.name}>{props.title}</span>;
});

FieldTitle.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string
};

export default FieldTitle;