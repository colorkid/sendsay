import React from 'react';
import DropZone from './DropZone';
import ListFiles from './ListFiles';
import FieldsList from './FieldsList';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dataForm: {
        nameFrom: '',
        emailFrom: '',
        nameTo: '',
        emailTo: '',
        messageSubject: 'Моя тема письма',
        message: ''
      },
      emptyFields: [],
      invalidEmails: [],
      isTooMuchAllFilesSize: false,
      isVisibleDragDropArea: false
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.showDragDropArea = this.showDragDropArea.bind(this);
  }

  send() {
    this._validateFields().then(() => {
      console.log(this.state.invalidEmails);
      if (this.state.emptyFields.length > 0) return false;
      if (this.state.invalidEmails.length > 0) return false;
    }); //...request
  }

  _addEmptyField(name) {
    this.setState(prevState => ({
      emptyFields: [ ...prevState.emptyFields, name],
    }));
  }

  _checkOnEmpty(value) {
    if (value.length <= 0) return false;
    return true;
  }

  _checkOnValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  _addInvalidEmail(name) {
    console.log(name);
    this.setState(prevState => ({
      invalidEmails: [ ...prevState.invalidEmails, name],
    }));
  }

  _validateFields() {
    const emailsForValidation = ['emailFrom', 'emailTo'];
    return new Promise((resolve) => {
      this.setState({emptyFields: [], invalidEmails: []});
      Object.keys(this.state.dataForm).forEach((name) => {
        if (!this._checkOnEmpty(this.state.dataForm[name])) this._addEmptyField(name);
        if (emailsForValidation.includes(name)) {
          if (!this._checkOnValidEmail(this.state.dataForm[name])) this._addInvalidEmail(name);
        }
      });
      resolve();
    })
  }

/*
  converFilesToBase64(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(typeof event.target.result);
    };
    reader.readAsDataURL(file);
  }*/

  _getSizeFiles() {
    let totalSize = 0;
    this.state.files.forEach(item => totalSize = totalSize + item.size);
    return totalSize;
  }

  onDrop(files) {
    const MAX_ALL_FILES_SIZE = 20971520;
    const file = files[0];
    if ((this._getSizeFiles() + file.size) <= MAX_ALL_FILES_SIZE) {
      this.setState(prevState => ({
        files: [...prevState.files, file]
      }));
    } else {
      this._showMessageTooMuchSize();
    }
    this._hideDragDropArea();
  }

  _showMessageTooMuchSize() {
    this.setState({isTooMuchAllFilesSize: true});
    setTimeout(() => {
      this._hideMessageTooMuchSize();
    }, 5000)
  }

  _hideMessageTooMuchSize() {
    this.setState({isTooMuchAllFilesSize: false});
  }

  removeFile(index) {
    let files = [...this.state.files];
    files.splice(index, 1);
    this.setState({
      files: files
    });
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const dataForm = {...this.state.dataForm};
    dataForm[name] = value;
    this.setState({dataForm})
  }

  showDragDropArea() {
    this.setState({isVisibleDragDropArea: true});
  }

  _hideDragDropArea() {
    this.setState({isVisibleDragDropArea: false});
  }

  render() {
    return (
      <form className='form'>
        <h1 className='form__title'>Отправлялка сообщений</h1>
        <FieldsList
            dataForm={this.state.dataForm}
            handleInputChange={this.handleInputChange}
            emptyFields={this.state.emptyFields}
            invalidEmails={this.state.invalidEmails}
        />
        <button type='button' onClick={this.showDragDropArea} className='button-upload'>Прикрпепить файл</button>
        <ListFiles files={this.state.files} removeFile={this.removeFile}/>
        {this.state.isTooMuchAllFilesSize && 'Вы не можете прикрепить к письму файлов более чем на 20 Mb'}
        <button type='button' onClick={this.send}>Отправить</button>
        {this.state.isVisibleDragDropArea && <DropZone onDrop={this.onDrop} />}
      </form>    
    );
  }
}

export default Form;