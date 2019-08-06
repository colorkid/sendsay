import React, { Component } from "react";
import PropTypes from 'prop-types';

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.props.handleInputChange(event.target.name, event.target.value);
  }

  render() {
    return (
      <textarea
        name={this.props.name}
        className='textarea'
        value={this.props.value}
        onChange={this.handleInputChange}
      />
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleInputChange: PropTypes.func
}

export default TextArea;