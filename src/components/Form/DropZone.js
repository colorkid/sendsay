import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

class DropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tooMuchSizeFile: false};
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(file) {
    const MAX_SIZE_FILE = 5242880;
    if (file[0].size > MAX_SIZE_FILE) {
      this.setState({tooMuchSizeFile: true});
      return;
    }
    this.setState({tooMuchSizeFile: false});
    this.props.onDrop(file);
  }

	render() {
    const acceptFilesMessage = <div className='dropzone__message'>
      <h2 className='dropzone__title'>Бросайте сюда файлы, я ловлю</h2>
      <p className='dropzone__paragraph'>Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы. Размеры файла до 5 МБ</p>
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
};

export default DropZone;