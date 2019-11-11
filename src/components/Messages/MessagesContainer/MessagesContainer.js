import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessagesTable from '../MessagesTable/MessagesTable';
import './MessagesContainer.scss';

const MessagesContainer = (props) => {
  const className = props.mixClass ? `messages-container ${props.mixClass}` : 'messages-container';
  return (
    <div className={className}>
      <h2>Отправленные сообщения</h2>
      {props.messages.length <= 0 ? <p>Сообщения ещё не отправлялись</p> : <MessagesTable messages={props.messages}/>}
    </div>
  )
};

MessagesContainer.propTypes = {
  messages: PropTypes.array,
  mixClass: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
};

export default connect(mapStateToProps)(MessagesContainer);