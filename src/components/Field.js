import React from "react";
import PropTypes from 'prop-types';

const Field = React.memo(function Field(props) {
  return (
    <input
      name={props.name}
      className='input'
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
  handleInputChange: PropTypes.func
};

export default Field;