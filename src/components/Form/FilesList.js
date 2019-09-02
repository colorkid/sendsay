import React from 'react';
import PropTypes from 'prop-types';
import File from './File';

const FilesList = React.memo(function ListFiles(props) {
  const className = props.mixClass ? `files-list ${props.mixClass}` : 'files-list';
  const Files =  props.files.map((file, index) => {
    return <File key={index} name={file.name} index={index} removeFile={props.removeFile}/>
  });
  return <ul className={className}>{Files}</ul>
});

FilesList.propTypes = {
  files: PropTypes.array,
  removeFile: PropTypes.func,
  mixClass: PropTypes.string
};

export default FilesList;