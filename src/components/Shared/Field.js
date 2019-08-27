import React from "react";
import PropTypes from 'prop-types';

const Field = React.memo(function Field(props) {
  const className = props.modificator ? `input input--${props.modificator}` : 'input';
  return (
    <input
      name={props.name}
      className={className}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.handleInputChange}
    />
  );
});

Field.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  modificator: PropTypes.string
};

export default Field;