import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showDragDropArea, hideDragDropArea } from '../redux/actions';
import DropZone from './DropZone';
import ListFiles from './ListFiles';
import FieldsList from './FieldsList';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      nameFrom: '',
      emailFrom: '',
      nameTo: '',
      emailTo: '',
      messageSubject: 'Моя тема письма',
      message: '',
      messageTooMuchSize: false
    };
    this.MAX_SIZE_FILE_STORAGE = 20971520;
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  send() {
    console.log(this.state);
  }

  converFilesToBase64(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(typeof event.target.result);
    };
    reader.readAsDataURL(file);
  }

  getSizeFilesLetter() {
    let totalSize = 0;
    this.state.files.forEach((item) => {
      totalSize = totalSize + item.size;
    });
    return totalSize;
  }

  onDrop(files) {
    const file = files[0];
    if ((this.getSizeFilesLetter() + file.size) <= this.MAX_SIZE_FILE_STORAGE) {
      this.setState(prevState => ({
        files: [...prevState.files, file]
      }));
    } else {
      this.showMessageTooMuchSize();
    }
    this.props.hideDragDropArea();
  }

  showMessageTooMuchSize() {
    this.setState({
      messageTooMuchSize: true
    });
    setTimeout(() => {
      this.hideMessageTooMuchSize();
    }, 5000)
  }

  hideMessageTooMuchSize() {
    this.setState({
      messageTooMuchSize: false
    });
  }

  removeFile(index) {
    let files = [...this.state.files];
    files.splice(index, 1)
    this.setState(prevState => ({
      files: files
    }));
  }

  handleInputChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form className='form'>
        <h1 className='form__title'>Отправлялка сообщений</h1>
        <FieldsList fieldsState={this.state} handleInputChange={this.handleInputChange} />
        <button type='button' disabled={this.state.tooManyBytesLetter} onClick={this.props.upLoadFiles} className='button-upload'>Прикрпепить файл</button>
        <ListFiles files={this.state.files} removeFile={this.removeFile}/>
        {this.state.messageTooMuchSize && 'Вы не можете прикрепить к письму файлов более чем на 20 Mb'}
        <button type='button' onClick={this.send}>Отправить</button>
        {this.props.isVisibleDragDropArea && <DropZone onDrop={this.onDrop} />}
      </form>    
    );
  }
}


Form.propTypes = {
  isVisibleDragDropArea: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    isVisibleDragDropArea: state.visibilityDragDropArea,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upLoadFiles: () => {
      dispatch(showDragDropArea());
    },
    hideDragDropArea: () => {
      dispatch(hideDragDropArea());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form);