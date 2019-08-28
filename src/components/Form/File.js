import React from 'react';
import PropTypes from 'prop-types';

const File = React.memo(function ListFiles(props) {
  return (
    <li className='list-files__item'>
      <div className='list-files__name'>{props.name}</div>
      <div onClick={() => props.removeFile(props.index)} className='list-files__remove-button'>Удалить</div>
    </li>
  )
});

File.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  removeFile: PropTypes.func
};

export default File;