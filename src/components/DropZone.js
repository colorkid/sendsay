import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

class DropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooMuchSizeFile: false
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(file) {
    const MAX_SIZE_FILE = 5242880;
    if (file[0].size > MAX_SIZE_FILE) {
      this.setState({tooMuchSizeFile: true});
      return;
    };
    this.setState({tooMuchSizeFile: false});
    this.props.onDrop(file);
  }

	render() {
    const acceptFilesMessage = <div>
      <h1>Бросайте сюда файлы, я ловлю</h1>
      <p>Мы принимаем файлы</p>
    </div>;
    const tooMuchSizeMessage = <p>Слишком большой размер файла. Размер файл не должен превышать 5 Mb.</p>;
	  return (
	  	<Dropzone onDrop={this.onDrop} noClick noKeyboard>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            {this.state.tooMuchSizeFile ? tooMuchSizeMessage : acceptFilesMessage}
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