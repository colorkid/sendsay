import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

class DropZone extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
	  return (
	  	<Dropzone onDrop={this.props.onDrop} noClick noKeyboard>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
	  );
  }
}

DropZone.propTypes = {
  onDrop: PropTypes.func
}

export default DropZone;