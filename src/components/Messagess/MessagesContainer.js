import React from 'react';
import PropTypes from 'prop-types';
import Message from "./Message";

const MessagesContainer = React.memo(function MessagesList(props) {
  return <div className='messages-container'>
    <div className='messages-container__head'>
      <div className='messages-container__name-column messages-container__name-column--date'>Дата</div>
      <div className='messages-container__name-column messages-container__name-column--subject'>Тема</div>
      <div className='messages-container__name-column messages-container__name-column--status'>Статус</div>
    </div>
    <Message messages={props.messages}/>
  </div>
});

MessagesContainer.propTypes = {
  messages: PropTypes.array
};

export default MessagesContainer;
