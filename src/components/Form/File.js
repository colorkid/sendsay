import React from 'react';
import PropTypes from 'prop-types';

const File = React.memo(function ListFiles(props) {
  return (
    <li className='files-list__item'>
      <div className='files-list__name'>{props.name}</div>
      <div onClick={() => props.removeFile(props.index)} className='files-list__remove-button'>Удалить</div>
    </li>
  )
});

File.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  removeFile: PropTypes.func
};

export default File;