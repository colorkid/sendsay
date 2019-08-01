import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showDragDropArea, hideDragDropArea } from '../reducers/actions';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.dropArea = React.createRef();
    this.formRef = React.createRef();
    this.highlightDropArea = this.highlightDropArea.bind(this);
    this.unhighlightDropArea = this.unhighlightDropArea.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  componentDidMount() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      switch (eventName) {
        case 'dragenter':
          this.dropArea.current.addEventListener(eventName, (e) => {
            this.preventDropAreaDefaults(e);
            this.highlightDropArea();
          }, false);
          break;
        case 'dragover':
          this.dropArea.current.addEventListener(eventName, (e) => {
            this.preventDropAreaDefaults(e);
            this.highlightDropArea();
          }, false);
          break;
        case 'dragleave':
          this.dropArea.current.addEventListener(eventName, (e) => {
            this.preventDropAreaDefaults(e);
            this.unhighlightDropArea();
          }, false)
          break;
        case 'drop':
          this.dropArea.current.addEventListener(eventName, (e) => {
            this.preventDropAreaDefaults(e);
            this.unhighlightDropArea();
            this.handleDrop(e);
          }, false)
          break;  
        default:
          return;
      }
    });
  }

  handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    this.handleFiles(files);
  }

  handleFiles(files) {
    ([...files]).forEach((file) =>{
      this.uploadFile(file, this.formRef);
    });
  }

  uploadFile(file, formUrl) {
    console.log(formUrl);
    const url = formUrl.current;
    const formData = new FormData();
    formData.append('file', file);
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(() => { console.log('ready') })
    .catch(() => { console.log('error') })
  }

  highlightDropArea() {
    this.dropArea.current.classList.add('drop-area--highlight');
  }

  unhighlightDropArea() {
    this.dropArea.current.classList.remove('drop-area--highlight');
  }

  preventDropAreaDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    return (
      <form className='form' ref={this.formRef}>
        <h1 className='form__title'>Отправлялка сообщений</h1>
        <div className='form__row'>
          <span className='field-info'>От кого</span>
          <input type='text' placeholder='Имя' className='form__input'/>
          <input type='email' placeholder='Email' />
        </div>
        <div className='form__row'>
          <span className='field-info'>Кому</span>
          <input type='text' placeholder='Имя' className='form__input'/>
          <input type='email' placeholder='Email' className='form__input'/>
        </div>
        <div className='form__row'>
          <span className='field-info'>Тема письма</span>
          <input type='text' />
        </div>
        <div className='form__row'>
          <span className='field-info'>Сообщение</span>
          <textarea></textarea>
        </div>
        <div className='form__row'>
          <button type='button' onClick={this.props.upLoadFiles} className='button-upload'>Прикрпепить файл</button>
        </div>
        <button type='button' onClick={this.props.send}>Отправить</button>
        <div ref={this.dropArea} className={this.props.isVisibleDragDropArea ? 'drop-area' : 'drop-area--hidden'}>
          <input type='file' id='fileElem' multiple accept='image/*'/>
        </div>
      </form>    
    );
  }
}


Form.propTypes = {
  isVisibleDragDropArea: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    isVisibleDragDropArea: state.visibilityDragDropArea
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upLoadFiles: () => {
      dispatch(showDragDropArea());
    },
    send: () => {
      dispatch(hideDragDropArea());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form);