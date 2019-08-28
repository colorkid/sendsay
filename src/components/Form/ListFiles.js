import React from 'react';
import PropTypes from 'prop-types';
import File from './File';

const ListFiles = React.memo(function ListFiles(props) {
  const Files =  props.files.map((file, index) => {
    return <File key={index} name={file.name} index={index} removeFile={props.removeFile}/>
  });
  return <ul className='list-files'>{Files}</ul>
});

ListFiles.propTypes = {
  files: PropTypes.array,
  removeFile: PropTypes.func
};

export default ListFiles;