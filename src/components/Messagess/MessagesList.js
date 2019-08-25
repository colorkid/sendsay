import React from 'react';
import PropTypes from 'prop-types';
import Message from "./Message";

const MessagesList = React.memo(function MessagesList(props) {
  return props.messages.map(messages => {
    return <Message
      key={messages.id}
      date={messages.date}
      messageSubject={messages.messageSubject}
      status={messages.status}
    />
  });
});

MessagesList.propTypes = {
  messages: PropTypes.array
};

export default MessagesList;