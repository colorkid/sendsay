import React from 'react';
import PropTypes from 'prop-types';
import MessagesList from "../MessagesList/MessagesList";
import './MessagesTable.scss';

const MessagesTable = React.memo(function MessagesContainer(props) {
  return <div className='messages-table'>
    <div className='messages-table__head'>
      <div className='messages-table__name-column messages-table__name-column--date'>Дата</div>
      <div className='messages-table__name-column messages-table__name-column--subject'>Тема</div>
      <div className='messages-table__name-column messages-table__name-column--status'>Статус</div>
    </div>
    <MessagesList messages={props.messages}/>
  </div>
});

MessagesTable.propTypes = {
  messages: PropTypes.array
};

export default MessagesTable;
