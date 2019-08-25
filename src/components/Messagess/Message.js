import React from 'react';
import PropTypes from 'prop-types';
import MessageStatus from "./MessageStatus";

const Message = React.memo(function Message(props) {
  return <div className='messages-item'>
    <div className='messages-item__date'>{props.date}</div>
    <div className='messages-item__subject'>{props.messageSubject}</div>
    <MessageStatus status={props.status}/>
  </div>
});

Message.propTypes = {
  date: PropTypes.string,
  messageSubject: PropTypes.string,
  status: PropTypes.number
};

export default Message;