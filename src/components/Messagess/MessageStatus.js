import React from 'react';
import PropTypes from 'prop-types';

const MessageStatus = React.memo(function MessageStatus(props) {
  const Status = () => {
    if (props.status === -1) {
      return <div className='messages-item__status messages-item__status--success'>Успещный успех</div>;
    } else if (props.status < -1) {
      return <div className='messages-item__status messages-item__status--error'>Ошибка</div>;
    } else if (props.status > -1) {
      return <div className='messages-item__status messages-item__status--loading'>В процессе</div>;
    }
  };
  return <Status/>
});

MessageStatus.propTypes = {
  status: PropTypes.number
};

export default MessageStatus;