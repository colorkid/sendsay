import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showDragDropArea, hideDragDropArea } from '../reducers/actions';


class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
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
        {this.props.isVisibleDragDropArea &&
          <div className='drag-drop-area'>
            drag-drop-area
          </div>
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
    send: () => {
      dispatch(hideDragDropArea());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form);