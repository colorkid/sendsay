import React, { Component } from "react";
import PropTypes from 'prop-types';

class TextArea extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <textarea
        name={this.props.name}
        className='textarea'
        value={this.props.value}
        onChange={this.props.handleInputChange}
      />
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleInputChange: PropTypes.func
};

export default TextArea;