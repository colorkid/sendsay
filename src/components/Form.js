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
      message: ''
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
  }

  send() {
    console.log(this.state);
  }

  checkOnSize() {

  }

  onDrop(files) {
    const file = files[0];
    // console.log(file);
    // convert to base64 5242880
    /* const reader = new FileReader();
    reader.onload = (event) => {
      console.log(typeof event.target.result);
    };
    reader.readAsDataURL(file); */
    this.setState(prevState => ({
      files: [...prevState.files, file]
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.files !== prevState.files) {
      this.props.hideDragDropArea();
    }
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
        <FieldsList fieldsState={this.state} handleInputChange={this.handleInputChange}/>
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