import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showDragDropArea, hideDragDropArea } from '../reducers/actions';
import DropZone from './DropZone';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    console.log(';ffff');
    this.setState({files})
  };

  componentDidUpdate(prevProps) {
    if (this.state.files !== prevProps.files) {
      this.props.hideDragDropArea();
    }
  }

  componentDidMount() {
  
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <form className='form'>
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
        <ul>{files}</ul>
        <button type='button'>Отправить</button>
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
    hideDragDropArea: () => {
      dispatch(hideDragDropArea());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form);