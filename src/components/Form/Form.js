import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DropZone from './DropZone';
import ListFiles from './ListFiles';
import FieldsList from './FieldsList';
import {addNewMessage, updateMessage} from "../../redux/actions";
import 'sendsay-api';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForm: {
        nameFrom: '',
        emailFrom: '',
        nameTo: '',
        emailTo: '',
        messageSubject: 'Моя тема письма',
        message: ''
      },
      files: [],
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

  componentDidMount() {
    this.sendsay = new Sendsay({
      apiUrl: 'https://api.sendsay.ru/clu180',
      auth: {login: 'colorkid@yandex.ru', password: 'pho2Lomux'}
    });
  }

  send() {
    if (!this._validateFields()) return false;
    this._createConvertedFiles().then(result => {
      const data = this._createDateForSend(result);
      this._clearState();
      this.sendsay.request(data).then(res => {
        this.props.addNewMessage({
          id: res['track.id'],
          date: new Date().toLocaleString('ru', {month: 'long', day: 'numeric'}),
          messageSubject: data.letter.subject,
          status: 0
        });
        setInterval(() => this._updateStatusMessage(res['track.id']), 10000)
      });
    })
  }

  _clearState() {
    this.setState({
      dataForm: {
        nameFrom: '',
        emailFrom: '',
        nameTo: '',
        emailTo: '',
        messageSubject: 'Моя тема письма',
        message: ''
      },
      files: [],
      emptyFields: [],
      invalidEmails: [],
      isTooMuchAllFilesSize: false,
      isVisibleDragDropArea: false
    })
  }

  _updateStatusMessage(id) {
    this.sendsay.request({'action': 'track.get', 'id': id, 'session': 'session'}).then((result) => {
      this.props.updateMessage(id, parseInt(result.obj.status));
    })
  }

  _createDateForSend(files) {
    return {
      'action' : 'issue.send.test',
      'letter' : {
        'subject' : this.state.dataForm.messageSubject,
        'from.name' : this.state.dataForm.nameFrom,
        'from.email' : this.state.dataForm.emailFrom,
        'to.name' : this.state.dataForm.nameTo,
        'message': {'text' : this.state.dataForm.message},
        'attaches': files
        },
      'sendwhen': 'test',
      'mca': [this.state.dataForm.emailTo]
      }
  }

  _checkOnEmpty(value) {
    return value.length > 0;
  }

  _checkOnValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  _validateFields() {
    let emptyFields = [];
    let invalidEmails = [];
    const emailsForValidation = ['emailFrom', 'emailTo'];
    Object.keys(this.state.dataForm).forEach(name => {
      if (!this._checkOnEmpty(this.state.dataForm[name])) emptyFields.push(name);
      if (emailsForValidation.includes(name)) {
        if (!this._checkOnValidEmail(this.state.dataForm[name])) invalidEmails.push(name);
      }
    });
    this.setState({emptyFields: emptyFields, invalidEmails: invalidEmails});
    return !(emptyFields.length > 0 || invalidEmails.length > 0);
  }

  _createConvertedFiles() {
    return new Promise((resolve) => {
      const promisesFile = this.state.files.map(file => {
        return this._convertFileToBase64(file);
      });
      Promise.all(promisesFile).then(result => {
        resolve(result);
      });
    });
  }

  _convertFileToBase64(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve({name: file.name, content: event.target.result, encoding: 'base64'});
      };
      reader.readAsDataURL(file)
    });
  }

  getSizeFiles() {
    let totalSize = 0;
    this.state.files.forEach(item => totalSize = totalSize + item.size);
    return totalSize;
  }

  onDrop(files) {
    const MAX_ALL_FILES_SIZE = 20971520;
    const file = files[0];
    if ((this.getSizeFiles() + file.size) <= MAX_ALL_FILES_SIZE) {
      this.setState(prevState => ({
        files: [...prevState.files, file]
      }));
    } else {
      this._showMessageTooMuchSize();
    }
    this.hideDragDropArea();
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
    const {name, value} = event.target;
    const dataForm = {...this.state.dataForm};
    dataForm[name] = value;
    this.setState({dataForm})
  }

  showDragDropArea() {
    this.setState({isVisibleDragDropArea: true});
  }

  hideDragDropArea() {
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

Form.propTypes = {
  addNewMessage: PropTypes.func,
  updateMessage: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewMessage: (message) => {
      dispatch(addNewMessage(message));
    },
    updateMessage: (id, status) => {
      dispatch(updateMessage(id, status));
    }
  }
};

export default connect(null, mapDispatchToProps)(Form);
