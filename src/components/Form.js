import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showDragDropArea, hideDragDropArea } from '../redux/actions';
import DropZone from './DropZone';
import ListFiles from './ListFiles';

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
      message: ''
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
  }

  send() {
    console.log(this.state);
  }

  onDrop(file) {
    this.setState(prevState => ({
      files: [...prevState.files, file[0]]
    }))
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.files !== prevState.files) {
      this.props.hideDragDropArea();
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    const files = this.state.files.map((file, index) =>
      <li key={index}>{file.name} {file.size} bytes</li>
    );
    return (
      <form className='form'>
        <h1 className='form__title'>Отправлялка сообщений</h1>
        <div className='form__row'>
          <span className='field-title'>От кого</span>
          <input type='text'
            name='nameFrom'
            placeholder='Имя'
            className='form__input'
            value={this.state.nameFrom}
            onChange={this.handleInputChange}
          />
          <input
            name='emailFrom'
            type='email'
            placeholder='Email'
            value={this.state.emailFrom}
            onChange={this.handleInputChange}
          />
        </div>
        <div className='form__row'>
          <span className='field-title'>Кому</span>
          <input
            name='nameTo'
            type='text'
            placeholder='Имя'
            className='form__input'
            value={this.state.nameTo}
            onChange={this.handleInputChange}
          />
          <input
            name='emailTo'
            type='email'
            placeholder='Email'
            className='form__input'
            value={this.state.emailTo}
            onChange={this.handleInputChange}
          />
        </div>
        <div className='form__row'>
          <span className='field-title'>Тема письма</span>
          <input
            name='messageSubject'
            type='text'
            value={this.state.messageSubject}
            onChange={this.handleInputChange}
          />
        </div>
        <div className='form__row'>
          <span className='field-title'>Сообщение</span>
          <textarea
            name='message'
            value={this.state.message}
            onChange={this.handleInputChange}
          />
        </div>
        <div className='form__row'>
          <button type='button' onClick={this.props.upLoadFiles} className='button-upload'>Прикрпепить файл</button>
        </div>
        <ListFiles files={this.state.files} />
        <button type='button' onClick={this.send}>Отправить</button>
        {this.props.isVisibleDragDropArea &&
          <DropZone onDrop={this.onDrop} />
        }
      </form>    
    );
  }
}


Form.propTypes = {
  isVisibleDragDropArea: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    isVisibleDragDropArea: state.visibilityDragDropArea
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