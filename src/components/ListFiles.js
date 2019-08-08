import React from 'react';
import PropTypes from 'prop-types';

class ListFiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const files = this.props.files.map((file, index) =>
      <li className='list-files__item' key={index}>
        <div className='list-files__name'>{file.name}</div>
        <div onClick={() => this.props.removeFile(index)} className='list-files__remobe-button'>Х</div>
      </li>
    );

    return (
    	<ul className='list-files'>{files}</ul>
    )
	}
}

ListFiles.propTypes = {
  files: PropTypes.array,
  removeFile: PropTypes.func
}

export default ListFiles;