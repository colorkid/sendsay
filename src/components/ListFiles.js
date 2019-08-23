import React from 'react';
import PropTypes from 'prop-types';
import File from './file';

const ListFiles = React.memo(function ListFiles(props) {
  return props.files.map((file, index) => {
    return <File key={index} name={file.name} index={index} removeFile={props.removeFile}/>
  });
});

ListFiles.propTypes = {
  files: PropTypes.array,
  removeFile: PropTypes.func
};

export default ListFiles;