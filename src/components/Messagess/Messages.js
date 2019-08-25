import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MessagesList from './MessagesList';

const Messages = (props) => {
  return (
    <div className='messages'>
      <h2>Отправка сообщения</h2>
      {props.messages.length <= 0 ? <p>Сообщения ещё не отправлялись</p> : <MessagesList messages={props.messages}/>}
    </div>
  )
};

Messages.propTypes = {
  messages: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
};

export default connect(mapStateToProps)(Messages);