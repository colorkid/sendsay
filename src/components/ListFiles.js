import React from 'react';
import PropTypes from 'prop-types';

class ListFiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const files = this.props.files.map((file, index) =>
      <li className='list-files__item' key={index}>{file.name} {file.size} bytes</li>
    );

    return (
    	<ul className='list-files'>{files}</ul>
    )
	}
}

ListFiles.propTypes = {
  files: PropTypes.array
}

export default ListFiles;