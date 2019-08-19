import React, { Component } from "react";
import PropTypes from 'prop-types';

class Field extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        name={this.props.name}
        className='input'
        type={this.props.type}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.handleInputChange}
      />
    );
  }
}

Field.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  handleInputChange: PropTypes.func
};


export default Field;