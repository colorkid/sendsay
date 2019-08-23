import React from 'react';
import PropTypes from 'prop-types';

const ListFiles = React.memo(function ListFiles(props) {
  return <ul className='list-files'>{
    const files = props.files.map((file, index) => {
    <li className='list-files__item' key={index}>
    <div className='list-files__name'>{file.name}</div>
    <div onClick={() => props.removeFile(index)} className='list-files__remove-button'>Х</div>
    </li>
  });}</ul>
});



ListFiles.propTypes = {
  files: PropTypes.array,
  removeFile: PropTypes.func
};

export default ListFiles;